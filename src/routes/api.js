const express = require('express')
const routerApi = express.Router()
const { getAllUsers, postUser, putUser } = require('../controller/ApiController')

routerApi.get('/user', getAllUsers)
routerApi.post('/user', postUser)
routerApi.put('/user', putUser)

module.exports = routerApi