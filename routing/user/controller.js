'use strict';

const User = require('../../models/User');

module.exports.findById = (req, res) =>
	User.findById(req.params.id)
		.lean()
		.then(x => {
			res.send(x);
		});

module.exports.list = (req, res) =>
	User.find({})
		.lean()
		.then(x => res.send(x));

module.exports.create = (req, res) => new User(req.body).save().then(x => res.send(x));

module.exports.update = (req, res) =>
	User.findById(req.params.id)
		.then(x => Object.assign(x, req.body))
		.then(x => x.save())
		.then(x => res.send(x));

module.exports.delete = (req, res) =>
	User.remove({ _id: req.params.id }).then(() => res.send({ message: 'Removed' }));

module.exports.archive = (req, res) =>
	User.updateMany(
		{ _id: { $in: req.body.ids } },
		{ $set: { isDisabled: req.body.val } }
	).then(() => res.send({ message: 'OK' }));
