import http from 'http'
import cors from "cors"
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import accountRouter from './routes/accountRoute'
import commentRouter from './routes/commentRoute'
// import countRouter from './routes/countRoute'
import likeRouter from './routes/likeRoute'
import majorRouter from './routes/majorRoute'
import replyRouter from './routes/replyRoute'
import requestRouter from './routes/requestRoute'
import { corsOptions } from './configs/cors'
import { createTables } from './utils/table'
// import { connection } from './configs/db'
// import { addChatUserAndChat, sendChatUser, sendChat } from './models/chatModel'
// import { addOnlineUser, sendOnlineUsers, removeOnlineUser } from './models/onlineModel'

const app = express()
const httpServer = http.createServer(app)
const PORT = process.env.PORT || 3000
// const socketIoServer = app.listen(3001, function () {
//   console.log('Socket.io Server running on port 3001')
// })
// const io = require('socket.io')(socketIoServer)

createTables()

// io.on('connection', function (socket: any) {

//   socket.on('join', (username: any) => {
//     addOnlineUser(connection, username, socket.id)
//     sendOnlineUsers(connection, io)
//   })

//   socket.on('disconnect', function () {
//     removeOnlineUser(connection, socket.id)
//     sendOnlineUsers(connection, io)
//   })

//   socket.on('chatPageJoin', function (username: any) {
//     sendChatUser(connection, username, io, socket)
//   })
  
//   socket.on('chatUserSelected', function (username: any, counterpart: any) {
//     sendChatUser(connection, username, io, socket)
//     sendChat(connection, username, counterpart, io, socket)
//   })

//   socket.on('sendMessage', function (username: any, counterpart: any, text: any) {
//     addChatUserAndChat(connection, username, counterpart, text)
//   })
  
// })

app.use(express.json())
app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({
   extended: false 
}))
app.use(cookieParser())
app.use(accountRouter)
app.use(commentRouter)
// app.use(countRouter)
app.use(likeRouter)
app.use(majorRouter)
app.use(replyRouter)
app.use(requestRouter)

httpServer.listen(PORT, () => console.log(`Http Server running on port ${PORT}.`))