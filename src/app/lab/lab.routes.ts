import { Route } from "@angular/router";
import { CandidatesComponent } from "./candidates/candidates.component";

import { ResumesComponent } from "./resumes/resumes.component";
import { ShortlistComponent } from "./shortlist/shortlist.component";
import { Page404Component } from "app/authentication/page404/page404.component";
import { BagCreationListComponent } from "./bag-creation-list/bag-creation-list.component";
import { AmdImportBuxaiteComponent } from "./amd-import-buxaite/amd-import-buxaite.component";
import { AmdDomesticBuxaiteComponent } from "./amd-domestic-buxaite/amd-domestic-buxaite.component";
import { DomesticBuxaiteComponent } from "./domestic-buxaite/domestic-buxaite.component";

export const lab_ROUTE: Route[] = [
  {
    path: "bag-creation-list",
    component: BagCreationListComponent,
  },
  {
    path: "mat-received",
    component: ResumesComponent,
  },
  {
    path: "final",
    component: CandidatesComponent,
  },
  {
    path: "shortlist",
    component: ShortlistComponent,
  },
  {
    path: "amd-import-buxaite",
    component: AmdImportBuxaiteComponent,
  },
  {
    path: "amd-domestic-buxaite",
    component: AmdDomesticBuxaiteComponent,
  },
  {
    path: "buxaite",
    component: DomesticBuxaiteComponent,
  },
  {
    path: "final-result",
    component: DomesticBuxaiteComponent,
  },
  {
    path: "rmr-lab",
    component: ResumesComponent,
  },
  { path: "**", component: Page404Component },
];

