import { Inject, Injectable } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

import { LoggerFactory } from '../../../../../../../shared/application/services/logger-factory.service';
import { TypeOrmError } from '../../../../../../../shared/application/services/typeorm-error.service';
import { UserWithEmailAlreadyExistsException } from '../../domain/exceptions/user-with-email-already-exists.exception';
import { BackofficeUser } from '../../domain/models/backoffice-user.model';
import { BackofficeUserRepository } from '../../domain/repositories/backoffice-user.repository';
import { usersConfig } from '../../users.config';
import { CreateBackofficeUserRequest } from '../dtos/create-backoffice-user-request.dto';

const { creator, repository } = usersConfig;
const { repositoryInterface } = repository;
const { context } = creator.constants;

const logger = LoggerFactory.create(context);

@Injectable()
export class BackofficeUserCreator {
	constructor(@Inject(repositoryInterface) private readonly repository: BackofficeUserRepository) {}

	async run(request: CreateBackofficeUserRequest): Promise<void> {
		const user = BackofficeUser.create(request.id, request.name, request.email, request.password);

		try {
			await this.repository.create(user);

			logger.log(`Backoffice user <${user.id}> created in database`);
		} catch (error) {
			if (TypeOrmError.isUnique(error as QueryFailedError)) {
				throw new UserWithEmailAlreadyExistsException(context, user.email);
			}
			logger.error(error);
			throw error;
		}
	}
}
