import { CommonModule } from "@angular/common";
import { Component, Input, Output, EventEmitter, TemplateRef, OnInit } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { TablerIconsModule } from "angular-tabler-icons";
import { MaterialModule } from "material.module";
import { ColumnSelectorComponent, ColumnOption } from "../column-selector";
import { ActivatedRoute } from "@angular/router";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-table-filter",
  standalone: true,
  imports: [MaterialModule, CommonModule, TablerIconsModule, TranslateModule, ColumnSelectorComponent, FormsModule],
  templateUrl: "./table-filter.component.html",
})
export class TableFilterComponent implements OnInit {
  @Input() headerActions: TemplateRef<Element>;
  @Input() title: string = "";
  @Input() actionTitle: string = "";
  @Input() showColumnSelector: boolean = false;
  @Input() columnOptions: ColumnOption[] = [];

  // Added outputs for search and button click events
  @Output() searchChange = new EventEmitter<string>();
  @Output() onAddActionClick = new EventEmitter<void>();
  @Output() columnsChange = new EventEmitter<string[]>();

  searchValue: string = "";

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.initializeFromQueryParams();
  }

  private initializeFromQueryParams(): void {
    this.route.queryParams.subscribe((params) => {
      if (params["search"]) {
        this.searchValue = params["search"];
      }
    });
  }

  onSearchChange(searchValue: string): void {
    this.searchValue = searchValue;
    this.searchChange.emit(searchValue);
  }

  onAddAction(): void {
    this.onAddActionClick.emit();
  }

  onColumnsChange(columns: string[]): void {
    this.columnsChange.emit(columns);
  }
}
