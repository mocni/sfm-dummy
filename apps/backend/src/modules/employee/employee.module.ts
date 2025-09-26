import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PaginationService } from '@/services/pagination';

import { User } from '../user/entities/user.entity';
import { UserModule } from '../user/user.module';

import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { Employee } from './entities/employee.entity';

@Module({
  controllers: [EmployeeController],
  exports: [EmployeeService],
  imports: [TypeOrmModule.forFeature([Employee, User]), UserModule],
  providers: [EmployeeService, PaginationService],
})
export class EmployeeModule {}
