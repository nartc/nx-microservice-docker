import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'order-web-add-order-modal',
  template: `
    <nz-input-number [(ngModel)]="amount"></nz-input-number>
    <div *nzModalFooter>
      <button nz-button nzType="default" (click)="onCancel()">Cancel</button>
      <button nz-button nzType="primary" (click)="onSubmit()">Submit</button>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddOrderModalComponent {
  amount = 0;

  constructor(private modalRef: NzModalRef<AddOrderModalComponent, number>) {}

  onSubmit() {
    this.modalRef.destroy(this.amount);
  }

  onCancel() {
    this.modalRef.destroy();
  }
}
