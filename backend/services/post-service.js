const ApiError = require('../exceptions/api-error')
const PostModel = require('../models/post-model')

class PostService {
	async getAllPosts() {
		const posts = await PostModel.find()
		return posts
	}

	async createPost(text, authorId) {
		const post = await PostModel.create({text, authorId})
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
		post.text = text
		post.save()
		return post
	}
}

module.exports = new PostService()