import { Route } from '@angular/router';

export const LOGISTIC_ROUTE: Route[] = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.routes').then((m) => m.LOGISTIC_DASHBOARD_ROUTE),
  }
];

