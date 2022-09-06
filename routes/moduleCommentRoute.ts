import { getModuleComment, postModuleComment, editModuleComment, deleteModuleComment } from '../models/moduleCommentModel'
import { pool } from '../configs/db'
import express from 'express'
export const router = express.Router()
export default router

router.get('/getModuleComment/:id', function (req: any, res: any) {
    getModuleComment(pool, res, req)
})

router.post('/postModuleComment/:id', function (req: any, res: any) {
    postModuleComment(pool, res, req)
})

router.post('/editModuleComment/:id', function (req: any, res: any) {
    editModuleComment(pool, res, req)
})

router.post('/deleteModuleComment/:id', function (req: any, res: any) {
    deleteModuleComment(pool, res, req)
})