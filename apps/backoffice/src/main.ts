import { NestFactory } from '@nestjs/core';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { Logger } from 'nestjs-pino';
import responseTime from 'response-time';

import { AppModule } from './app/app.module';
import { config } from './config/app';
import { WelcomeLogs } from './config/logger/welcome-logs.config';

const { api } = config;

async function bootstrap(): Promise<void> {
	const app = await NestFactory.create(AppModule);

	// Set Pino logger
	app.useLogger(app.get(Logger));

	// Set global prefix
	app.setGlobalPrefix(api.version);

	// Set Cors
	app.enableCors(api.cors);

	// Compress all responses
	app.use(compression());

	// Set Helmet
	app.use(helmet(api.helmet));

	// Set Rate Limit
	app.use(rateLimit(api.rateLimit));

	// ResponseTime
	if (api.responseTime) {
		app.use(responseTime());
	}

	// Launch the app
	await app.listen(api.port);

	// Welcome logs
	WelcomeLogs.run();
}

void bootstrap();
