import { Component } from '@angular/core';

@Component({
  selector: 'order-web-root',
  template: `
    <nz-layout>
      <nz-header>
        <h3 nz-typography>Order Management</h3>
        <ul nz-menu nzTheme="dark" nzMode="horizontal">
          <li nz-menu-item routerLink="orders">Orders</li>
        </ul>
      </nz-header>
      <nz-content>
        <div class="inner-content">
          <router-outlet></router-outlet>
        </div>
      </nz-content>
    </nz-layout>
  `,
  styles: [
    `
      nz-header {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      h3 {
        color: white;
        margin: 0;
      }

      [nz-menu] {
        line-height: 4rem;
      }

      nz-layout {
        height: 100%;
      }

      nz-content {
        height: 100%;
        padding: 3rem;
      }

      .inner-content {
        background: #fff;
        padding: 24px;
        min-height: 280px;
      }
    `,
  ],
})
export class AppComponent {}
