const {Schema, model} = require('mongoose')

const PostSchema = new Schema({
	date: {
		type: Date,
		default: Date.now()
	},
	text: {type: String, required: true},
	author: {type: Schema.Types.ObjectId, ref: 'User'},
})

module.exports = model('Post', PostSchema)