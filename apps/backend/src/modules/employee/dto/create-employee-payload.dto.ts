import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { EmployeeType } from '@smart-fleet-management/common';
import { userGroup } from '@smart-fleet-management/users';

import { CompanyCardModel } from '../models';

// here we define the DTO for creating an employee payload because createZodDto don't work with zod discriminatedUnion
export class CreateEmployeePayloadDto {
  @ApiPropertyOptional({
    description: 'List of company cards (fuel card, bank card, etc.)',
    isArray: true,
  })
  company_cards?: CompanyCardModel | null;

  @ApiPropertyOptional()
  driver_card_number?: null | string;

  @ApiPropertyOptional()
  driver_card_validation_period?: null | string;

  @ApiPropertyOptional()
  driver_licence_number?: null | string;

  @ApiPropertyOptional()
  driver_licence_validation_period?: null | string;

  @ApiProperty()
  first_name: string;

  @ApiProperty()
  last_name: string;

  @ApiPropertyOptional()
  oib?: null | string;

  @ApiPropertyOptional()
  phone_number?: null | string;

  @ApiProperty({ enum: EmployeeType })
  type: EmployeeType;
}

// User creation data DTO
export class UserCreationDataDto {
  @ApiProperty({
    description: 'Email address for the new user account',
    example: 'deki@email.com',
  })
  email: string;

  @ApiProperty({
    description: 'User groups/permissions for the new user account',
    enum: userGroup,
    example: ['DRIVER_READONLY'],
    isArray: true,
  })
  groups: Array<keyof typeof userGroup>;

  @ApiProperty({
    description:
      'Password for the new user account (8-32 characters, must contain uppercase, lowercase, and number/special character)',
    example: 'Test1234!',
    maxLength: 32,
    minLength: 8,
  })
  password: string;

  @ApiProperty({
    description: 'Username for the new user account',
    example: 'testCreateUser1',
    maxLength: 30,
    minLength: 4,
  })
  username: string;
}
