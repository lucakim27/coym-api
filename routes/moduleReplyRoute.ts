import { getModuleReply, postModuleReply, editModuleReply, deleteModuleReply } from '../models/moduleReplyModel'
import { pool } from '../configs/db'
import express from 'express'
export const router = express.Router()
export default router

router.get('/getModuleReply/:id', function (req: any, res: any) {
    getModuleReply(pool, res, req)
})

router.post('/postModuleReply/:id', function (req: any, res: any) {
    postModuleReply(pool, res, req)
})

router.post('/deleteModuleReply/:id', function (req: any, res: any) {
    deleteModuleReply(pool, res, req)
})

router.post('/editModuleReply/:id', function (req: any, res: any) {
    editModuleReply(pool, res, req)
})