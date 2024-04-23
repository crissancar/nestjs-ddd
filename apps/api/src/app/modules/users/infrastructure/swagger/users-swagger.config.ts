import { HttpStatus } from '@nestjs/common';

import { CreateUserRequest } from '../../application/dtos/create-user-request.dto';
import { CreateUserResponse } from '../../application/dtos/create-user-response.dto';

export const usersSwaggerConfig = {
	tag: 'Users',
	create: {
		operation: {
			summary: 'Create user',
		},
		body: { type: CreateUserRequest },
		response: {
			created: {
				status: HttpStatus.CREATED,
				description: 'Created',
				type: CreateUserResponse,
			},
			badRequest: {
				status: HttpStatus.BAD_REQUEST,
				description: 'Bad Request',
			},
		},
	},
};
