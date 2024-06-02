const express = require('express');
const router = express.Router();
let Account = require('../db').Accounts;
const {authMiddleware} = require('../middleware');
const { default: mongoose } = require('mongoose');
let User = require('../db').User;

router.get('/balance',authMiddleware,async (req,res)=>{
    try {
        let account = await Account.findOne({
            userId : req.userId
        });
        if(!account){
            return res.status(411).json({
                message : "Something went wrong",
                error : true
            });
        }
        return res.status(200).json({
            balance : account.balance,
            error : false
        })
    } catch (error) {
        return res.status(411).json({
            message : "Something went wrong",
            error : true
        })
    }
});


router.post('/transfer',authMiddleware,async (req,res)=>{
    try {
        let {to,amount} = req.body;
        let other = await User.findById(to);
        let selfAccount = await Account.findOne({
            userId : req.userId
        });
        let sb = selfAccount.balance;
        if(!other || !selfAccount){
            return res.status(411).json({
                error : true
            })
        }
        if(sb<amount){
            return res.status(400).json({
                
                message : "Insufficient Balance",
                error : true
            })
        }
        await Account.findByIdAndUpdate(selfAccount._id,{
            $inc :{
                balance : -amount
            }
        });
        await Account.findOneAndUpdate({
            userId : to
        },{
            $inc : {
                balance : amount
            }
        });
        return res.json({
            message : "Transfer Successful",
            error : false
        })
    } catch (error) {
        console.log(error);
        return res.json({
            error : true,
            message : "Something went wrong"
        })
    }
})

module.exports = router;