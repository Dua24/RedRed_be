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
const helmet = require('helmet');

// config req.body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// config req.files
app.use(fileUpload());

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: 'https://red-red-fe.vercel.app/',
        methods: ['GET', 'POST'],
        allowedHeaders: ['secretHeader'],
        credentials: true
    }
})
// app.use(cors({
//     origin: 'https://red-red-pe2sfh0la-nguynnguynduy-gmailcom.vercel.app', // Allow requests from this origin
//     methods: ['GET', 'POST'], // Allow these HTTP methods
//     allowedHeaders: ['secretHeader'], // Allow these request headers
//     credentials: true // Allow cookies to be sent cross-origin
// }));


app.options('*', cors({
    allowedHeaders: ['Content-Type'],
    methods: ['POST', 'PUT', 'GET', 'DELETE', 'OPTIONS'],
    origin: 'https://red-red-fe.vercel.app/',
    credentials: true // Allow cookies to be sent cross-origin
}));

app.use(cors());


io.on("connection", (socket) => {
    socket.on('room', (data) => {
        socket.join(data)
    })
    socket.on('chat', (data) => {
        console.log(data)
        socket.to(data.room).emit("user_chat", data)
    })
})
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'none'"],
        fontSrc: ["https://redred-be.onrender.com"]
    }
}));
// config engine
configViewEngine(app)

app.use('/v1/api/', routerApi);
app.use('/', (req, res) => {
    res.send("Hi, welcome to redred")
});

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

