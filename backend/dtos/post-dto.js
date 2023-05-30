module.exports = class PostDto {
	id
	date
	text
	authorId

	constructor(model) {
		this.id = model._id
		this.date = model.date
		this.text = model.text
		this.authorId = model.author
	}
}