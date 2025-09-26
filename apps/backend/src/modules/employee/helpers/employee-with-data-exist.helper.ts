import { Repository } from 'typeorm';

import { Employee } from '../entities/employee.entity';

export const employeeWithDataExists = async (
  key: string,
  searchValue: string,
  employeeRepository: Repository<Employee>,
): Promise<boolean> => {
  const employee = await employeeRepository.findOne({
    where: { [key]: searchValue },
  });
  return !!employee;
};
