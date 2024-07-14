import { Route } from "@angular/router";
import { MainComponent } from "./main/main.component";
import { Dashboard2Component } from "./dashboard2/dashboard2.component";
import { Page404Component } from "../../authentication/page404/page404.component";
import { JobsListComponent } from "../jobs/jobs-list/jobs-list.component";
export const ADMIN_DASHBOARD_ROUTE: Route[] = [
  {
    path: "",
    redirectTo: "logistic-list",
    pathMatch: "full",
  },
  {
    path: "logistic-list",
    component: JobsListComponent,
  },
  {
    path: "main",
    component: MainComponent,
  },
  {
    path: "dashboard2",
    component: Dashboard2Component,
  },
  { path: "**", component: Page404Component },
];
