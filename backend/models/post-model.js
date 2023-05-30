const {Schema, model} = require('mongoose')

const PostSchema = new Schema({
	date: {
		type: Schema.Types.Date,
		default: Date.now()
	},
	text: {type: String, required: true},
	authorId: {type: Schema.Types.ObjectId, ref: 'User'},
})

module.exports = model('Post', PostSchema)