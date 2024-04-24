import { Controller, Post } from '@nestjs/common';

import { LoggerFactory } from '../../../../../../../shared/application/services/logger-factory.service';
import { UserAudiences } from '../../../../../../../shared/domain/enums/user-audiences.enum';
import { EndpointAuthentication } from '../../../../../../../shared/infrastructure/decorators/endpoint-authentication.decorator';
import { ApiKeyAudiences } from '../../../api-keys/domain/enums/api-key-audiences.enum';
import { AuthenticatedUser } from '../../application/dtos/authenticated-user.dto';
import { LoginUserResponse } from '../../application/dtos/login-user.response.dto';
import { JwtCreator } from '../../application/services/jwt-creator.service';
import { authConfig } from '../../auth.config';
import { Token } from '../../domain/interfaces/token.interface';
import { AuthUser } from '../decorators/auth-user.decorator';
import { LoginAuthentication } from '../decorators/login-authentication.decorator';
import { LoginSwagger } from '../swagger/decorators/login-swagger.decorator';
import { RefreshTokenSwagger } from '../swagger/decorators/refresh-swagger.decorator';

const { globalRoute, postController } = authConfig;
const { context, routes } = postController.constants;
const { login, refresh } = postController.logs;

const logger = LoggerFactory.create(context);

@Controller(globalRoute)
export class AuthPostController {
	constructor(private readonly jwtCreator: JwtCreator) {}

	@LoginSwagger()
	@LoginAuthentication(ApiKeyAudiences.ADMIN, ApiKeyAudiences.GENERAL)
	@Post(routes.login)
	login(@AuthUser() authUser: AuthenticatedUser): LoginUserResponse {
		logger.log(login.requestLog);

		return this.jwtCreator.run(authUser);
	}

	@RefreshTokenSwagger()
	@EndpointAuthentication(UserAudiences.ADMIN, UserAudiences.GENERAL)
	@Post(routes.refreshToken)
	refreshToken(@AuthUser() authUser: AuthenticatedUser): Token {
		logger.log(refresh.requestLog);

		return this.jwtCreator.run(authUser);
	}
}
