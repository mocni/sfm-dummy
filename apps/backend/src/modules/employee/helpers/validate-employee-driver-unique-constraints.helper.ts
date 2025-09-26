import { ConflictException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { CreateEmployeePayloadDto } from '../dto';
import { Employee } from '../entities/employee.entity';

import { employeeWithDataExists } from './employee-with-data-exist.helper';

export const validateEmployeeDriverUniqueConstraints = async (
  createEmployeePayload: CreateEmployeePayloadDto,
  employeeRepository: Repository<Employee>,
): Promise<void> => {
  const { driver_card_number, driver_licence_number, oib } =
    createEmployeePayload;

  if (oib && (await employeeWithDataExists('oib', oib, employeeRepository))) {
    throw new ConflictException(`Employee with OIB ${oib} already exists`);
  }

  if (
    driver_licence_number &&
    (await employeeWithDataExists(
      'driver_licence_number',
      driver_licence_number,
      employeeRepository,
    ))
  ) {
    throw new ConflictException(
      `Driver with driver licence number ${driver_licence_number} already exists`,
    );
  }
  if (
    driver_card_number &&
    (await employeeWithDataExists(
      'driver_card_number',
      driver_card_number,
      employeeRepository,
    ))
  ) {
    throw new ConflictException(
      `Driver with card number ${driver_card_number} already exists`,
    );
  }
};
