import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { AddOrderModalComponent } from '@nx-microservice-docker/order-web/order-ui/add-order-modal';
import { ViewOrderModalComponent } from '@nx-microservice-docker/order-web/order-ui/view-order-modal';
import {
  Order,
  OrdersApiService,
} from '@nx-microservice-docker/order-web/shared-data-access';
import { NzPresetColor } from 'ng-zorro-antd/core/color';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { concatMap, exhaustMap, switchMap, tap } from 'rxjs/operators';

export interface OrdersState {
  orders: Order[];
  status: 'idle' | 'loading' | 'success' | 'error';
}

export const initialState: OrdersState = {
  orders: [],
  status: 'idle',
};

export interface OrdersVm {
  orders: (Order & { tagColor: NzPresetColor })[];
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

@Injectable()
export class OrdersStore extends ComponentStore<OrdersState> {
  readonly status$ = this.select((s) => s.status);
  readonly orders$ = this.select((s) => s.orders);

  readonly vm$: Observable<OrdersVm> = this.select(
    this.status$,
    this.orders$,
    (status, orders) => ({
      orders: orders.map((order) => ({
        ...order,
        tagColor: OrdersStore.getTagColor(order.status),
      })),
      isLoading: status === 'loading',
      isSuccess: status === 'success',
      isError: status === 'error',
    }),
    { debounce: true }
  );

  constructor(
    private apiService: OrdersApiService,
    private notification: NzNotificationService,
    private modal: NzModalService,
    socket: Socket
  ) {
    super(initialState);
    this.newOrderAdded(socket.fromEvent<Order>('newOrderAdded'));
    this.orderStatusUpdated(socket.fromEvent<Order>('orderStatusUpdated'));
  }

  readonly openAddModal = this.effect((trigger$) =>
    trigger$.pipe(
      exhaustMap(
        () =>
          this.modal.create<AddOrderModalComponent, number>({
            nzTitle: 'Add new order',
            nzContent: AddOrderModalComponent,
          }).afterClose
      ),
      tap((amount) => {
        if (amount) {
          this.createOrder(amount);
        }
      })
    )
  );

  readonly openDetailsModal = this.effect<string>((id$) =>
    id$.pipe(
      exhaustMap((id) =>
        this.apiService.orderControllerDetails(id).pipe(
          tapResponse((order) => {
            this.modal.create({
              nzTitle: 'Order Details',
              nzContent: ViewOrderModalComponent,
              nzComponentParams: { order },
            });
          }, console.error)
        )
      )
    )
  );

  readonly newOrderAdded = this.effect<Order>((order$) =>
    order$.pipe(
      tap((order) => {
        this.patchState((state) => ({
          orders: [order, ...state.orders],
        }));
      })
    )
  );

  readonly orderStatusUpdated = this.effect<Order>((order$) =>
    order$.pipe(
      tap((order) => {
        this.patchState((state) => ({
          orders: state.orders.map((currentOrder) => {
            if (currentOrder._id === order._id) return order;
            return currentOrder;
          }),
        }));
      })
    )
  );

  readonly getOrders = this.effect((trigger$) =>
    trigger$.pipe(
      tap(() => this.patchState({ status: 'loading' })),
      switchMap(() =>
        this.apiService.orderControllerIndex().pipe(
          tapResponse(
            (response) => {
              this.patchState({ orders: response, status: 'success' });
            },
            (error) => {
              console.error(error);
              this.patchState({ status: 'error' });
            }
          )
        )
      )
    )
  );

  readonly createOrder = this.effect<number>((amount$) =>
    amount$.pipe(
      tap(() => this.patchState({ status: 'loading' })),
      concatMap((amount) =>
        this.apiService.orderControllerCreate({ amount }).pipe(
          tapResponse(
            () => {
              this.notification.success('Order added successfully', '');
              this.patchState({ status: 'success' });
            },
            (error) => {
              console.error(error);
              this.notification.error('Order added failed', `${error}`);
              this.patchState({ status: 'error' });
            }
          )
        )
      )
    )
  );

  readonly cancelOrder = this.effect<string>((id$) =>
    id$.pipe(
      tap(() => this.patchState({ status: 'loading' })),
      concatMap((id) =>
        this.apiService.orderControllerCancel(id).pipe(
          tapResponse(
            () => this.notification.success('Order cancelled successfully', ''),
            (error) => {
              console.error(error);
              this.notification.error('Order cancelled failed', `${error}`);
              this.patchState({ status: 'error' });
            }
          )
        )
      )
    )
  );

  private static getTagColor(status: Order['status']): NzPresetColor {
    switch (status) {
      case 'created':
        return 'blue';
      case 'confirmed':
        return 'green';
      case 'delivered':
        return 'volcano';
      case 'canceled':
        return 'red';
    }
  }
}
