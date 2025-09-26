import { z } from 'zod';

import { CountryNameEnum } from '@smart-fleet-management/common';

export const addressSchema = z.object({
  city: z.string().min(1).max(100).describe('Zagreb'),
  country: z.nativeEnum(CountryNameEnum).describe(CountryNameEnum.CROATIA),
  // country_code: z.nativeEnum(CountryCodeEnum).describe('HR'),
  geolocation: z
    .object({
      latitude: z.number().describe('45.815'),
      longitude: z.number().describe('15.9819'),
    })
    .nullish(),
  house_number: z.string().min(1).max(100).describe('46a'),
  postal_code: z.string().min(1).max(100).describe('524675'),
  street: z.string().min(1).max(100).describe('Dobra ulica'),
});

export const updateAddressPayloadSchema = addressSchema.partial();
