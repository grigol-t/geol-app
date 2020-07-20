const mongoose = require('mongoose');

const vehicle = new mongoose.Schema({
	location: String,
	price: Number,
	type: String,
	color: String,
	model: String,
	licenseNumber: String,
	// imageUrl: String,
});

module.exports = mongoose.model("Vehicle", vehicle);
