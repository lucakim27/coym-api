import {
  getLike,
  postLike,
  getTotalLikeCount
} from '../models/likeModel'
import express from 'express'
const router = express.Router()

router.get('/getLike/:id', (req: any, res: any) => {
  getLike(res, req)
})

router.post('/postLike/:id', (req: any, res: any) => {
  postLike(res, req)
})

router.get('/getTotalLikeCount', (req: any, res: any) => {
  getTotalLikeCount(res, req)
})

export default router