import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { EmployeeType } from '@smart-fleet-management/common';

import { User } from '@/modules/user/entities/user.entity';

import { CompanyCardModel } from '../models';

@Entity()
export class Employee {
  @Column({ nullable: true, type: 'jsonb' })
  company_cards?: CompanyCardModel | null;

  //Kartica vozača
  @Column({ nullable: true, type: 'varchar', unique: true })
  driver_card_number?: null | string;

  @Column({ nullable: true, type: 'date' })
  driver_card_validation_period?: Date | null;

  //Vozačka dozvola
  @Column({ nullable: true, type: 'varchar', unique: true })
  driver_licence_number?: null | string;

  @Column({ nullable: true, type: 'date' })
  driver_licence_validation_period?: Date | null;

  @Column()
  first_name: string;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  last_name: string;

  @Column({ nullable: true, type: 'varchar', unique: true })
  oib?: null | string;

  @Column({ nullable: true, type: 'varchar' })
  phone_number?: null | string;

  @Column({
    array: false,
    enum: EmployeeType,
    type: 'enum',
  })
  @Exclude()
  type: EmployeeType;

  @Exclude()
  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @JoinColumn({ name: 'user_id' })
  @OneToOne(() => User, (user) => user.id)
  user: User;
}
