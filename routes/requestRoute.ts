import {
  postRequest
} from '../models/requestModel'
import express from 'express'
const router = express.Router()

router.post('/postRequest', (req: any, res: any) => {
  postRequest(res, req)
})

export default router