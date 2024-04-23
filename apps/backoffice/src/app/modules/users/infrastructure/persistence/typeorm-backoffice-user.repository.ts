import { ClassTransformer } from '../../../../../../../shared/application/services/class-transformer.service';
import { GenericEntityClassOrSchema } from '../../../../../../../shared/domain/types/generic-entity-class-or-schema.type';
import { TypeOrmRepository } from '../../../../../../../shared/infrastructure/persistence/typeorm.repository';
import { BackofficeUser } from '../../domain/models/backoffice-user.model';
import { BackofficeUserRepository } from '../../domain/repositories/backoffice-user.repository';
import { BackofficeUserEntity } from './backoffice-user.entity';

export class TypeOrmBackofficeUserRepository
	extends TypeOrmRepository<BackofficeUserEntity>
	implements BackofficeUserRepository
{
	async create(user: BackofficeUser): Promise<BackofficeUser> {
		const entity = BackofficeUserEntity.create(user.id, user.name, user.email, user.password);
		const createdEntity = await this.persistEntity(entity);

		return ClassTransformer.entityToModel(createdEntity, BackofficeUser);
	}

	protected entitySchema(): GenericEntityClassOrSchema<BackofficeUserEntity> {
		return BackofficeUserEntity;
	}
}
