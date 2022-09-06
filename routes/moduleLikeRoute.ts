import {
    getModuleLike,
    postModuleLike
} from '../models/moduleLikeModel'
import express from 'express'
const router = express.Router()

router.get('/getModuleLike/:id', (req: any, res: any) => {
    getModuleLike(res, req)
})

router.post('/postModuleLike/:id', (req: any, res: any) => {
    postModuleLike(res, req)
})

export default router