exports.config = {
	seleniumAddress: 'http://localhost:4444/wd/hub' ,
	capabilities: { 'browserName': 'chrome'},
	specs: [
		'homepage/homepage.spec.js'
	]
};