clean:
	rm -rf dist

watch:
	$$(npm bin)/tsc -w

build: clean
	$$(npm bin)/tsc
	find ./dist -name '*.ts' -exec sed -i "s/\.ts/\.js/g" {} +

serve:
	$$(npm bin)/http-server
