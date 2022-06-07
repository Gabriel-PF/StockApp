const router = require('express').Router();
const { isAdmin, isLoggedIn } = require('../middlewares/auth.middlewares');
const Beverage = require('../models/Beverage.model');

router.get('/', isLoggedIn, async (req, res, next) => {
  try {
    const Beverages = await beverage.find();
    res.render( 'beverage/beverages-list', { Beverages, isAdmin: req.session.currentUser.isAdmin });
  } catch (error) {
    next(error);
  }
})

//  create
router.get('/create', isAdmin,(req, res, next) => {
  res.render('beverage/beverages-create');
})

// list
router.get('/list', isLoggedIn, async (req, res, next) => {
  const beverages = await Beverage.find();
  res.render( 'beverage/beverages-list', { beverages,  isAdmin: req.session.currentUser.isAdmin });
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

    res.redirect('/beverage/list');
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
    await beverage.findByIdAndUpdate(id,
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
    const beverage = await Beverage.findById(id);
    res.render( 'beverages/beverage-details', beverage);
  } catch (error) {
    next(error);
  }
})

// Bar 

router.get('/bar', isLoggedIn,(req, res, next) => {
  res.render('beverage/beverages-bar');
})



module.exports = router;