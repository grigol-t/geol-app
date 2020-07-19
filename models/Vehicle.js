const mongoose = require('mongoose');

const schema = new mongoose.Schema({
	report: mongoose.Schema.Types.ObjectId,
	detailsID: Number,
	connectionID: Number,
	status: Number,
	comments: String,
});

module.exports = mongoose.model('Vehicle', schema);
