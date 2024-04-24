import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

import { InvalidApiKeyException } from '../../../api/src/app/modules/api-keys/domain/exceptions/invalid-api-key.exception';
import { ApiKeyEntity } from '../../../api/src/app/modules/api-keys/infrastructure/persistence/api-key.entity';
import { apiKeyGuardConstants } from '../config/constants/api-key-guard.constants';

const { context, passportStrategy } = apiKeyGuardConstants;

@Injectable()
export class ApiKeyGuard extends AuthGuard(passportStrategy) {
	// @ts-ignore
	handleRequest(
		error: unknown,
		apiKey: ApiKeyEntity,
		info: unknown,
		executionContext: ExecutionContext,
	): ApiKeyEntity {
		const request = executionContext.switchToHttp().getRequest<Request>();

		if (!apiKey) {
			throw new InvalidApiKeyException(context);
		}

		request.apiKey = apiKey;

		return apiKey;
	}
}
