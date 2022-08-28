import { getLike, postLike, getLikeCount, getTotalLikeCount } from '../models/likeModel'
import express from 'express'
const router = express.Router()

router.get('/getLike/:id', function (req, res) { getLike(res, req) })
router.post('/postLike/:id', function (req, res) { postLike(res, req) })
router.get('/getLikeCount', function (req, res) { getLikeCount(res, req) })
router.get('/getTotalLikeCount', function (req, res) { getTotalLikeCount(res, req) })

export default router