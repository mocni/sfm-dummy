import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ClientModalComponent } from "app/pages/clients/client-modal/client-modal.component";
import { DriverModalComponent } from "app/pages/employees/driver-modal/driver-modal.component";
import { LoadModalComponent } from "app/pages/load/load-modal/load-modal.component";
import { ModalTypeEnum } from "app/shared/enums/modal.enums";
import { ROUTES } from "app/shared/enums/routes.enum";
import { TrailerModalComponent } from "app/pages/trailers/trailer-modal/trailer-modal.component";
import { TruckModalComponent } from "app/pages/trucks/truck-modal/truck-modal.component";
import { DispatchModalComponent } from "app/pages/dispatch/dispatch-modal/dispatch-modal.component";
import { QuickLoadActions } from "app/shared/data/short-actions.data";

@Injectable({
  providedIn: "root",
})
export class ModalService {
  constructor(private dialog: MatDialog) {}

  openModalForAction(action: QuickLoadActions): void {
    if (action === ROUTES.LOAD) {
      this.dialog.open(LoadModalComponent, { data: { action: ModalTypeEnum.ADD } });
    } else if (action === ROUTES.EMPLOYEE) {
      this.dialog.open(DriverModalComponent, { data: { action: ModalTypeEnum.ADD } });
    } else if (action === ROUTES.CLIENTS) {
      this.dialog.open(ClientModalComponent, { data: { action: ModalTypeEnum.ADD } });
    } else if (action === ROUTES.TRAILERS) {
      this.dialog.open(TrailerModalComponent, { data: { action: ModalTypeEnum.ADD } });
    } else if (action === ROUTES.TRUCKS) {
      this.dialog.open(TruckModalComponent, { data: { action: ModalTypeEnum.ADD } });
    } else if (action === ROUTES.DISPATCH) {
      this.dialog.open(DispatchModalComponent, { data: { action: ModalTypeEnum.ADD } });
    }
  }
}
