import http from 'http'
import cors from "cors"
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import accountRouter from './routes/accountRoute'
import commentRouter from './routes/commentRoute'
import likeRouter from './routes/likeRoute'
import majorRouter from './routes/majorRoute'
import replyRouter from './routes/replyRoute'
import requestRouter from './routes/requestRoute'
import modulesRouter from './routes/modulesRoute'
import moduleCommentRouter from './routes/moduleCommentRoute'
import moduleLikeRouter from './routes/moduleLikeRoute'
import moduleReplyRouter from './routes/moduleReplyRoute'
import testRouter from './routes/testRoute'
import { corsOptions } from './configs/cors'

const app = express()
const httpServer = http.createServer(app)
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(accountRouter)
app.use(commentRouter)
app.use(likeRouter)
app.use(majorRouter)
app.use(replyRouter)
app.use(requestRouter)
app.use(modulesRouter)
app.use(testRouter)
app.use(moduleCommentRouter)
app.use(moduleLikeRouter)
app.use(moduleReplyRouter)

httpServer.listen(PORT, () => console.log(`Http Server running on port ${PORT}.`))