module.exports = class PostDto {
	id
	date
	text
	author

	constructor(model) {
		this.id = model._id
		this.date = model.date
		this.text = model.text
		this.author = model.author
	}
}