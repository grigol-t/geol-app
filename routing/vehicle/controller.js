'use strict';

const Vehicle = require('../../models/Vehicle');

module.exports.findById = (req, res) =>
	Vehicle.findById(req.params.id)
		.lean()
		.then(x => {
			res.send(x);
		});

module.exports.list = async (req, res) => {
	try {
		const vehicles  = await Vehicle.find({}).lean();
		const cars = vehicles.filter(x => x.type === "Car");
		const bicycle = vehicles.filter(x => x.type === "Bicycle");
		const electricScooter = vehicles.filter(x => x.type === "ElectricScooter");
		res.send({cars,bicycle,electricScooter});
	} catch(e) {
		res.status(400).send(e)
	}
	}

module.exports.create = (req, res) => new Vehicle(req.body).save().then(x => res.send(x));

module.exports.update = (req, res) =>
	Vehicle.findById(req.params.id)
		.then(x => Object.assign(x, req.body))
		.then(x => x.save())
		.then(x => res.send(x));

module.exports.delete = (req, res) =>
	Vehicle.remove({ _id: req.params.id }).then(() => res.send({ message: 'Removed' }));

module.exports.archive = (req, res) =>
	Vehicle.updateMany(
		{ _id: { $in: req.body.ids } },
		{ $set: { isDisabled: req.body.val } }
	).then(() => res.send({ message: 'OK' }));