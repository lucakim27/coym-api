import {
    getModuleList,
    getModuleName
} from '../models/modulesModel'
import express from 'express'
const router = express.Router()

router.get('/getModuleList', (req: any, res: any) => {
    getModuleList(res, req)
})

router.get('/getModuleName/:id', (req: any, res: any) => {
    getModuleName(res, req)
})

export default router