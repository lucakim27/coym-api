import { getMajorList, getMajorName } from '../models/majorModel'
import express from 'express'
const router = express.Router()

router.get('/getMajorList', function (req, res) { getMajorList(res, req) })
router.get('/getMajorName/:id', function (req, res) { getMajorName(res, req) })

export default router