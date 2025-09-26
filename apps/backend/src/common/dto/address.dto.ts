import { createZodDto } from 'nestjs-zod';

import {
  addressSchema,
  updateAddressPayloadSchema,
} from '../schemas/address.schema';

export class AddressPayloadDto extends createZodDto(addressSchema) {}

export class UpdateAddressPayloadDto extends createZodDto(
  updateAddressPayloadSchema,
) {}
