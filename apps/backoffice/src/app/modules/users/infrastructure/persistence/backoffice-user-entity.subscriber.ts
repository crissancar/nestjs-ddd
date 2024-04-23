import {
	DataSource,
	EntitySubscriberInterface,
	EventSubscriber,
	InsertEvent,
	UpdateEvent,
} from 'typeorm';

import { Bcrypt } from '../../../../../../../shared/application/services/bcrypt.service';
import { EntitySubscriberListenTo } from '../../../../../../../shared/domain/types/entity-subscriber-listen-to.type';
import { BackofficeUserEntity } from './backoffice-user.entity';

@EventSubscriber()
export class BackofficeUserEntitySubscriber
	implements EntitySubscriberInterface<BackofficeUserEntity>
{
	constructor(private readonly dataSource: DataSource) {
		dataSource.subscribers.push(this);
	}

	listenTo(): EntitySubscriberListenTo {
		return BackofficeUserEntity;
	}

	beforeInsert(event: InsertEvent<BackofficeUserEntity>): void {
		const { entity } = event;

		entity.password = Bcrypt.hash(entity.password);
	}

	beforeUpdate(event: UpdateEvent<BackofficeUserEntity>): void {
		const { databaseEntity } = event;
		const entity = event.entity as BackofficeUserEntity;

		if (!entity.password) {
			return;
		}

		if (this.isNewPassword(entity.password, databaseEntity.password)) {
			entity.password = Bcrypt.hash(entity.password);
		} else {
			entity.password = databaseEntity.password;
		}
	}

	private isNewPassword(password: string, savedPassword: string): boolean {
		return !BackofficeUserEntity.comparePasswords(password, savedPassword);
	}
}
