import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { CreateEmployeePayloadDto } from './create-employee-payload.dto';

// here we define the DTO for creating an employee payload because createZodDto don't work with zod discriminatedUnion
export class CreateEmployeeResponseDto extends CreateEmployeePayloadDto {
  @ApiPropertyOptional()
  created_at?: Date;
  @ApiProperty()
  id: string;
  @ApiPropertyOptional()
  updated_at?: Date;
}
