import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthenticatedUser } from '../../application/dtos/authenticated-user.dto';
import { Authenticator } from '../../application/services/authenticator.service';
import { authConfig } from '../../auth.config';

const { localStrategy } = authConfig;
const { strategyFields } = localStrategy.constants;
const { email, password } = strategyFields;

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly authenticator: Authenticator) {
		super({
			usernameField: email,
			passwordField: password,
		});
	}

	async validate(email: string, password: string): Promise<AuthenticatedUser> {
		return this.authenticator.run({ email, password });
	}
}
