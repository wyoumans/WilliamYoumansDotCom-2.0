forever := ./node_modules/.bin/forever

default: run
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

empty:
	@./bin/empty.sh

populate:
	@./bin/populate.sh

reset:
	@make empty
	@make populate

.PHONY: browserify compass build run run-forever empty populate reset
