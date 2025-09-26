import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import {
  permission,
  Permission,
  UserGroup,
  userGroup,
} from '@smart-fleet-management/users';

import { Employee } from '@/modules/employee/entities/employee.entity';

@Entity()
export class User {
  @Exclude({ toPlainOnly: true })
  email: string;

  @JoinColumn({ name: 'employee_id' })
  @OneToOne(() => Employee, (employee) => employee.id)
  employee: Employee;

  @Column({ name: 'employee_id', nullable: true, type: 'uuid' })
  employee_id?: string;

  @Column({
    array: true,
    default: [],
    enum: userGroup,
    type: 'enum',
  })
  @Exclude()
  groups: UserGroup[];

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Exclude()
  password: string;

  @Column({
    array: true,
    default: [],
    enum: permission,
    type: 'enum',
  })
  @Exclude()
  permissions: Permission[];

  @Exclude()
  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @Column({ unique: true })
  username: string;

  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }

  async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}
