.PHONY = deps migrations migrations_tests seeds seeds_tests start start_infrastructure

# Build image
build:
	docker build -t nestjs-ddd-example:dev .

# Install dependencies
deps:
	npm install

# Start api in dev environment
start_api:
	npm run api:start:dev

# Start backoffice in dev environment
start_backoffice:
	npm run backoffice:start:dev

# Build and start infrastructure
start_infrastructure:
	docker-compose up -d

# Clean docker containers
clean:
	docker-compose down --rmi local --volumes --remove-orphans

# Prepare database tables and data
prepare_databases:
	npm run databases:build
