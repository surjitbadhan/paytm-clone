const mongoose = require("mongoose");

// mongoose connection
mongoose.connect("mongodb://localhost:27017/paytm",{
   useNewUrlParser: true,
   useUnifiedTopology: true
})

// user schema
const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true,
        trim : true,
        lowercase :true,
        minLength : 3,
        maxLength : 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
})

export const User = mongoose.model("User",userSchema)

