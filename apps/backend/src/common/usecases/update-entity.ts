//TODO create findOne method which will search for a single entity in the database

import { BadRequestException, ConflictException } from '@nestjs/common';
import {
  DeepPartial,
  ObjectLiteral,
  QueryFailedError,
  Repository,
} from 'typeorm';

import { User } from '@/modules/user/entities/user.entity';

import { findOneEntity } from './find-one-entity';

export async function updateEntity<Entity extends ObjectLiteral>(
  entityName: string,
  user: User,
  id: string,
  repository: Repository<Entity>,
  updateEntityDto: DeepPartial<Entity>,
): Promise<Entity> {
  // SEARCH ONE ENTITY IN DATABASE
  const entity = await findOneEntity<Entity>(entityName, user, id, repository);

  // UPDATE ENTITY
  try {
    const updatedEntity = repository.merge(entity, updateEntityDto);
    return await repository.save(updatedEntity);
  } catch (error) {
    if (error instanceof QueryFailedError) {
      throw new ConflictException(
        `Database conflict while updating ${entityName}: ${error.message}`,
      );
    }
    throw new BadRequestException(`Failed to update ${entityName}: ${error}`);
  }
}
