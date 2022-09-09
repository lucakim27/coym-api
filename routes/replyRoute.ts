import {
  getReply,
  postReply,
  editReply,
  deleteReply,
  getTotalReplyCount
} from '../models/replyModel'
import express from 'express'
const router = express.Router()

router.get('/getReply/:id', (req: any, res: any) => {
  getReply(res, req)
})

router.post('/postReply/:id', (req: any, res: any) => {
  postReply(res, req)
})

router.post('/deleteReply/:id', (req: any, res: any) => {
  deleteReply(res, req)
})

router.post('/editReply/:id', (req: any, res: any) => {
  editReply(res, req)
})

router.get('/getTotalReplyCount', (req: any, res: any) => {
  getTotalReplyCount(res, req)
})

export default router