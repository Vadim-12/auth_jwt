const Router = require('express').Router
const userController = require('../controllers/user-controller')
const postController = require('../controllers/post-controller')
const router = new Router()
const {body} = require('express-validator')
const authMiddleware = require('../middlewares/auth-middleware')

router.post('/registration', 
	body('email').isEmail(),
	body('password').isLength({min: 4, max: 30}),
	userController.registration
)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/activate/:link', userController.activate)
router.get('/refresh/', userController.refresh)
router.get('/users', authMiddleware, userController.getUsers)

router.get('/posts', authMiddleware, postController.getPosts) // получение всех постов
router.post('/posts', authMiddleware, postController.createPost) // создание поста
router.delete('/posts/:id', authMiddleware, postController.deletePost) // удаление поста
router.put('/posts/:id', authMiddleware, postController.updatePost) // редактирование поста

module.exports = router