# Invoice Status Component

A reusable Angular component for displaying invoice status with appropriate colors and icons based on the `InvoiceStatus` enum.

## Features

- **Color-coded status display**: Each invoice status has its own color scheme
- **Optional icons**: Can display status-specific icons
- **Multiple sizes**: Small, medium, and large variants
- **Responsive design**: Hover effects and smooth transitions
- **Accessibility**: Proper contrast ratios and semantic markup

## Usage

### Basic Usage

```html
<app-invoice-status [status]="invoiceStatus"></app-invoice-status>
```

### With Icon

```html
<app-invoice-status
  [status]="invoiceStatus"
  [showIcon]="true"
>
</app-invoice-status>
```

### Different Sizes

```html
<!-- Small size -->
<app-invoice-status
  [status]="invoiceStatus"
  size="small"
>
</app-invoice-status>

<!-- Medium size (default) -->
<app-invoice-status
  [status]="invoiceStatus"
  size="medium"
>
</app-invoice-status>

<!-- Large size -->
<app-invoice-status
  [status]="invoiceStatus"
  size="large"
>
</app-invoice-status>
```

## Input Properties

| Property   | Type                             | Default    | Description                     |
| ---------- | -------------------------------- | ---------- | ------------------------------- |
| `status`   | `InvoiceStatus`                  | Required   | The invoice status to display   |
| `showIcon` | `boolean`                        | `false`    | Whether to show the status icon |
| `size`     | `'small' \| 'medium' \| 'large'` | `'medium'` | The size of the status chip     |

## Status Colors

| Status     | Background Color   | Text Color | Icon           |
| ---------- | ------------------ | ---------- | -------------- |
| `CANCELED` | `#526b7a` (Gray)   | `#526b7a`  | `cancel`       |
| `DRAFT`    | `#635bff` (Blue)   | `#ffffff`  | `edit`         |
| `OVERDUE`  | `#ff6692` (Red)    | `#ffffff`  | `warning`      |
| `PAID`     | `#36c76c` (Green)  | `#ffffff`  | `check_circle` |
| `PENDING`  | `#f8c20a` (Yellow) | `#29343d`  | `schedule`     |
| `UNPAID`   | `#ff6692` (Red)    | `#ffffff`  | `error`        |

> **Note**: Colors are using the application's design system colors from `_variables.scss`.

## Import

```typescript
import { InvoiceStatusComponent } from 'app/shared/components/invoice-status';

@Component({
  // ...
  imports: [InvoiceStatusComponent],
  // ...
})
```

## Example in Load Table

The component is already integrated into the load table component:

```html
<app-invoice-status
  *ngIf="element.invoice"
  [status]="element.invoice.status"
  [showIcon]="true"
  size="medium"
>
</app-invoice-status>
```

## Styling

The component uses Material Design chips with custom styling. You can override the styles by targeting the `.invoice-status-chip` class in your component's CSS.
