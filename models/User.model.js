const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 


const userSchema = new Schema({
    username: {
      type: String,
      unique: true,
    },
    password: {
      type: String, 
    },
    isAdmin: {
      type: Boolean,
      default: false 
    },
    admId:{
      type: Schema.Types.ObjectId,
    ref: "User",
    default: null
      }
    
  });

const User = mongoose.model('User', userSchema);

module.exports = User;
