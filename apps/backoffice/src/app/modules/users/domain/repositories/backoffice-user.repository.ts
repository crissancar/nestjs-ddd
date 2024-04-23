import { BackofficeUser } from '../models/backoffice-user.model';

export interface BackofficeUserRepository {
	create(user: BackofficeUser): Promise<BackofficeUser>;
}
