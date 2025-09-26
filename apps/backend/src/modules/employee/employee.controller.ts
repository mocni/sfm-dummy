import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ZodValidationPipe } from 'nestjs-zod';

import { permission } from '@smart-fleet-management/users';

import { Permissions, UserSession } from '@/common/infrastructure/decorators';
import { ResponseData } from '@/services/pagination';
import {
  CreateSwaggerDocs,
  GetByIdSwaggerDocs,
  PaginatedResponseSwaggerDocs,
  UpdateByIdSwaggerDocs,
} from '@/services/swagger/decorators';

import { User } from '../user/entities/user.entity';

import {
  CreateEmployeePayloadDto,
  CreateEmployeeResponseDto,
  GetEmployeesQueryDto,
  UpdateeEmployeePayloadDto,
} from './dto';
import { EmployeeService } from './employee.service';
import { Employee } from './entities/employee.entity';
import {
  CreateEmployeePayload,
  createEmployeePayloadSchema,
  UpdateEmployeePayload,
  updateEmployeePayloadSchema,
} from './schemas/payloads';
import { getEmployeesQuerySchema } from './schemas/queries';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @CreateSwaggerDocs({
    apiOkResponseDto: CreateEmployeeResponseDto,
    bodyDto: CreateEmployeePayloadDto,
    summary: 'Create new Employee',
  })
  @HttpCode(HttpStatus.CREATED)
  @Permissions([permission.EMPLOYEE_MODULE_WRITE])
  @Post()
  createEmployee(
    @UserSession() user: User,
    @Body(new ZodValidationPipe(createEmployeePayloadSchema))
    createEmployeePayload: CreateEmployeePayload,
  ): Promise<Employee> {
    return this.employeeService.createEmployee(user, createEmployeePayload);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @PaginatedResponseSwaggerDocs(
    CreateEmployeeResponseDto,
    'Get all user employees',
    'This API method will return all employees which belongs to the signed in user company.',
  )
  @Permissions([permission.EMPLOYEE_MODULE_READ])
  getEmployees(
    @UserSession() user: User,
    @Query(new ZodValidationPipe(getEmployeesQuerySchema))
    getDispatchesQuery: GetEmployeesQueryDto,
  ): Promise<ResponseData<Employee>> {
    return this.employeeService.getEmployees(getDispatchesQuery, user);
  }

  @Get(':id')
  @GetByIdSwaggerDocs({
    apiOkResponseDto: CreateEmployeeResponseDto,
    pathParam: {
      name: 'id',
    },
    title: 'Get employee by id',
  })
  @Permissions([permission.EMPLOYEE_MODULE_READ])
  async getEmployee(
    @UserSession() user: User,
    @Param('id') employeeId: string,
  ): Promise<Employee> {
    return this.employeeService.getEmployee(user, employeeId);
  }

  @Patch(':id')
  @Permissions([permission.EMPLOYEE_MODULE_WRITE])
  @UpdateByIdSwaggerDocs({
    apiBodySchema: UpdateeEmployeePayloadDto,
    apiOkResponseDto: CreateEmployeePayloadDto,
    summary: 'Update employee by id',
  })
  async updateEmployee(
    @UserSession() user: User,
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateEmployeePayloadSchema))
    updateEmployeePayload: UpdateEmployeePayload,
  ): Promise<Employee> {
    return this.employeeService.updateEmployee(user, id, updateEmployeePayload);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeService.remove(+id);
  }
}
