export const usersConfig = {
	entity: { name: 'user' },
	repository: {
		repositoryInterface: 'BackofficeUserRepository',
	},
	creator: {
		constants: {
			context: 'BackofficeUserCreator',
		},
	},
};
