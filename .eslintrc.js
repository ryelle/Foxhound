module.exports = {
	root: true,
	'extends': [
		'wpcalypso/react',
	],
	parser: 'babel-eslint',
	env: {
		browser: true,
		mocha: true,
		node: true
	},
	globals: {
		FoxhoundData: true,
		FoxhoundMenu: true,
		FoxhoundSettings: true,
		jQuery: true,
		wp: true,
	},
	rules: {
		camelcase: 0, // REST API objects include underscores
		'max-len': [ 2, { code: 140 } ],
		'no-unused-expressions': 0, // Allows Chai `expect` expressions
		'react/no-danger': 0,
		'wpcalypso/import-no-redux-combine-reducers': 0,
		'wpcalypso/jsx-classname-namespace': 0,
		'wpcalypso/redux-no-bound-selectors': 1,
	}
};
