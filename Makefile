# Get version tag
TAG_VERSION := $(shell git describe --tags --abbrev=0)

# Release is number of commits since the version tag
GIT_COMMITS := $(shell git describe --tags --long | cut -d- -f2 | tr - _)
GIT_HASH := $(shell git log -n 1 --pretty=format:"%h")

VERSION := "$(TAG_VERSION)-$(GIT_COMMITS).$(GIT_HASH).demonware"

ROOT_DIR=/usr/share/devzone
DEVZONE_FRONTEND_REPO = $(shell pwd)
DOCKER_IMAGE = docker-hub.ihs.demonware.net/node:12.16.1-buster
E2E_DOCKER_IMAGE =  docker.las.demonware.net/devzone/devzone-frontend-e2e
IT:=$(shell [ -t 0 ] && echo -it)

.PHONY: version
version:
	@echo $(VERSION)

########################################
# Install Dependencies
########################################

.PHONY: install install-% create-dependencies-%
create-dependencies-%:
	@echo 'Creating $* dependency...'
	@docker run --rm \
		--name devzone-frontend-create-dependency-$* \
		-w /app \
		-v $(DEVZONE_FRONTEND_REPO):/app \
		-e CI=true \
		$(DOCKER_IMAGE) \
		bash -c "yarn build:$*"
	@echo 'Devzone Frontend dependency $* created successfully.'

install:
	@echo 'Installing dependencies...'
	@docker run --rm \
		--name devzone-frontend-install \
		-w /app \
		-v $(DEVZONE_FRONTEND_REPO):/app \
		-e CI=true \
		$(DOCKER_IMAGE) \
		bash -c "yarn ci:install"
	@echo 'Devzone Frontend dependencies installed successfully.'

install-%:
	@echo 'Installing $* dependencies...'
	@docker run --rm \
		--name devzone-frontend-install-$* \
		-w /app \
		-v $(DEVZONE_FRONTEND_REPO)/guest-apps/$*:/app \
		-v $(DEVZONE_FRONTEND_REPO)/lib:/app/dw \
		-e CI=true \
		$(DOCKER_IMAGE) \
		bash -c "cd dw && yarn unlink | true && yarn link && cd .. && yarn link dw && yarn install"
	@echo 'Devzone Frontend dependencies for $* installed successfully.'

########################################
# Linters
########################################

.PHONY: lint lint-% check-style

lint:
	@echo 'Linting JS...'
	@docker run --rm \
		--name devzone-frontend-linter \
		-w /app \
		-v $(DEVZONE_FRONTEND_REPO):/app \
		-e CI=true \
		$(DOCKER_IMAGE) \
		bash -c "yarn lint"
	@echo 'Javascript looks good to me'

lint-%:
	@echo 'Linting "$*" JS...'
	@docker run --rm \
		--name devzone-frontend-linter-$* \
		-w /app \
		-v $(DEVZONE_FRONTEND_REPO)/guest-apps/$*:/app \
		-v $(DEVZONE_FRONTEND_REPO)/lib:/app/dw \
		-e CI=true \
		$(DOCKER_IMAGE) \
		bash -c "cd dw && yarn link && cd .. && yarn link dw && yarn lint"
	@echo 'Javascript looks good to me'

check-style:
	@echo 'Checking style...'
	@docker run --rm \
		--name devzone-frontend-check-style \
		-w /app \
		-v $(DEVZONE_FRONTEND_REPO):/app \
		-e CI=true \
		$(DOCKER_IMAGE) \
		bash -c "yarn ci:check-style"
	@echo 'Style looks good to me'

check-style-%:
	@echo 'Checking $* style...'
	@docker run --rm \
		--name devzone-frontend-check-style-$* \
		-w /app \
		-v $(DEVZONE_FRONTEND_REPO)/guest-apps/$*:/app \
		-e CI=true \
		$(DOCKER_IMAGE) \
		bash -c "yarn ci:check-style"
	@echo 'Style looks good to me'

########################################
# Javascript tests
########################################

.PHONY: e2e

e2e-qa:
	@echo 'E2E Testing Devzone Frontend QA'
	docker-compose -f docker-compose.qa.yml run e2e

