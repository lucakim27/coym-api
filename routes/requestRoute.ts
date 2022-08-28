import { postRequest } from '../models/requestModel'
import { pool } from '../configs/db'
import express from 'express'
export const router = express.Router()
export default router

router.post('/postRequest', function (req: any, res: any) {
  postRequest(pool, res, req)
})