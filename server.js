const express = require('express');
const app = express();
const Vehicle = require('./models/Vehicle');

app.get('/', (req, res) => res.send('Hello World!'));

const mongoose = require('mongoose');
mongoose.connect(
	'mongodb+srv://geol:geol123@cluster0-dv0de.mongodb.net/geol?retryWrites=true&w=majority',
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	}
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
	console.log('connected');

	// const vehicle = new Vehicle({
	// 	detailsID: 5756,
	// 	connectionID: 4353465,
	// 	status: 1,
	// 	comments: 'Some basic comment',
	// });

	// vehicle.save();
});

app.listen(process.env.PORT || 3000, () =>
	console.log(`Example app listening at http://localhost`)
);
