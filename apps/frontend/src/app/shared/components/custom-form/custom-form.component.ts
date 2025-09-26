import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FormlyFieldConfig } from "@ngx-formly/core";
import { FormlySharedModule } from "../../modules/formly.module";
import { TranslateModule } from "@ngx-translate/core";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "app-custom-form",
  standalone: true,
  imports: [FormlySharedModule, MatCardModule, MatButtonModule, TranslateModule],
  templateUrl: "./custom-form.component.html",
  styleUrls: ["./custom-form.component.scss"],
})
export class CustomFormComponent implements OnInit {
  @Input() model: any = {}; // Primanje početnog modela podataka
  @Input() fields: FormlyFieldConfig[] = [
    {
      key: "email",
      type: "input",
      props: {
        label: "Email address",
        placeholder: "Enter email",
        required: true,
      },
    },
  ]; // Primanje polja za formu
  @Output() formSubmit = new EventEmitter<any>(); // Emitira podatke na submit

  form = new FormGroup({});

  ngOnInit(): void {
    this.form.valueChanges.subscribe((val) => {
      console.log(val);
      console.log(this.form.valid);
      console.log(this.findInvalidControls());
    });
  }
  public findInvalidControls() {
    const invalid = [];
    const controls = this.form.controls;
    for (const name in controls) {
      if (((controls as any)[name as any] as any).invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }

  onSubmit() {
    if (this.form.valid) {
      this.formSubmit.emit(this.model); // Emitiraj podatke ako je forma validna
    }
  }
}
