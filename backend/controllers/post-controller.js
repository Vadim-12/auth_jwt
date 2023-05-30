const postService = require('../services/post-service')

class PostController {
	async getPosts(req, res, next) {
		try {
			const posts = await postService.getAllPosts()
			return res.json(posts)
		} catch (e) {
			next(e)
		}
	}

	async createPost(req, res, next) {
		try {
			const {text, authorId} = req.body
			console.log(text, authorId)
			const post = await postService.createPost(text, authorId)
			return res.json(post)
		} catch (e) {
			next(e)
		}
	}

	async deletePost(req, res, next) {
		try {
			const {id} = req.params
			const post = await postService.deletePost(id)
			return res.json(post)
		} catch (e) {
			next(e)
		}
	}

	async updatePost(req, res, next) {
		try {
			const {id} = req.params
			const {text} = req.body
			const post = await postService.updatePost(id, text)
			return res.json(post)
		} catch (e) {
			next(e)
		}
	}
}

module.exports = new PostController()