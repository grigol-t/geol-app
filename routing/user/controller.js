'use strict';

const User = require('../../models/User');
const bcrypt = require('bcryptjs')

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

module.exports.create = (req, res) => {
	try {
		new User(req.body).
		save()
		.then(x => res.send(x))
	} catch(e) {
		res.status(400).send(e)
	};
}

module.exports.logout = async (req, res) => {
	try{
		let user = await User.findById(req.params.id)
		user.tokens = [];
		user.save();
		res.send(user);
	} catch(e) {
		res.status(400).send(e);
	}
}

module.exports.update = async (req, res) =>
	await User.findById(req.params.id)
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

module.exports.login = async (req, res ) => {
		try{
			const user = await User.findOne({ userName:req.body.userName })
			const isMatch = await bcrypt.compare(req.body.password, user.password)
				if(!isMatch){
						throw new Error('Unable to login')
					}
			const token = await user.generateAuthToken()
			res.send({user, token})
			} catch(e) {
				res.status(400).send(e)
			}
}

module.exports.routeStart = async (req, res) => {
	try{
		const user = await  User.findById(req.params.id).lean();
		console.log(user)
		let route  = {
			routeStart: req.body.start,
			routeId: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
		}
		if(!user.routes) user.routes = [route]
		else user.routes.push(route)
		res.send(route)
	} catch(e) {
		res.status(400).send(e)
	}
}

module.exports.routeEnd = async (req, res) => {
	try {
		
	} catch(e) {
		res.status(400).send(e)
	}
}