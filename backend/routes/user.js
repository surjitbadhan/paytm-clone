const express = require('express')
const {User} = require('../db')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config')
const router = express.Router()
const {z} = require('zod')
const { JWT_SECRET } = require('../config')
const {authMiddleware} = require('../middleware')

const signupSchema = z.object({
    username: zod.string().email(),
	firstName: zod.string(),
	lastName: zod.string(),
	password: zod.string()
  
  });

router.post("/signup", async (req, res) => {
    const {success} = signupSchema.safeParse(req.body)
    if(!success){
        res.status(411).json({message:"Incorrect inputs"})
    }
    const existingUser = await User.findOne({
        username : req.body.username
    })
    if(existingUser){
        res.status(411).json({
            message:"username already exists"
        })
    }
    const user = await User.create({
        username : req.body.username,
        password : req.body.password,
        firstname : req.body.firstname,
        lastname : req.body.lastName
    })
    const userId = user._id;

    const token = jwt.sign({userId},JWT_SECRET) 
    res.json({
        message:"User created successfully",
        token : token
    })
});

const signinSchema = z.object({
    username : z.string().email(),
    password : z.string()
})
router.post('/signin',authMiddleware,async (req,res)=>{
    const { success } = signinSchema.safeParse(req.body);
    if (!success) {
      res.status(411).json({
        message: "Invalid inputs",
      });
    }
    const user = await User.findOne({
        username : req.body.username,
        password : req.body.password
    })
    if(user){
        const token = jwt.sign({
            userId : user._id,
        },JWT_SECRET)
    res.json({token:token})
    return;
    }
    res.status(411).json({
        message:"Error while logging In"
    })

})

module.exports = router;