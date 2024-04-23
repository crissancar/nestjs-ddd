import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';

import { loggerConfig } from '../../../shared/infrastructure/logger/logger.config';
import { CorrelationIdMiddleware } from '../../../shared/infrastructure/middlewares/correlation-id.middleware';
import { typeOrmConfig } from '../config/orm/typeorm.config';
import { providersConfig } from './app.config';
import { AppController } from './app.controller';
import { UsersModule } from './modules/users/users.module';

@Module({
	imports: [LoggerModule.forRoot(loggerConfig), TypeOrmModule.forRoot(typeOrmConfig), UsersModule],
	controllers: [AppController],
	providers: providersConfig,
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer): void {
		consumer.apply(CorrelationIdMiddleware).forRoutes('*');
	}
}
