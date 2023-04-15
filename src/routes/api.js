const express = require('express')
const { getAllUsers, postUser, getAUser, updateAUser } = require('../controller/API_UserController')
const { getAllPosts, postPost, getAPost, updateAPost } = require('../controller/API_PostController')
const { postComment, getAComment } = require('../controller/API_CommentController')
const { postAReply } = require('../controller/API_ReplyController')
const routerApi = express.Router()

// user
routerApi.get('/user', getAllUsers)
routerApi.post('/user', postUser)
routerApi.get('/user/:id', getAUser)
routerApi.put('/user/:id', updateAUser)

// post
routerApi.get('/post', getAllPosts)
routerApi.post('/post', postPost)
routerApi.get('/post/:id', getAPost)
routerApi.put('/post/:id', updateAPost)

//comment
routerApi.get('/comment/:id', getAComment)
routerApi.post('/comment', postComment)

//reply
routerApi.post('/reply', postAReply)

module.exports = routerApi