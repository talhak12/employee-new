const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const placeSchema=new Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    friends:{type:String,required:true}
})

module.exports=mongoose.model('Place',placeSchema);