'use strict';

const Route = require('../../models/route');

module.exports.findById = async (req, res) =>{
    try{
        console.log(new Date())

        await Route.findById(req.params.id)
            .lean()
            .then(x => {
                res.send(x);
            });
        } catch(e) {
            res.status(400).send(e);
        }
    }

module.exports.list = async (req, res) =>
	await Route.find({})
		.lean()
		.then(x => res.send(x));

module.exports.userRoutes = async (req,res ) => {
    try {
    const routes = await Route.find({user : req.params.id}).lean();
    res.send(routes)
    } catch(e) {
        res.status(400).send(e)
    }
}
module.exports.create = (req, res) => new Route(req.body).save().then(x => res.send(x));

module.exports.update = async (req, res) =>
	await Route.findById(req.params.id)
		.then(x => Object.assign(x, req.body))
		.then(x => x.save())
		.then(x => res.send(x));

module.exports.delete = (req, res) =>
	Route.remove({ _id: req.params.id }).then(() => res.send({ message: 'Removed' }));

module.exports.archive = (req, res) =>
	Route.updateMany(
		{ _id: { $in: req.body.ids } },
		{ $set: { isDisabled: req.body.val } }
    ).then(() => res.send({ message: 'OK' }));
    
module.exports.endRoute = async (req, res) => {
    try {  
        let price = 0;
        let route = await Route.findById(req.params.id).populate("vehicle").populate("user");
        route.routeEnd = (req.body.routeEnd);
        route.cost = calculatePrice(route)
        route.save();
        res.send(route)
    } catch(e) {
        res.status(400).send(e);
    }
}

function calculatePrice(route)  {
    let price = 0;
    const timeSpend = (route.routeEnd - route.routeStart)/60/60/1000;
    price = timeSpend * route.vehicle.price;
    return price; 
}