.PHONY = deps migrations migrations_tests seeds seeds_tests start start_infrastructure

# Install dependencies
deps:
	npm install

# Run TypeOrm migrations
migrations:
	npm run typeorm:migration:run

# Run TypeOrm migrations for tests
migrations_tests:
	npm run typeorm:migration:test:run

# Run TypeOrm seeds
seeds:
	npm run typeorm:seed:run

# Start api in dev environment
start_api:
	npm run api:start:dev

# Start backoffice in dev environment
start_backoffice:
	npm run backoffice:start:dev

# Build and start infrastructure
start_infrastructure:
	docker-compose up -d

# Run tests
tests:
	npm run test

# Run sync tests
tests_sync:
	npm run test:sync
