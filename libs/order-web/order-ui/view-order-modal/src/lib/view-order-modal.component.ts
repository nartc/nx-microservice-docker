import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Order } from '@nx-microservice-docker/order-web/shared-data-access';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'nx-microservice-docker-view-order-modal',
  template: `
    <nz-descriptions [nzTitle]="'Order ' + order?._id" nzSize="small">
      <nz-descriptions-item nzTitle="Created Date" nzSpan="3">
        {{ $any(order)['createdAt'] | date: 'yyyy-MM-dd HH:mm' }}
      </nz-descriptions-item>
      <nz-descriptions-item nzTitle="Username">
        {{ order?.username }}
      </nz-descriptions-item>
      <nz-descriptions-item nzTitle="Status">
        {{ order?.status | uppercase }}
      </nz-descriptions-item>
      <nz-descriptions-item nzTitle="Amount">
        {{ order?.amount | currency }}
      </nz-descriptions-item>
    </nz-descriptions>
    <div *nzModalFooter>
      <button nz-button nzType="default" (click)="onClose()">Close</button>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewOrderModalComponent {
  @Input() order?: Order;

  constructor(private modalRef: NzModalRef) {}

  onClose() {
    this.modalRef.destroy();
  }
}
