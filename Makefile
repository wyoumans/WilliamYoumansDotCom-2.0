BROWSERIFY_IN  := ./public/scripts/custom.js
BROWSERIFY_OUT := ./public/scripts/custom-compiled.js

browserify := ./node_modules/.bin/browserify

default: watch
run:
	@node app

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

update:
	@node scripts/fetch-images.js
	@node scripts/fetch-tracks.js

.PHONY: browserify compass build update run
