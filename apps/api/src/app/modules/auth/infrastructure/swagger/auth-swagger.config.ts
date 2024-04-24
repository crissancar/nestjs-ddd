import { sharedResponsesSwagger } from '../../../../../../../shared/infrastructure/config/swagger/shared-responses.swagger';
import { AuthenticatedUser } from '../../application/dtos/authenticated-user.dto';
import { LoginUserResponse } from '../../application/dtos/login-user.response.dto';
import { LoginUserRequest } from '../../application/dtos/login-user-request.dto';
import { RefreshTokenResponse } from '../../application/dtos/refresh-token-response.dto';

const { ok, unauthorized, badRequest } = sharedResponsesSwagger;

export const authSwaggerConfig = {
	tag: 'Auth',
	login: {
		operation: {
			summary: 'Login user',
		},
		body: { type: LoginUserRequest },
		response: {
			ok: {
				...ok,
				type: LoginUserResponse,
			},
			unauthorized,
		},
	},
	refreshToken: {
		operation: {
			summary: 'Refresh user token',
		},
		body: { type: AuthenticatedUser },
		response: {
			ok: {
				...ok,
				type: RefreshTokenResponse,
			},
			badRequest,
		},
	},
};
