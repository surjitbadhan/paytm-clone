const express = require('express')
const {User, Account} = require('../db')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config')
const router = express.Router()
const z = require('zod')
const {authMiddleware} = require('../middleware')

const signupSchema = z.object({
    username: z.string().email(),
	firstname: z.string(),
	lastname: z.string(),
	password: z.string()
  
  });

router.post("/signup", async (req, res) => {
    try{
    const {success} = signupSchema.safeParse(req.body)
    if(!success){
        res.status(411).json({message:"Incorrect inputs"})
    }
    const existingUser = await User.findOne({
        userName : req.body.username
    })
    if(existingUser){
        res.status(411).json({
            message:"username already exists"
        })
    }
    const user = await User.create({
        userName : req.body.username,
        password : req.body.password,
        firstName : req.body.firstname,
        lastName : req.body.lastname
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
}
catch(e){
    console.log
}
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
        userName : req.body.username,
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
	firstname: z.string(),
	lastname: z.string(),
	password: z.string()
  
  });


router.put("/user", authMiddleware, async (req, res) => {
  const { success } = updateSchema.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      message: "Error while updated information",
    });
  }
  const user = await User.updateOne(
    {
      _id: req.userId,
    },
    {
        firstName : req.body.firstname,
        lastName : req.body.lastname,
        password : req.body.password
    }
  );
  res.json({
    message: "Updated Successfully",
  });
});

router.get("/userinfo",authMiddleware,async (req,res)=>{
    console.log(req.userId)
    const user = await User.findOne({
        _id:req.userId
    })
    res.json({
        firstname:user.firstName
    })
})

router.get("/bulk", authMiddleware, async (req, res) => {
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
            userName: user.userName,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    }) 
    
});



module.exports = router;