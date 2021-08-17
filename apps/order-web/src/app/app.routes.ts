import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('@nx-microservice-docker/order-web/dashboard-feature').then(
        (m) => m.OrderWebDashboardFeatureModule
      ),
  },
  {
    path: 'orders',
    loadChildren: () =>
      import('@nx-microservice-docker/order-web/order-feature').then(
        (m) => m.OrderWebOrderFeatureModule
      ),
  },
];
