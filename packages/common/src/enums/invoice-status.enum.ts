export enum InvoiceStatus {
  CANCELED = "CANCELED", // kada je faktura stornirana - CRNA/SIVA boja
  DRAFT = "DRAFT", // faktura je kreirana kao skica - PLAVA boja
  PAID = "PAID", // kada je faktura plaćena - ZELENA boja
  PARTIALLY_PAID = "PARTIALLY_PAID", // kada je faktura djelomično plaćena - NARANČASTA boja
  PENDING = "PENDING", // kada je faktura izdana, ali nije još plaćena - ŽUTA boja
  UNPAID = "UNPAID", // kada je faktura prekoračila datum dospijeća računa  - CRVENA boja
}
