import { z } from "zod";

export const detaljiSubjektaGetQueryParamsSchema = z
  .object({
    expand_relations: z.string().optional(),
    identifikator: z.string().optional(),
    no_data_error: z.string().optional(),
    omit_nulls: z.string().optional(),
    snapshot_id: z.number().optional(),
    tip_identifikatora: z.string().optional(),
  })
  .optional();

export const detaljiSubjektaGetHeaderParamsSchema = z.object({ "Content-Type": z.string().optional() }).optional();
