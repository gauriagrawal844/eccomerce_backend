const mongoose=require("mongoose");

const productSchema=new mongoose.Schema(
    {
    name:{type:String,required:true},
    price :{type:Number,required:true},
    description:{type:String,required:true},
    thumbnail:{type:String,required:false},
    category:{type:String,required:true},
    images:[String],
    },{
        timestamps:true,
    }
);
const Product=mongoose.model("Product",productSchema);
module.exports=Product;