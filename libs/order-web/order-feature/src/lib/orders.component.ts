import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { OrdersStore } from './orders.store';

@Component({
  selector: 'order-web-orders',
  template: `
    <h1 nz-typography>Orders</h1>
    <button nz-button nzType="primary" (click)="onAdd()">Add</button>
    <nz-divider></nz-divider>
    <ng-container *ngIf="vm$ | async as vm">
      <nz-table #ordersTable [nzData]="vm.orders" [nzLoading]="vm.isLoading">
        <thead>
          <tr>
            <th>Date</th>
            <th>ID</th>
            <th>Username</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let order of vm.orders">
            <td>{{ $any(order)['createdAt'] | date: 'yyyy-MM-dd HH:mm' }}</td>
            <td>{{ order._id }}</td>
            <td>{{ order.username }}</td>
            <td>{{ order.amount | currency }}</td>
            <td>
              <nz-tag [nzColor]="order.tagColor">{{
                order.status | uppercase
              }}</nz-tag>
            </td>
            <td>
              <button
                nz-button
                nzType="default"
                nzShape="circle"
                (click)="onView(order._id)"
              >
                <i nz-icon nzType="search"></i>
              </button>
              <nz-divider nzType="vertical"></nz-divider>
              <button
                *ngIf="
                  order.status === 'created' || order.status === 'confirmed'
                "
                nz-button
                nzType="default"
                nzShape="circle"
                nzDanger
                (click)="onCancel(order._id)"
              >
                <i nz-icon nzType="close"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </nz-table>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [OrdersStore],
})
export class OrdersComponent implements OnInit {
  readonly vm$ = this.ordersStore.vm$;

  constructor(private ordersStore: OrdersStore) {}

  ngOnInit(): void {
    this.ordersStore.getOrders();
  }

  onAdd() {
    this.ordersStore.openAddModal();
  }

  onView(id: string) {
    this.ordersStore.openDetailsModal(id);
  }

  onCancel(id: string) {
    this.ordersStore.cancelOrder(id);
  }
}
