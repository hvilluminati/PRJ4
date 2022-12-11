export default {
	preset: 'ts-jest',
	testEnvironment: 'node',
	transform: {
		'^.+\\.ts?$': 'ts-jest',
		'\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
			'<rootDir>/fileTransformer.js',
		'^.+\\.(js|jsx)$': 'babel-jest',
	},
	transformIgnorePatterns: ['<rootDir>/node_modules/'],
	resolver: 'jest-ts-webcompat-resolver',
	setupFiles: [
		'./__mocks__/client.js',
		'./__mocks__/localStorage.js',
		'./__mocks__/nav.js',
	],
	moduleNameMapper: {
		'\\.(css|less)$': 'identity-obj-proxy',
	},
};
