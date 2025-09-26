# Column Selector Component

Ova komponenta omogućava dinamičko upravljanje kolonama u tabelama. Korisnici mogu dodati/ukloniti kolone prema potrebi.

## Kako koristiti

### 1. U komponenti koja koristi tabelu

```typescript
import { ColumnOption } from "app/shared/components/column-selector";

export class YourComponent extends BaseTableComponent<YourType> {
  public columnOptions: ColumnOption[] = [
    { key: "id", label: "table.id", visible: true, default: true },
    { key: "name", label: "table.name", visible: true, default: true },
    { key: "email", label: "table.email", visible: false, default: false },
    { key: "action", label: "table.actions", visible: true, default: true },
  ];

  onColumnsChange(columns: string[]): void {
    this.displayedColumns = columns;
  }
}
```

### 2. U HTML template-u

```html
<app-table-filter
  [title]="'your.addNew' | translate"
  [showColumnSelector]="true"
  [columnOptions]="columnOptions"
  (searchChange)="onSearchChange($event)"
  (onAddActionClick)="openDialog(modalTypesEnum.ADD, {})"
  (columnsChange)="onColumnsChange($event)"
></app-table-filter>
```

### 3. Dodaj kolone u tabelu

Za svaku kolonu dodaj `ng-container` u tabelu:

```html
<ng-container matColumnDef="email">
  <th
    mat-header-cell
    *matHeaderCellDef
    class="f-s-16 f-w-600"
  >
    {{ "table.email" | translate }}
  </th>
  <td
    mat-cell
    *matCellDef="let element"
  >
    <span class="f-w-600 f-s-16 mat-subtitle-1"> {{ element.email }} </span>
  </td>
</ng-container>
```

## ColumnOption Interface

```typescript
interface ColumnOption {
  key: string; // Ključ kolone (mora se poklapati sa matColumnDef)
  label: string; // Translation ključ za label
  visible: boolean; // Da li je kolona trenutno vidljiva
  default?: boolean; // Da li je kolona vidljiva po defaultu
}
```

## Funkcionalnosti

- **Toggle kolona**: Korisnici mogu uključiti/isključiti kolone
- **Select All**: Odaberi sve kolone
- **Select Defaults**: Vrati na defaultne kolone
- **Brojač**: Prikazuje koliko je kolona trenutno odabrano
- **Persistentnost**: Stanje kolona se čuva u komponenti

## Primjena na Invoices komponenti

U invoices komponenti je implementiran primjer sa svim dostupnim poljima iz `GetInvoiceResponseDto`:

- invoice_number
- name (client name)
- total_price_after_vat
- status
- budget
- currency
- invoice_payment_due_date
- description
- discount
- vat_value
- total_price_before_vat
- action

Defaultno su prikazane samo osnovne kolone, a ostale mogu biti dodane preko column selector-a.
