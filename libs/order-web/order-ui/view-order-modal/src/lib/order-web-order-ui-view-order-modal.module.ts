import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ViewOrderModalComponent } from './view-order-modal.component';

@NgModule({
  imports: [CommonModule, NzDescriptionsModule, NzButtonModule, NzModalModule],
  declarations: [ViewOrderModalComponent],
  exports: [ViewOrderModalComponent],
})
export class OrderWebOrderUiViewOrderModalModule {}
