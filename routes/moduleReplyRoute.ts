import {
    getModuleReply,
    postModuleReply,
    editModuleReply,
    deleteModuleReply,
    getTotalModuleReplyCount
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

router.get('/getTotalModuleReplyCount', (req: any, res: any) => {
    getTotalModuleReplyCount(res, req)
})

export default router