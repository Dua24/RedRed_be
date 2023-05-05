require('dotenv').config()
const express = require('express')
const path = require('path')
const configViewEngine = require('./config/viewEngine')
const connection = require('./config/db')
const routerApi = require('./routes/api')
const fileUpload = require('express-fileupload');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io')
const app = express()
const port = process.env.PORT || 8888
const hostname = process.env.HOST_NAME


// config req.body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// config req.files
app.use(fileUpload());
app.use(cors());

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "https://redred-lilac.vercel.app/",
        // origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ["secretHeader"],
        credentials: true
    }
})

// const corsOptions = {
//     origin: 'http://localhost:3000',
//     credentials: true,            //access-control-allow-credentials:true
//     optionSuccessStatus: 200
// }


io.on("connection", (socket) => {
    socket.on('room', (data) => {
        socket.join(data)
    })
    socket.on('chat', (data) => {
        console.log(data)
        socket.to(data.room).emit("user_chat", data)
    })
})

// config engine
configViewEngine(app)

app.use('/v1/api/', routerApi);

; (async () => {
    // connect database
    try {
        await connection()
        server.listen(port, hostname, () => {
            console.log(`App listening on port ${port}`)
        })
    } catch (error) {
        console.log("ERROR connect to DB:>> ", error)
    }
})()

