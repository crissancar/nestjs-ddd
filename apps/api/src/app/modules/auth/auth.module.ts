import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { ApiKeysModule } from '../api-keys/api-keys.module';
import { UsersModule } from '../users/users.module';
import { AuthSubscriber } from './application/services/auth-subscriber.service';
import { Authenticator } from './application/services/authenticator.service';
import { JwtCreator } from './application/services/jwt-creator.service';
import { AuthPostController } from './infrastructure/controllers/auth-post.controller';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';
import { LocalStrategy } from './infrastructure/strategies/local.strategy';
import { jwtConfig } from './jwt.config';

@Module({
	imports: [
		JwtModule.register(jwtConfig),
		ApiKeysModule,
		UsersModule,
		PassportModule,
		// BlacklistsModule,
	],
	controllers: [AuthPostController],
	providers: [AuthSubscriber, Authenticator, JwtCreator, JwtStrategy, LocalStrategy],
	exports: [JwtCreator],
})
export class AuthModule {}
