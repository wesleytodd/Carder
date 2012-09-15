setup:
	@git submodule init && git submodule update
	@cd test/lib/mocha && git config core.fileMode false
	@cd test/lib/expect && git config core.fileMode false

closure:
	@java -jar ~/scripts/closure/compiler.jar --js jquery.carder.js --js_output_file jquery.carder.min.js
	@touch jquery.carder.min.js.temp && echo "/* Credit Card Type Indication (carder) | Version 2.0 | http://wesleytodd.com/ | http://wlion.com */" >> jquery.carder.min.js.temp
	@cat jquery.carder.min.js >> jquery.carder.min.js.temp
	@cat jquery.carder.min.js.temp > jquery.carder.min.js
	@rm jquery.carder.min.js.temp

.PHONY: setup closure
