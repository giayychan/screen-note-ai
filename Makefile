commands:
	python3 -m venv venv
	source venv/bin/activate

nextjs-packages:
	pnpm install

py-modules:
	pip3 install -r requirements.txt