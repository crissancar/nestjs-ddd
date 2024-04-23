import { BackofficeUser } from '../../domain/models/backoffice-user.model';

export class CreateBackofficeUserResponse {
	readonly id: string;

	readonly name: string;

	readonly email: string;

	constructor(id: string, name: string, email: string) {
		this.id = id;
		this.name = name;
		this.email = email;
	}

	static create(createdUser: BackofficeUser): CreateBackofficeUserResponse {
		const { id, name, email } = createdUser;

		return new CreateBackofficeUserResponse(id, name, email);
	}
}
