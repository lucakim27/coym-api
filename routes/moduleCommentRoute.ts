import {
    getModuleComment,
    postModuleComment,
    editModuleComment,
    deleteModuleComment
} from '../models/moduleCommentModel'
import express from 'express'
const router = express.Router()

router.get('/getModuleComment/:id', (req: any, res: any) => {
    getModuleComment(res, req)
})

router.post('/postModuleComment/:id', (req: any, res: any) => {
    postModuleComment(res, req)
})

router.post('/editModuleComment/:id', (req: any, res: any) => {
    editModuleComment(res, req)
})

router.post('/deleteModuleComment/:id', (req: any, res: any) => {
    deleteModuleComment(res, req)
})

export default router