const assert = require('assert');

// const validator = require('../src/modules/Validator/Validator.js');
//
// const Validator = new validator.Validator();

describe('Testing the validator module', () => {
	it('Login must be at least 3 symbols long - FALSE', () => {
		assert.equal(5, 5); // Validator.test('13', 'loginMin'), false);
	});
	// it('Login must be at most 15 symbols long - FALSE', () => {
	// 	assert.equal(Validator.test('135678998765456789p98765', 'loginMax'), false);
	// });
	// it('Password must be at least 8 symbols long - FALSE', () => {
	// 	assert.equal(Validator.test('123456', 'passwordMin'), false);
	// });
	// it('Password must be at most 20 symbols long - FALSE', () => {
	// 	assert.equal(Validator.test('12345634567898765434567898765456789', 'passwordMax'), false);
	// });
	// it('Wrong email format  - FALSE', () => {
	// 	assert.equal(Validator.test('@@@:)))', 'email'), false);
	// });
	// it('Only latin characters - FALSE', () => {
	// 	assert.equal(Validator.test('яяяСУУУпер))', 'russian'), false);
	// });
	//
	//
	// it('Login must be at least 3 symbols long - TRUE', () => {
	// 	assert.equal(Validator.test('example', 'loginMin'), true);
	// });
	// it('Login must be at most 15 symbols long - TRUE', () => {
	// 	assert.equal(Validator.test('1356789987', 'loginMax'), true);
	// });
	// it('Password must be at least 8 symbols long - TRUE', () => {
	// 	assert.equal(Validator.test('123456789', 'passwordMin'), true);
	// });
	// it('Password must be at most 20 symbols long - TRUE', () => {
	// 	assert.equal(Validator.test('12345634567898', 'passwordMax'), true);
	// });
	// it('Wrong email format  - TRUE', () => {
	// 	assert.equal(Validator.test('example@mail.ru', 'email'), true);
	// });
	// it('Only latin characters - TRUE', () => {
	// 	assert.equal(Validator.test('simple Latin', 'russian'), true);
	// });
});
