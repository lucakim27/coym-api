import { getReply, postReply, getReplyCount, editReply, deleteReply, getTotalReplyCount } from '../models/replyModel'
import { pool } from '../configs/db'
import express from 'express'
export const router = express.Router()
export default router

router.get('/getReply/:id', function (req: any, res: any) {
  getReply(pool, res, req)
})

router.post('/postReply/:id', function (req: any, res: any) {
  postReply(pool, res, req)
})

router.get('/getReplyCount', function (req: any, res: any) {
  getReplyCount(pool, res, req)
})

router.post('/deleteReply/:id', function (req: any, res: any) {
  deleteReply(pool, res, req)
})

router.post('/editReply/:id', function (req: any, res: any) {
  editReply(pool, res, req)
})

router.get('/getTotalReplyCount', function (req: any, res:any) {
  getTotalReplyCount(pool, res, req)
})