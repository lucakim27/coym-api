import { postRequest } from '../models/requestModel'
import express from 'express'
const router = express.Router()

router.post('/postRequest', function (req, res) { postRequest(res, req) })

export default router