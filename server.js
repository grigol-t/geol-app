const express = require('express');

const app = express();

const Vehicle = require('./models/Vehicle');

app.get('/', (req, res) => res.send('Hello World!'));

const MongoClient = require('mongodb').MongoClient;
const uri =
	'mongodb+srv://gugazhorzholiani1@gmail.com:199707az@cluster0-dv0de.mongodb.net/geol?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	// useFindAndModify: false,
});

client.connect(err => {
	console.log(err);
	console.log('connected');
	const collection = client.db('geol').collection('vehicle');
	console.log(collection);

	const vehicle = new Vehicle({
		detailsID: 5756,
		connectionID: 4353465,
		status: 1,
		comments: 'Some basic comment',
    });
    
    vehicle.save();
});

// .then((...args) => {
// 	console.log(args);
// 	console.log('connected');
// })
// .catch(err => {
// 	console.log(err);
// 	console.log('err');
// });

app.listen(process.env.PORT || 3000, () =>
	console.log(`Example app listening at http://localhost`)
);
