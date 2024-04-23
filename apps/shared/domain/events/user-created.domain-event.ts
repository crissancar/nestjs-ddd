import { User } from '../../../api/src/app/modules/users/domain/aggregates/user.aggregate';
import { DomainEvent } from '../models/domain-event.model';

export enum UserDomainEvents {
	CREATED = 'user.created',
	UPDATED = 'user.updated',
}

export class UserCreatedDomainEvent extends DomainEvent {
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	constructor(data: { aggregateId: string; eventId: string; occurredOn: Date; attributes: User }) {
		const { aggregateId, eventId, occurredOn, attributes } = data;
		super({
			eventName: UserDomainEvents.CREATED,
			aggregateId,
			eventId,
			occurredOn,
			attributes,
		});
	}
}
