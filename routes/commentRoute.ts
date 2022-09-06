import {
  getPopularMajors,
  getRecentComments,
  getComment,
  postComment,
  getCommentCount,
  editComment,
  deleteComment,
  getTotalCommentCount
} from '../models/commentModel'
import express from 'express'
const router = express.Router()

router.get('/getComment/:id', (req: any, res: any) => {
  getComment(res, req)
})

router.post('/postComment/:id', (req: any, res: any) => {
  postComment(res, req)
})

router.get('/getCommentCount', (req: any, res: any) => {
  getCommentCount(res, req)
})

router.post('/editComment/:id', (req: any, res: any) => {
  editComment(res, req)
})

router.post('/deleteComment/:id', (req: any, res: any) => {
  deleteComment(res, req)
})

router.get('/getTotalCommentCount', (req: any, res: any) => {
  getTotalCommentCount(res, req)
})

router.get('/getRecentComments', (req: any, res: any) => {
  getRecentComments(res, req)
})

router.get('/getPopularMajors', (req: any, res: any) => {
  getPopularMajors(res, req)
})

export default router