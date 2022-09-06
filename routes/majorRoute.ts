import {
  getMajorList,
  getMajorName
} from '../models/majorModel'
import express from 'express'
const router = express.Router()

router.get('/getMajorList', (req: any, res: any) => {
  getMajorList(res, req)
})

router.get('/getMajorName/:id', (req: any, res: any) => {
  getMajorName(res, req)
})

export default router