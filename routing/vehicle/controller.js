'use strict';

const Vehicle = require('../../models/Vehicle');

module.exports.findById = (req, res) =>
	Vehicle.findById(req.params.id)
		.lean()
		.then(x => {
			res.send(x);
		});

module.exports.list = (req, res) =>
	Vehicle.find({})
		.lean()
		.then(x => res.send(x));

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
