import { ApiProperty } from '@nestjs/swagger';

import { Token } from '../../domain/interfaces/token.interface';
import { authPropertiesSwagger } from '../../infrastructure/swagger/properties/auth-properties.swagger';

const { accessToken, refreshToken } = authPropertiesSwagger;

export class LoginUserResponse {
	@ApiProperty(accessToken)
	readonly accessToken: string;

	@ApiProperty(refreshToken)
	readonly refreshToken: string;

	constructor(accessToken: string, refreshToken: string) {
		this.refreshToken = refreshToken;
	}

	static create(token: Token): LoginUserResponse {
		const { accessToken, refreshToken } = token;

		return new LoginUserResponse(accessToken, refreshToken);
	}
}
