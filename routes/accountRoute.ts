import { getUserID, getUserDetailsByID, getTotalAccountCount, authSignUp, authSignIn, cookieValidation, getUserDetails, updateUserDetails, getAllUsers, getUserCommentDetails, getUserReplyDetails, getUserLikeDetails } from '../models/accountModel'
import express from 'express'
const router = express.Router()

router.post('/signUp', function (req, res) { authSignUp(res, req) })
router.get('/signIn', function (req, res) { authSignIn(res, req) })
router.get('/cookieValidation', function (req, res) { cookieValidation(res, req) })
router.get('/getUserDetails', function (req, res) { getUserDetails(res, req) })
router.post('/updateUserDetails', function (req, res) { updateUserDetails(res, req) })
router.get('/getAllUsers', function (req, res) { getAllUsers(res, req) })
router.get('/getUserCommentDetails/:id', function (req, res) { getUserCommentDetails(res, req) })
router.get('/getUserReplyDetails/:id', function (req, res) { getUserReplyDetails(res, req) })
router.get('/getUserLikeDetails/:id', function (req, res) { getUserLikeDetails(res, req) })
router.get('/getTotalAccountCount', function (req, res) { getTotalAccountCount(res, req) })
router.get('/getUserDetailsByID/:id', function (req, res) { getUserDetailsByID(res, req) })
router.get('/getUserID', function (req, res) { getUserID(res, req) })

export default router