// getting-started.js
const mongoose = require('mongoose');
const {Schema} = mongoose


const userSchema = new Schema(
    {
        username : {type : String, unique : true ,required:true},
        password : {type : String, minLength : 6 ,required:true},
        
    },{timestamps:true}
);





exports.User = mongoose.model('users',userSchema)