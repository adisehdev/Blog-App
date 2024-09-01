// // getting-started.js
// const mongoose = require('mongoose');
// const {Schema} = mongoose


// const userSchema = new Schema(
//     {
//         username : {type : String, unique : true ,required:true},
//         password : {type : String, minLength : 6 ,required:true},
        
//     },{timestamps:true}
// );





// exports.User = mongoose.model('users',userSchema)



const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: { type: String, unique: true, required: true },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long'],
    },
  },
  { timestamps: true }
);

userSchema.pre('save', function (next) {
  if (this.password.length < 6) {
    const error = new Error('Password must be at least 6 characters long');
    next(error);
  } else {
    next();
  }
});

exports.User = mongoose.model('users', userSchema);
