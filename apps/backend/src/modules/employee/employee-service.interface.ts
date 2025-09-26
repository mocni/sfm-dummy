import { User } from '@/modules/user/entities/user.entity';
import { ResponseData } from '@/services/pagination';

import { CreateEmployeePayloadDto, GetEmployeesQueryDto } from './dto';
import { Employee } from './entities/employee.entity';
import { UpdateEmployeePayload } from './schemas/payloads';

export interface IEmployeeService {
  createEmployee(
    user: User,
    createEmployeePayload: CreateEmployeePayloadDto,
  ): Promise<Employee>;

  getEmployee(user: User, employeeId: string): Promise<Employee>;

  getEmployees(
    getEmployeesQuery: GetEmployeesQueryDto,
    user: User,
  ): Promise<ResponseData<Employee>>;

  remove(id: number): string;

  updateEmployee(
    user: User,
    id: string,
    updateEmployeePayload: UpdateEmployeePayload,
  ): Promise<Employee>;
}
