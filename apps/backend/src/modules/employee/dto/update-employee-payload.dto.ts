import { CreateEmployeePayloadDto } from './create-employee-payload.dto';

// export class UpdateEmployeePayloadDto extends createZodDto(
//   updateEmployeePayloadSchema,
// ) {}

// here we define the DTO for creating an employee payload because createZodDto don't work with zod discriminatedUnion
export class UpdateeEmployeePayloadDto extends CreateEmployeePayloadDto {}
