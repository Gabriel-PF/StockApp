const router = require('express').Router();
const beverage = require('../models/Beverage.model');
const Beverage = require('../models/Beverage.model');

router.get('/', async (req, res, next) => {
  try {
    const Beverages = await beverage.find();
    res.render( 'beverage/beverages-list', { Beverages });
  } catch (error) {
    next(error);
  }
})


router.get('/create', (req, res, next) => {
  res.render('beverage/beverages-create');
})

router.post('/create', async (req, res, next) => {
  try {
    const { name, type, expiration, size, buyingPrice, sellingPrice } = req.body;
    await Beverage.create({
      name,
      type,
      expiration,
      size,
      buyingPrice,
      sellingPrice
    });

    res.redirect(' /Beverages');
  } catch (error) {
    next(error);
  }
})

router.get('/:id/edit', async (req, res, next) => {
  try {
    const { id } = req.params;
    const beverage = await Beverage.findById(id);
    res.render( 'beverage/Beverages-edit', beverage);
  } catch (error) {
    next(error);
  }
})

router.post('/:id/edit', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, type, expiration, size, buyingPrice, sellingPrice } = req.body;
    awabeverage.findByIdAndUpdate(id,
      {
        name,
        type,
        expiration,
        size,
        buyingPrice,
        sellingPrice
      },
      {
        new: true
      });
    
      res.redirect(`Beverages/${id}`);
  } catch (error) {
    next(error);
  }
})

router.post('/:id/delete', async (req, res, next) => {
  try {
    const { id } = req.params;
    await Beverage.findByIdAndDelete(id);

    res.redirect('/Beverages');
  } catch (error) {
    next(error);
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const book = await Beverage.findById(id);
    res.render( 'beverages/beverage-details', beverage);
  } catch (error) {
    next(error);
  }
})

module.exports = router;