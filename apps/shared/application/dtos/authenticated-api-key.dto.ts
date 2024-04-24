import { ApiKeyEntity } from '../../../api/src/app/modules/api-keys/infrastructure/persistence/api-key.entity';

export class AuthenticatedApiKey {
	readonly key: string;

	constructor(key: string) {
		this.key = key;
	}

	static create(apiKey: ApiKeyEntity): AuthenticatedApiKey {
		const { key } = apiKey;

		return new AuthenticatedApiKey(key);
	}
}
