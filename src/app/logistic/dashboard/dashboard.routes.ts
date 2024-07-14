import { Route } from "@angular/router";
import { Page404Component } from "../../authentication/page404/page404.component";
import { OrderListComponent } from "./order-list/order-list.component";


export const LOGISTIC_DASHBOARD_ROUTE: Route[] = [
  {
    path: "",
    redirectTo: "order-list",
    pathMatch: "full",
  },
  {
    path: "order-list",
    component: OrderListComponent,
  },
  { path: "**", component: Page404Component },
];
