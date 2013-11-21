BROWSERIFY_IN  := ./scripts/custom.js
BROWSERIFY_OUT := ./scripts/custom-compiled.js

browserify := ./node_modules/.bin/browserify

default: watch
run:
	@node app

watch:
	@echo
	@echo Watching Assets
	@./bin/watch.sh

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

.PHONY: browserify compass watch build run
