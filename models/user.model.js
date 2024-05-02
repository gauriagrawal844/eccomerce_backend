const mongoose=require("mongoose");

const userSchema=new mongoose.Schema(
    {
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    phoneNo :{type:Number,required:true,unique:true},
    password: { type: String, required: true, select: false },
    images:{type:String,required:false},
    },{
        timestamps:true,
    }
);
const User=mongoose.model("User",userSchema);
module.exports=User;