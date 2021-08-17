import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { AddOrderModalComponent } from './add-order-modal.component';

@NgModule({
  imports: [
    CommonModule,
    NzModalModule,
    NzButtonModule,
    NzInputNumberModule,
    FormsModule,
  ],
  declarations: [AddOrderModalComponent],
  exports: [AddOrderModalComponent],
})
export class OrderWebOrderUiAddOrderModalModule {}
