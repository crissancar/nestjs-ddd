import { ApiKeyEntity } from '../../../app/modules/api-keys/infrastructure/persistence/api-key.entity';
import { AuthenticatedUser } from '../../../app/modules/auth/application/dtos/authenticated-user.dto';

declare global {
	namespace Express {
		interface Request {
			apiKey: ApiKeyEntity;
			authUser: AuthenticatedUser;
		}
	}
}

export {};
