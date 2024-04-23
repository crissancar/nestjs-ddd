import { UserAudiences } from '../../../../../../../shared/domain/enums/user-audiences.enum';
import { Timestamp } from '../../../../../../../shared/domain/models/timestamp.model';

export class BackofficeUser extends Timestamp {
	readonly id: string;

	readonly name: string;

	readonly email: string;

	readonly password: string;

	readonly audiences: Array<UserAudiences>;

	constructor(id: string, name?: string, email?: string, password?: string) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.password = password;
	}

	static create(id: string, name: string, email: string, password: string): BackofficeUser {
		return new BackofficeUser(id, name, email, password);
	}
}
