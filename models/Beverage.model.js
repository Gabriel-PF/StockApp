const { Schema, model } = require('mongoose');

const beverageSchema = new Schema({
  
  user:{
    type: Schema.Types.ObjectId,
    ref: "User"
  
    },

  name: {
    type: String,
    /* required: true */
  },

  type: {
    type: String,
  },

  expiration: {
    type: String,   
  },

  size : {
    type: Number,
    min: 300,
    max: 3000
  },

  buyingPrice : {
    type: Number,
    min: 0,
    max: 1000
  },

  sellingPrice : {
    type: Number,
    min: 0,
    max: 2000
  },
  quantity : {
    type: Number,
    
  },

  bar:{
  type: Boolean,
  default: false
  }

});

const beverage = model('beverage', beverageSchema);

module.exports = beverage;