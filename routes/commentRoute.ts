import { getComment, postComment, getCommentCount, editComment, deleteComment, getTotalCommentCount } from '../models/commentModel'
import express from 'express'
const router = express.Router()

router.get('/getComment/:id', function (req, res) { getComment(res, req) })
router.post('/postComment/:id', function (req, res) { postComment(res, req) })
router.get('/getCommentCount', function (req, res) { getCommentCount(res, req) })
router.post('/editComment/:id', function (req, res) { editComment(res, req) })
router.post('/deleteComment/:id', function (req, res) { deleteComment(res, req) })
router.get('/getTotalCommentCount', function (req, res) { getTotalCommentCount(res, req) })

export default router