const express = require('express')
const { getAllUsers, postUser, getAUser, updateAUser } = require('../controller/API_UserController')
const { getAllPosts, postPost, getAPost, updateAPost, getPostsByUser, deletePost } = require('../controller/API_PostController')
const { postComment, getAComment, deleteComment } = require('../controller/API_CommentController')
const { postAReply, deleteReply } = require('../controller/API_ReplyController')
const { register, login, checkEmailExist, logout, checkUsernameExist } = require('../controller/API_AuthController')
const { rateAPost, getAllRateOfUser } = require('../controller/API_RatingController')
const { createRoomChat, postMessage, getAllMsgOfRoom } = require('../controller/API_ChatController')
const routerApi = express.Router()

// user
routerApi.get('/users', getAllUsers)
routerApi.post('/user', postUser)
routerApi.get('/user/:id', getAUser)
routerApi.put('/user', updateAUser)

// post
routerApi.get('/posts', getAllPosts)
routerApi.get('/posts/:userId', getPostsByUser)
routerApi.get('/post/:id', getAPost)
routerApi.post('/post', postPost)
routerApi.put('/post/:id', updateAPost)
routerApi.delete('/post', deletePost)


//comment
routerApi.get('/comment/:id', getAComment)
routerApi.post('/comment', postComment)
routerApi.delete('/comment', deleteComment)


//reply
routerApi.post('/reply', postAReply)
routerApi.delete('/reply', deleteReply)


// Auth
routerApi.post('/register', register)
routerApi.post('/login', login)
routerApi.post('/email', checkEmailExist)
routerApi.post('/username', checkUsernameExist)
routerApi.post('/logout', logout)

// Rating
routerApi.post('/rate', rateAPost)
routerApi.post('/rates', getAllRateOfUser)

// Chat
routerApi.post('/room', createRoomChat)

// Message
routerApi.post('/message', postMessage)
routerApi.get('/message/:room', getAllMsgOfRoom)




module.exports = routerApi