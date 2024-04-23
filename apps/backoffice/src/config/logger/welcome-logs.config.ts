import * as colorette from 'colorette';
import * as process from 'process';

import { LoggerFactory } from '../../../../shared/application/services/logger-factory.service';
import { config } from '../app';

const { api, project, env } = config;

const logger = LoggerFactory.create('');

export class WelcomeLogs {
	static apiUrl = `http://localhost:${api.port}`;
	static apiVersion = api.version;
	static projectName = project.appName;
	static environment = config.environment;
	static PWD = config.PWD;
	static showEnv = env.show;

	static run(): void {
		logger.log(`${this.projectName} is running at <${this.apiUrl}/${this.apiVersion}>`);
		logger.log(`Documentation is running at <${this.apiUrl}/docs>`);
		logger.log(`Environment: ${this.environment}`);
		logger.log(`Root: ${this.PWD}`);
		if (this.showEnv) {
			const apiEnv = Object.fromEntries(
				Object.entries(process.env).filter(([key]) => /^BACKOFFICE/.test(key)),
			);
			logger.debug({
				message: colorette.yellowBright('Backoffice environment variables'),
				...apiEnv,
			});
		}
	}
}
