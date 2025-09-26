import { Routes } from "@angular/router";
import { LoginComponent } from "app/pages/login/login.component";

import { ROUTES } from "app/shared/enums/routes.enum";

export const routes: Routes = [
  {
    path: ROUTES.LOGIN,
    component: LoginComponent,
  },
  // TODO: Move this to dashboard once we have a dashboard page, since this will call http and redirect user to login if not authenticated
  {
    path: "",
    redirectTo: ROUTES.LOAD,
    pathMatch: "full",
  },

  {
    path: "**",
    redirectTo: ROUTES.LOGIN,
  },
];
