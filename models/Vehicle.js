const mongoose = require('mongoose');

const vehicle = new mongoose.Schema({
	location: String,
	price: Number,
	type: String,
	color: String,
	model: String,
	licenseNumber: String,
	imageUrl: Array,
});

module.exports = mongoose.model("Vehicle", vehicle);
