import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { OrdersComponent } from './orders.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: OrdersComponent }]),
    NzTypographyModule,
    NzNotificationModule,
    NzModalModule,
    NzButtonModule,
    NzDividerModule,
    NzTableModule,
    NzIconModule,
    NzTagModule,
  ],
  declarations: [OrdersComponent],
})
export class OrderWebOrderFeatureModule {}
