import { getLike, postLike, getLikeCount, getTotalLikeCount } from '../models/likeModel'
import { pool } from '../configs/db'
import express from 'express'
export const router = express.Router()
export default router

router.get('/getLike/:id', function (req: any, res: any) {
  getLike(pool, res, req)
})

router.post('/postLike/:id', function (req: any, res: any) {
  postLike(pool, res, req)
})

router.get('/getLikeCount', function (req: any, res: any) {
  getLikeCount(pool, res, req)
})

router.get('/getTotalLikeCount', function (req: any, res:any) {
  getTotalLikeCount(pool, res, req)
})