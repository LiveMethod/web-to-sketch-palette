# Generate static files
build:
	# make the docs dir if it doesn't exist
	mkdir -p docs
	
	# Convert pug to html
	pug ./src --out ./docs

	# Convert less to css
	lessc ./src/styles/main.less ./docs/styles/main.css

	# move static assets
	cp -r ./src/fonts ./docs
	cp -r ./src/img ./docs
	cp -r ./src/js ./docs

# Delete static files
clean:
	rm -rf ./docs

# Build everything and serve it locally
dev: build
	cd ./docs; \
		python -m SimpleHTTPServer 8055