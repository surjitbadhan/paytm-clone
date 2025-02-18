const express = require('express')
const {User, Account} = require('../db')
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

    //create a new account
    await Account.create({
        userId,
        balance : 1 + Math.random()*1000
    })

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
router.post('/signin',async (req,res)=>{
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



const updateSchema = z.object({
	firstName: zod.string(),
	lastName: zod.string(),
	password: zod.string()
  
  });


router.put("/user", authMiddleware, async (req, res) => {
  const { success } = signinSchema.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      message: "Error while updated information",
    });
  }
  const user = await User.updateOne(
    {
      _id: req.userId,
    },
    req.body
  );
  res.json({
    message: "Updated Successfully",
  });
});

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    }) 
    
});



module.exports = router;