BROWSERIFY_IN  := ./public/scripts/custom.js
BROWSERIFY_OUT := ./public/scripts/custom-compiled.js

browserify := ./node_modules/.bin/browserify
forever := ./node_modules/.bin/forever

default: watch
run:
	@node app

run-production:
	@$(forever) start --minUptime 1000 --spinSleepTime 1000 app.js

browserify:
	@echo
	@echo Browserifying...
	@$(browserify) -e $(BROWSERIFY_IN) -o $(BROWSERIFY_OUT)
	@echo Finished Compiling JS

compass:
	@echo
	@echo Compiling Styles...
	@node bin/compass

build:
	@./bin/build.sh

.PHONY: browserify compass build run
