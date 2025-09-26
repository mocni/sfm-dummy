import { Routes } from "@angular/router";
import { ROUTES } from "../enums/routes.enum";
import { SidebarIcons } from "../enums/sidebar-icons.enum";

export interface apps {
  id: number;
  icon: string;
  color: string;
  title: string;
  subtitle: string;
  action: QuickLoadActions;
}
export type QuickLoadActions =
  | ROUTES.LOAD
  | ROUTES.EMPLOYEE
  | ROUTES.CLIENTS
  | ROUTES.TRAILERS
  | ROUTES.TRUCKS
  | ROUTES.DISPATCH
  | ROUTES.SERVICES
  | ROUTES.INVOICES
  | ROUTES.REPORT;

export const shortActions: apps[] = [
  {
    id: 1,
    icon: SidebarIcons.LOAD,
    color: "primary",
    title: "sidebar.load",
    subtitle: "quickActions.addNewLoad",
    action: ROUTES.LOAD,
  },
  {
    id: 2,
    icon: SidebarIcons.EMPLOYEE,
    color: "accent",
    title: "sidebar.employees",
    subtitle: "quickActions.addNewDriver",
    action: ROUTES.EMPLOYEE,
  },
  {
    id: 3,
    icon: SidebarIcons.CLIENTS,
    color: "secondary",
    title: "sidebar.clients",
    subtitle: "quickActions.addNewClient",
    action: ROUTES.CLIENTS,
  },
  {
    id: 4,
    icon: SidebarIcons.TRUCKS,
    color: "warning",
    title: "sidebar.trucks",
    subtitle: "quickActions.addNewTruck",
    action: ROUTES.TRUCKS,
  },
  {
    id: 5,
    icon: SidebarIcons.TRAILERS,
    color: "success",
    title: "sidebar.trailers",
    subtitle: "quickActions.addNewTrailer",
    action: ROUTES.TRAILERS,
  },
  {
    id: 5,
    icon: SidebarIcons.DISPATCH,
    color: "error",
    title: "sidebar.dispatch",
    subtitle: "quickActions.addNewDispatch",
    action: ROUTES.DISPATCH,
  },
  {
    id: 6,
    icon: SidebarIcons.SERVICES,
    color: "tertiary",
    title: "sidebar.services",
    subtitle: "quickActions.addNewService",
    action: ROUTES.SERVICES,
  },
  {
    id: 7,
    icon: SidebarIcons.INVOICES,
    color: "muted",
    title: "sidebar.invoices",
    subtitle: "quickActions.addNewInvoice",
    action: ROUTES.INVOICES,
  },
];
