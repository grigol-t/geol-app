const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const user = new mongoose.Schema({
	id: Number,
	firstName: String,
	lastName: String,
	userName: {
		type:String,
		unique: true
	},
	email: String,
	password: String,
	tokens: [{
        token: {
            type: String,
            required: true
    }
	}],
	routes: [{
		routeStart: Date,
		routeEnd: Date,
		// _id: 
	}],
	cards: [{ number: Number, expiration: String, ccv: Number }],
});

user.methods.generateAuthToken = async function (){
	const user = this
	const token = jwt.sign({_id: user._id.toString() },"master",{ expiresIn:
		'7 days' })
	user.tokens = user.tokens.concat({ token })
	await user.save()

	return token
}
user.pre('save', async function (next){
	 const user = this
	  if(user.isModified('password')){
		user.password = await bcrypt.hash(user.password, 8) } 
	 next() }
	)

module.exports = mongoose.model('User', user);
