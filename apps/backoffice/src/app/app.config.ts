import { Provider, ValidationError, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';

import { RabbitMQLoggingInterceptor } from '../../../shared/config/interceptors/rabbitmq-logging.interceptor';
import { TransformInterceptor } from '../../../shared/config/interceptors/transform.interceptor';
import { ValidationException } from '../../../shared/domain/exceptions/validation.exception';
import { ExceptionsFilter } from '../../../shared/infrastructure/filters/exceptions.filter';

export const providersConfig: Array<Provider> = [
	{
		provide: APP_INTERCEPTOR,
		useFactory: () => new TransformInterceptor(),
	},
	{
		provide: APP_INTERCEPTOR,
		useFactory: () => new RabbitMQLoggingInterceptor(),
	},
	{
		provide: APP_FILTER,
		useFactory: () => new ExceptionsFilter(),
	},
	{
		provide: APP_PIPE,
		useFactory: () =>
			new ValidationPipe({
				exceptionFactory: (errors: ValidationError[]) => new ValidationException(errors),
				whitelist: true,
			}),
	},
];
