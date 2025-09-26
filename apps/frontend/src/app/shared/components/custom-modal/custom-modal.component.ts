import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output, TemplateRef } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDialogModule } from "@angular/material/dialog";
import { TranslateModule } from "@ngx-translate/core";
import { TablerIconsModule } from "angular-tabler-icons";

@Component({
  selector: "app-custom-modal",
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    TablerIconsModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    MatNativeDateModule,
  ],
  templateUrl: "./custom-modal.component.html",
  styleUrl: "./custom-modal.component.scss",
})
export class CustomModalComponent {
  @Input() modalContent!: TemplateRef<any>;
  @Input() title!: string;
  @Output() closeModal$ = new EventEmitter<boolean>();
}
