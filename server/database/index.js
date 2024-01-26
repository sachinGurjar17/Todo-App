const Mongoose = require('mongoose');

const userSchema = new Mongoose.Schema({
    username:String,
    password: String,
})

const todoSchema = new Mongoose.Schema({
   id:Number,
   todo:String,
   completed:Boolean,
   userId : String 
})

const User = Mongoose.model('User',userSchema);
const Todo = Mongoose.model('Todo',todoSchema);

module.exports = {
   User,
   Todo
}

