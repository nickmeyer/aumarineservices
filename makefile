default:
	npm install

lint:
	npm lint

clean:
	rm -rf node_modules
	npm cache verify
	npm install

start:
	rm -rf src
	npm start

build:
	npm build

lock:
	npm install --package-lock
