const { Schema, model } = require('mongoose');

const beverageSchema = new Schema({
  name: {
    brand: String,
    required: true
  },

  type: {
    class: String,
    pictureUrl: String
  },

  Expiration: {
    type: Number,
    
  },

  Size : {
    type: Number,
    min: 300,
    max: 3000
  },

  BuyingPrice : {
    type: Number,
    min: 0,
    max: 1000
  },

  SellingPrice : {
    type: Number,
    min: 0,
    max: 2000
  }

});

const beverage = model('beverage', beverageSchema);

module.exports = beverage;