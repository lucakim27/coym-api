import { getReply, postReply, getReplyCount, editReply, deleteReply, getTotalReplyCount } from '../models/replyModel'
import express from 'express'
const router = express.Router()

router.get('/getReply/:id', function (req, res) { getReply(res, req) })
router.post('/postReply/:id', function (req, res) { postReply(res, req) })
router.get('/getReplyCount', function (req, res) { getReplyCount(res, req) })
router.post('/deleteReply/:id', function (req, res) { deleteReply(res, req) })
router.post('/editReply/:id', function (req, res) { editReply(res, req) })
router.get('/getTotalReplyCount', function (req, res) { getTotalReplyCount(res, req) })

export default router