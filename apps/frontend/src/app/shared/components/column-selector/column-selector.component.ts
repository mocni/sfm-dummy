import { CommonModule } from "@angular/common";
import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDividerModule } from "@angular/material/divider";
import { TranslateModule } from "@ngx-translate/core";
import { TablerIconsModule } from "angular-tabler-icons";

export interface ColumnOption {
  key: string;
  label: string;
  visible: boolean;
  default?: boolean;
}

@Component({
  selector: "app-column-selector",
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatCheckboxModule,
    MatDividerModule,
    TranslateModule,
    TablerIconsModule,
  ],
  templateUrl: "./column-selector.component.html",
  styleUrl: "./column-selector.component.scss",
})
export class ColumnSelectorComponent implements OnInit {
  @Input() columns: ColumnOption[] = [];
  @Input() title: string = "table.columns";
  @Output() columnsChange = new EventEmitter<string[]>();

  ngOnInit() {
    // Set default columns if not already set
    if (this.columns.length > 0) {
      this.updateDisplayedColumns();
    }
  }

  toggleColumn(column: ColumnOption): void {
    column.visible = !column.visible;
    this.updateDisplayedColumns();
  }

  selectAll(): void {
    this.columns.forEach((col) => (col.visible = true));
    this.updateDisplayedColumns();
  }

  selectDefaults(): void {
    this.columns.forEach((col) => (col.visible = col.default !== false));
    this.updateDisplayedColumns();
  }

  private updateDisplayedColumns(): void {
    const visibleColumns = this.columns.filter((col) => col.visible).map((col) => col.key);
    this.columnsChange.emit(visibleColumns);
  }

  get visibleColumnsCount(): number {
    return this.columns.filter((col) => col.visible).length;
  }

  get totalColumnsCount(): number {
    return this.columns.length;
  }
}
