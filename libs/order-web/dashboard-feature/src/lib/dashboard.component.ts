import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'order-web-dashboard',
  template: `
    <h1 nz-typography>Dashboard</h1>
    <span>Welcome to order management application</span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {}
