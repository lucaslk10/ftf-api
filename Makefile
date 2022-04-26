SHELL := /bin/bash
.PHONY: check-dependencies-to-run tests dev dev-local dev-turn-off

check-dependencies-to-run:
	./scripts/check-dependencies-to-run.sh

#run the application and all it's dependencies with docker
dev: check-dependencies-to-run
	docker build -t api -f Dockerfile . && \
	docker-compose up -d

	