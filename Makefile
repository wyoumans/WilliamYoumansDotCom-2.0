forever := ./node_modules/.bin/forever

default: watch
run:
	@node app

run-forever:
	@$(forever) start --minUptime 1000 --spinSleepTime 1000 app.js

compass:
	@echo
	@echo Compiling Styles...
	@node bin/compass

build:
	@./bin/build.sh

.PHONY: browserify compass build run run-forever
