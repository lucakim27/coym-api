import {
    getTest
} from '../utils/test'
import express from 'express'
const router = express.Router()

router.get('/getTest', (req: any, res: any) => {
    getTest(res, req)
})

export default router