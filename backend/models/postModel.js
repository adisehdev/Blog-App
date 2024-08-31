// getting-started.js
const mongoose = require('mongoose');
const {Schema} = mongoose
const dotenv = require('dotenv')

const postSchema = new Schema(
    {
        title : String,
        summary : String,
        content : String,
        cover : String,
        author : {type:Schema.Types.ObjectId ,ref : 'users'}
        
        
        
        
    },{timestamps:true}
);





exports.Post = mongoose.model('posts',postSchema)