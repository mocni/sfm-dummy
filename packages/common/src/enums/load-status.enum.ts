export enum LoadStatus {
  ASSIGNED = "ASSIGNED", // utovar je dodijeljen vozaču
  FINISHED = "FINISHED", // utovar je završen
  IN_PROGRESS = "IN_PROGRESS", // utovar je u tijeku
  // LOADED = 'LOADED', // kamion je natovaren - kada vozač natovari, vozač ili dispatcher promjeni status LOADA (idealno)
  TEMPLATE = "TEMPLATE", // spremljena skica
  UNASSIGNED = "UNASSIGNED", // utovar nije dodjeljen
  // UNLOADED = 'UNLOADED', // kamion je istovaren
}
