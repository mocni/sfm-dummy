import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { PageEvent } from "@angular/material/paginator";
import { Subject, debounceTime } from "rxjs";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-base-table",
  standalone: true,
  imports: [CommonModule],
  template: "",
})
export class BaseTableComponent<T> implements OnInit {
  @Input() title: string = "";
  @Input() displayedColumns: string[] = [];

  dataSource: MatTableDataSource<any> = new MatTableDataSource<T>();
  itemsPerPage = [5, 10, 20];
  resultsPerPage = this.itemsPerPage[1];
  resultsLength: number | undefined;
  page = 1;
  isLoading: boolean = true;
  searchString: string | undefined = undefined;
  private searchSubject = new Subject<string>();
  protected paginationMetadata: { totalPages?: number; totalCount?: number } = {};

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
  ) {
    this.searchSubject.pipe(debounceTime(500)).subscribe((value) => {
      this.search(value);
    });
  }

  ngOnInit() {
    this.isLoading = true;
    this.initializeFromQueryParams();
    this.getList();
  }

  getList() {
    // The extending component should override this method.
  }

  public search(value: string) {
    this.isLoading = true;
    this.searchString = value;
    this.updateQueryParams();
    this.getList();
  }

  public onSearchChange(value: string) {
    this.searchSubject.next(value);
  }

  public onPaginateChange(page: PageEvent) {
    this.isLoading = true;
    this.page = page.pageIndex + 1;
    this.resultsPerPage = page.pageSize;
    this.updateQueryParams();
    this.getList();
  }

  public initializeFromQueryParams(): void {
    const params = this.route.snapshot.queryParams;
    if (params["page"]) {
      this.page = parseInt(params["page"], 10);
    }
    if (params["size"]) {
      this.resultsPerPage = parseInt(params["size"], 10);
    }
    if (params["search"]) {
      this.searchString = params["search"];
    }
  }

  private updateQueryParams(): void {
    const queryParams: any = {
      page: this.page,
      size: this.resultsPerPage,
    };

    if (this.searchString) {
      queryParams.search = this.searchString;
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: "merge",
    });
  }

  public hasData(): boolean {
    return this.dataSource && this.dataSource.data && this.dataSource.data.length > 0;
  }

  public isOnInvalidPage(): boolean {
    // Check if we're on a page that doesn't exist
    // This happens when totalPages < current page
    if (this.resultsLength && this.resultsPerPage) {
      let totalPages: number;

      // Use stored pagination metadata if available
      if (this.paginationMetadata.totalPages) {
        totalPages = this.paginationMetadata.totalPages;
      } else {
        // Calculate totalPages based on resultsLength and resultsPerPage
        totalPages = Math.ceil(this.resultsLength / this.resultsPerPage);
      }

      return this.page > totalPages && totalPages > 0;
    }
    return false;
  }

  public resetFilters(): void {
    this.page = 1;
    this.searchString = undefined;
    this.isLoading = true;
    this.updateQueryParams();
    this.getList();
  }
}
