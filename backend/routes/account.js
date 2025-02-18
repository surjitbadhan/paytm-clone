import { Account } from '../db'
import { authMiddleware } from '../middleware'

const express = require('express')

export const router = express.Router()

router.get('balance',authMiddleware,async (req,res)=>{
const account = await Account.findOne({
    userId : req.userId
})
res.json({
    balance : account.balance
})

})