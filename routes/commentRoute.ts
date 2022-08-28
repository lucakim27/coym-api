import { getComment, postComment, getCommentCount, editComment, deleteComment, getTotalCommentCount } from '../models/commentModel'
import { pool } from '../configs/db'
import express from 'express'
export const router = express.Router()
export default router

router.get('/getComment/:id', function (req: any, res: any) {
  getComment(pool, res, req)
})

router.post('/postComment/:id', function (req: any, res: any) {
  postComment(pool, res, req)
})

router.get('/getCommentCount', function (req: any, res: any) {
  getCommentCount(pool, res, req)
})

router.post('/editComment/:id', function (req: any, res: any) {
  editComment(pool, res, req)
})

router.post('/deleteComment/:id', function (req: any, res: any) {
  deleteComment(pool, res, req)
})

router.get('/getTotalCommentCount', function (req: any, res:any) {
  getTotalCommentCount(pool, res, req)
})