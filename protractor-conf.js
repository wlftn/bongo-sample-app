require('coffee-script/register');

// conf.js
exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['**/*.e2e.js', '**/*.e2e.coffee']
};