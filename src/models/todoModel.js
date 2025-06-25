const mongoose = require("mongoose")

const todoSchema = new mongoose.Schema({
     userId: { 
        type: mongoose.Schema.Types.ObjectId,
         ref: "User",
          required: true },
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed:{
        type:Boolean,
        default:false
    }
},{collection:"Todo",timestamps:true})

module.exports=mongoose.model("Todo",todoSchema);