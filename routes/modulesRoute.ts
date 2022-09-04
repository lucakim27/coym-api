import { getModuleList } from '../models/modulesModel'
import { pool } from '../configs/db'
import express from 'express'
export const router = express.Router()
export default router

router.get('/getModuleList', function (req: any, res: any) {
    getModuleList(pool, res, req)
})