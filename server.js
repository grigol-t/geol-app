const express = require('express');
const app = express();
const Vehicle = require('./models/Vehicle');
const vehicleRouting = require('./routing/vehicle')
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

app.use(express.json())
app.use(vehicleRouting)

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
	console.log('connected');
	
});

app.listen(process.env.PORT || 3000, () =>
	console.log(`Example app listening at http://localhost`)
);
