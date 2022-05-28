const { Schema, model } = require('mongoose');

const beverageSchema = new Schema({
  name: {
    brand: String,
    /* required: true */
  },

  type: {
    class: String,
    pictureUrl: String
  },

  expiration: {
    type: Number,
    
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
  }

});

const beverage = model('beverage', beverageSchema);

module.exports = beverage;