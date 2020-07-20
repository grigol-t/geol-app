const mongoose = require('mongoose');

const vehicle = new mongoose.Schema({
    vehicle:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Vehicle"
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    routeStart: Date,
    routeEnd: Date,
    cost: Number
	// imageUrl: String,
});

module.exports = mongoose.model("Route", vehicle);
