import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FieldType, FieldTypeConfig } from "@ngx-formly/core";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "formly-title",
  templateUrl: "./formly-title.component.html",
  styleUrls: ["./formly-title.component.scss"],
  standalone: true,
  imports: [CommonModule, TranslateModule],
})
export class FormlyTitleComponent extends FieldType<FieldTypeConfig> {}
