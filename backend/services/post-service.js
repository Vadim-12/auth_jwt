const ApiError = require('../exceptions/api-error')
const PostModel = require('../models/post-model')
const UserModel = require('../models/user-model')

class PostService {
	async getAllPosts() {
		const posts = await PostModel.find()
		return posts
	}

	async addNewPost(date, text, authorEmail) {
		const user = await UserModel.findOne({email: authorEmail})
		if (!user) {
			throw ApiError.BadRequest(`Пользователя с почтовым адресом ${authorEmail} не существует`)
		}
		const post = await PostModel.create({date, text, author: user._id})
		return post
	}

	async deletePost(postId) {
		const post = await PostModel.deleteOne({_id: postId})
		return post
	}

	async updatePost(postId, text) {
		const post = await PostModel.findById(postId)
		if (!post) {
			throw ApiError.BadRequest('Такого поста не существует')
		}
		console.log(postId, text)
		post.text = text
		post.save()
		return post
	}
}

module.exports = new PostService()