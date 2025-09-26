// // If employee_id is provided, validate the employee exists and belongs to the same company
// if (employee_id) {
//   const employee = await this.employeeRepository.findOne({
//     relations: ['company'],
//     where: { id: employee_id },
//   });

import { Repository } from 'typeorm';

// import { Company } from '@/modules/company/entities/company.entity';
import { Employee } from '@/modules/employee/entities/employee.entity';

export const employeeEntityExists = async (
  employee_id: string,
  employeeRepository: Repository<Employee>,
): Promise<Employee | null> => {
  const employee = await employeeRepository.findOne({
    relations: ['company'],
    where: { id: employee_id },
  });

  return employee;
};
