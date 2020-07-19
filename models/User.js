const mongoose = require('mongoose');

const user = new mongoose.Schema({
	id: Number,
	firstName: String,
	lastName: String,
	email: String,
	password: String,
	tokens: [{ token: String }],
	cards: [{ number: Number, expiration: String, ccv: Number }],
});

module.exports = mongoose.model('User', user);