e2e-prod:
	@echo 'E2E Testing Devzone Frontend Prod'
	docker-compose -f docker-compose.prod.yml run e2e

e2e-qa-proxy:
	@echo 'E2E Testing Devzone Frontend QA'
	docker-compose -f docker-compose.qa.yml run -e HTTP_PROXY='http://proxy.las.demonware.net:3128' e2e

e2e-prod-proxy:
	@echo 'E2E Testing Devzone Frontend Prod'
	docker-compose -f docker-compose.prod.yml run -e HTTP_PROXY='http://proxy.las.demonware.net:3128' e2e

e2e-local:
	@echo 'E2E Testing Devzone Frontend Local'
	docker-compose -f docker-compose.e2e.yml up -d studio
	docker-compose -f docker-compose.e2e.yml build e2e
	docker-compose -f docker-compose.e2e.yml run e2e
	docker-compose -f docker-compose.e2e.yml stop

e2e-dev:
	@echo 'E2E Testing Devzone Frontend Local'
	docker-compose -f docker-compose.dev.yml up -d studio
	docker-compose -f docker-compose.dev.yml build e2e
	docker-compose -f docker-compose.dev.yml run e2e
	docker-compose -f docker-compose.dev.yml stop

e2e-local-%:
	@echo 'E2E Testing Devzone Frontend Local "$*"'
	docker-compose -f docker-compose.e2e-$*.yml up -d studio
	docker-compose -f docker-compose.e2e-$*.yml up -d $*
	docker-compose -f docker-compose.e2e-$*.yml build e2e
	docker-compose -f docker-compose.e2e-$*.yml run e2e
	docker-compose -f docker-compose.e2e-$*.yml stop


########################################
# Build Devzone Frontend bundle
########################################

AG_GRID_LICENCE_REPLACE_TEXT = 'process.env.REACT_APP_AG_GRID_LICENSE_KEY'
AG_GRID_LICENCE ?= 'TEST_AG_GRID_LICENCE_KEY'

.PHONY: build
build:
	@echo 'Building Devzone Frontend bundle...'
	@docker run --rm \
		--name devzone-frontend-build \
		-w /app \
		-v $(DEVZONE_FRONTEND_REPO):/app \
		-e REACT_APP_VERSION=$(VERSION) \
		-e CI=true \
		$(DOCKER_IMAGE) \
		bash -c "yarn build"
	@echo 'Devzone Frontend javascript bundle built successfully.'


########################################
# Docs
########################################

.PHONY: developer-docs publish-docs docker-%

docker-%:
	docker run $(IT) \
		--rm \
		-v /app/node_modules \
		-v $(DEVZONE_FRONTEND_REPO):/app \
		-w /app \
		$(DOCKER_IMAGE) \
		bash -c "make $*"

developer-docs:
	mkdir -p ./developer-docs
	cp ./docs/index.html.tpl ./developer-docs/index.html
	yarn
	yarn --max_old_space_size=4096 build-storybook -c .storybook -o ./developer-docs/storybook
	chmod -R 777 developer-docs/storybook
	chmod -R 777 packages/devzone-core

TMP_BRANCH_NAME := tmp_branch_$(shell echo $$RANDOM)
GH_PAGES_BRANCH=gh-pages
publish-docs:
	git checkout -b ${TMP_BRANCH_NAME}
	cd packages/devzone-core && (yarn && yarn build || true) && cd ..
	echo "!/developer-docs" >> .gitignore
	git add developer-docs
	git commit -m 'Automatic update docs'
	git remote set-url origin https://$(GIT_USER):$(GIT_PASS)@github.ihs.demonware.net/Demonware/devzone-frontend.git
	git subtree split --prefix developer-docs -b ${GH_PAGES_BRANCH}
	git push -f origin ${GH_PAGES_BRANCH}:${GH_PAGES_BRANCH}
	git checkout -
	git checkout .
	git branch -D ${TMP_BRANCH_NAME}
	git branch -D ${GH_PAGES_BRANCH}

########################################
# Docker image
########################################

.PHONY: build-image push-image

build-image:
	@docker build --pull -t $(DOCKER_IMAGE) .

push-image:
	@docker push -a $(DOCKER_IMAGE)
