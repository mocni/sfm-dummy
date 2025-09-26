import { z } from 'zod';

import { EmployeeType } from '@smart-fleet-management/common';

import { companyCardSchema } from '../company-cards.schema';

// discriminatedUnion does not suppoort createZodDto
export const employeeCommonFields = z.object({
  company_cards: companyCardSchema
    .nullish()
    .describe('List of company cards (fuel card, bank card, etc.)'),
  first_name: z.string().min(1).max(100),
  last_name: z.string().min(1).max(100),
  oib: z.string().max(20).nullish(),
  phone_number: z.string().max(25).nullish(),
});

const ifEmployeeTypeDriver = z.object({
  driver_card_number: z.string().max(20).nullish(),
  driver_card_validation_period: z.string().datetime().nullish(),
  driver_licence_number: z.string().max(20),
  driver_licence_validation_period: z.string().datetime(),
  type: z.literal(EmployeeType.DRIVER),
});

const ifEmployeeTypeAccountant = z.object({
  type: z.literal(EmployeeType.ACCOUNTANT),
});

const ifEmployeeTypeOwner = z.object({
  type: z.literal(EmployeeType.OWNER),
});

// Base employee schema without user creation fields
export const createEmployeePayloadSchema = z.discriminatedUnion('type', [
  ifEmployeeTypeDriver.merge(employeeCommonFields),
  ifEmployeeTypeAccountant.merge(employeeCommonFields),
  ifEmployeeTypeOwner.merge(employeeCommonFields),
]);

export type CreateEmployeePayload = z.infer<typeof createEmployeePayloadSchema>;
