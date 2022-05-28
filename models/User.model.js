const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 


const userSchema = new Schema({
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String, 
    },
    isAdmin: Boolean, 
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user'
      },
    ],
    role: {
      type: String, 
      enum: ['USER', 'ADMIN'],
      default: 'USER', 
    },
    
  });

const User = mongoose.model('user', userSchema);

module.exports = User;
