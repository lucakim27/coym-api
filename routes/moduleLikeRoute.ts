import { getModuleLike, postModuleLike } from '../models/moduleLikeModel'
import { pool } from '../configs/db'
import express from 'express'
export const router = express.Router()
export default router

router.get('/getModuleLike/:id', function (req: any, res: any) {
    getModuleLike(pool, res, req)
})

router.post('/postModuleLike/:id', function (req: any, res: any) {
    postModuleLike(pool, res, req)
})