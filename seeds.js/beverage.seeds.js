require('dotenv/config')
require('../db');
const beverages = require('../data/beverages');
const beverage = require('../model/Beverage.model');

const createBeverages = async () => {
  try {
    await beverage.create(beverages);
    console.log(`${beverages.length} beverages created`)
  } catch (error) {
    console.error(error);
  }
}

createBeverages();