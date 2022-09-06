import {
    getModuleReply,
    postModuleReply,
    editModuleReply,
    deleteModuleReply
} from '../models/moduleReplyModel'
import express from 'express'
const router = express.Router()

router.get('/getModuleReply/:id', (req: any, res: any) => {
    getModuleReply(res, req)
})

router.post('/postModuleReply/:id', (req: any, res: any) => {
    postModuleReply(res, req)
})

router.post('/deleteModuleReply/:id', (req: any, res: any) => {
    deleteModuleReply(res, req)
})

router.post('/editModuleReply/:id', (req: any, res: any) => {
    editModuleReply(res, req)
})

export default router