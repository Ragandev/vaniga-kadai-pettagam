const mongoose = require("mongoose")

const vendorSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    mobileno:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    address:{
        type:String
    },
    gstno:{
        type:Number
    }
})

module.exports = mongoose.model("vendor",vendorSchema)