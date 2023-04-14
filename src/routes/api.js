const express = require('express')
const { getAllUsers, postUser, getAUser, updateAUser } = require('../controller/API_UserController')
const { getAllPosts, postPost, getAPost, updateAPost } = require('../controller/API_PostController')
const routerApi = express.Router()

routerApi.get('/user', getAllUsers)
routerApi.post('/user', postUser)
routerApi.get('/user/:id', getAUser)
routerApi.put('/user/:id', updateAUser)

routerApi.get('/post', getAllPosts)
routerApi.post('/post', postPost)
routerApi.get('/post/:id', getAPost)
routerApi.put('/post/:id', updateAPost)


module.exports = routerApi