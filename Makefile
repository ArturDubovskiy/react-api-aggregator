.PHONY: up down test test-watch test-coverage build-dev build-prod clean-docker

up:
	docker-compose up -d && docker-compose logs -f react-fetchify

test:
	docker-compose run --rm react-fetchify npm run test

test-watch:
	docker-compose run --rm react-fetchify npm run test:watch

test-coverage:
	docker-compose run --rm react-fetchify npm run test:coverage

down:
	docker-compose stop

clean-docker:
	docker system prune --all --volumes

build-dev:
	docker-compose run --rm react-fetchify npm run build:dev

build-prod:
	docker-compose run --rm react-fetchify npm run build:prod

