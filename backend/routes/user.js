const express = require('express');
const router = express.Router();
const z  = require('zod');
let User = require('../db').User;
let Accounts = require('../db').Accounts;
const jwt = require('jsonwebtoken');
const privateKey = require('../config').JWT_SECRET;
let {authMiddleware} =require('../middleware');

const signupSchema = z.object({
    username : z.string().email().trim(),
    firstName : z.coerce.string(),
    lastName : z.coerce.string().optional(),
    password : z.coerce.string().min(7)
});

const signinSchema = z.object({
    username : z.string().email().trim(),
    password : z.coerce.string()
})

const updateSchema = z.object({
    firstName : z.string().optional(),
    lastName : z.string().optional(),
    password : z.string().optional()
})

router.post('/signup',async (req,res)=>{
    let input = req.body;
    let k = signupSchema.safeParse(input);
    try {
        if(k.success){
            let user = await User.create({
                username : k.data.username,
                firstName : k.data.firstName,
                lastName : k.data.lastName,
                password : k.data.password
            })
            await Accounts.create({
                userId : user._id,
                balance : 1 + (Math.random()*10000)
            })
            let token = jwt.sign({
                userId : k.data.username
            } , privateKey);
            return res.status(200).json({
                message : "User created successfully",
                token : token,
                error : false
            })
        }else{
            return res.status(411).json({
                message : "Email already taken / Incorrect inputs",
                error : true
            })
        }
    } catch (error) {
        return res.status(400).json({});
    }
    
});

router.post('/signin',async (req,res)=>{
    let input = req.body;
    let k = signinSchema.safeParse(input);
    if(k.success){
        let newSignin = await User.findOne({
            username : k.data.username,
            password : k.data.password
        });
        
        if(newSignin){
            let token = jwt.sign({
                userId : newSignin._id
            } , privateKey);
            return res.status(200).json({
                token : token,
                error : false
            });
        }
    }
    return res.status(411).json({
        message : "Error whilr logging in",
        error : true
    })
})

router.put('/user',authMiddleware,async (req,res)=>{
    try {
        if(!req.body){
            return res.status(400).json({
                error : true
            });
        }
        let verify = updateSchema.safeParse(req.body);
        if(verify.success){
            if(verify.data.password && (verify.data.password.length<6)){
                return res.status(400).json({});
            }
            let check = await User.findByIdAndUpdate(req.userId,{
                password : req.body.password,
                firstName : req.body.firstName,
                lastName : req.body.lastName
            })
            if(check){
                return res.status(200).json({
                    message : "Updated Successfully",
                    error : false
                })
            }
        }
        return res.status(411).json({
            message : "Error while updating information",
            error : true
        })
    } catch (error) {
        return res.status(500).json({
            error : true
        });
    }
})

router.get('/bulk',authMiddleware,async (req,res)=>{
    try {
       let filter = req.query.filter || "";
       
       let users = await User.find({
        "$or" : [
            { firstName: { "$regex": filter, "$options" : "i"} },
            { lastName: { "$regex": filter, "$options" : "i"} }
        ]
        });
       let filtered = users.map(user=>{
        return {
            username: user.username,
            firstName : user.firstName,
            lastName : user.lastName,
            _id : user._id
        }
       })
       return res.status(200).json({
        users : filtered,
        error : false
       }) 
    } catch (error) {
        return res.status(400).json({
            message: "Something went wrong",
            error : true
        })
    }
})

router.get('/info',authMiddleware,async (req,res)=>{
    try {
        let user = await User.findById(req.userId);
        return res.status(200).json({
            user : user
        });
    } catch (error) {
        return res.json({
            error : "Sorry something went wrong"
        })
    }
})
module.exports = router;