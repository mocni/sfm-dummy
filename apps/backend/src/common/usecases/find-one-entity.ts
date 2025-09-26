//TODO create findOne method which will search for a single entity in the database

import { NotFoundException } from '@nestjs/common';
import { ObjectLiteral, Repository } from 'typeorm';

import { User } from '@/modules/user/entities/user.entity';

export async function findOneEntity<Entity extends ObjectLiteral>(
  entityName: string,
  user: User,
  id: string,
  repository: Repository<Entity>,
): Promise<Entity> {
  // DIFFERENT CONDITION TO FIND COMPANY ENTITY
  const whereCondition = { id, user: { id: user.id } };

  // SEARCH DATABASE
  const result = await repository.findOne({
    where: whereCondition as any,
  });

  // VALIDATE REQUEST
  if (!result) {
    throw new NotFoundException(`${entityName} with id ${id} doesn't exist`);
  }

  // RETURN ONE ENTITY BY ID
  return result;
}
