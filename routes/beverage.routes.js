const router = require('express').Router();
const { isAdmin, isLoggedIn } = require('../middlewares/auth.middlewares');
const { findById } = require('../models/Beverage.model');
const Beverage = require('../models/Beverage.model');


router.get('/', isLoggedIn, async (req, res, next) => {
  try {
    const beverages = await Beverage.find({bar:false,});
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
  const beverages = await Beverage.find({user: req.session.currentUser.isAdmin ? req.session.currentUser._id : req.session.currentUser.admId , list:true , bar: false  });
  res.render( 'beverage/beverages-list', { beverages,  isAdmin: req.session.currentUser.isAdmin });
}) 
//Bar
router.get('/bar', isLoggedIn, async (req, res, next) => {
  const beverages = await Beverage.find({user: req.session.currentUser.isAdmin ? req.session.currentUser._id : req.session.currentUser.admId , bar: true , list: false });
  res.render( 'beverage/beverages-bar', { beverages,  isAdmin: req.session.currentUser.isAdmin });
})

// Send to bar
router.post('/send-to-bar/:id', isLoggedIn, async(req, res, next) => {
  const {id} = req.params;
  const beverages = await Beverage.findByIdAndUpdate (id, {bar:true}, {new:true})

  const newBeverages = await Beverage.find({user: req.session.currentUser._id, bar: false });
  res.render('beverage/beverages-list',{ newBeverages,  isAdmin: req.session.currentUser.isAdmin });
})

//Sold
router.get('/sold', isLoggedIn, async (req, res, next) => {
  const beverages = await Beverage.find({user: req.session.currentUser.isAdmin ? req.session.currentUser._id : req.session.currentUser.admId ,sold: true, bar: true  });
  res.render( 'beverage/beverages-sold', { beverages,  isAdmin: req.session.currentUser.isAdmin });
})

router.post('/send-to-sold/:id', isLoggedIn, async (req, res, next) => {
  const {id} = req.params;
  const beverages = await Beverage.findByIdAndUpdate (id, {sold:true},{new:true})

  const newBeverages = await Beverage.find({user: req.session.currentUser._id, sold: false });
  res.render('beverage/beverages-bar',{ newBeverages, isAdmin: req.session.currentUser.isAdmin });
})



//  Edit
router.get('/edit', isAdmin,(req, res, next) => {
  res.render('beverage/beverages-edit',);
})



// details
router.get('/details', isLoggedIn,(req, res, next) => {
  res.render('beverage/beverages-details',);
})


router.post('/create', async (req, res, next) => {
  try {
    const { name, type, expiration, size, buyingPrice, sellingPrice, quantity } = req.body;
    await Beverage.create({
      user: req.session.currentUser._id,
      name,
      type,
      expiration,
      size,
      buyingPrice,
      sellingPrice,
      quantity
    });

    res.redirect('/beverage/list');
  } catch (error) {
    next(error);
  }
})


router.get('/edit', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, type, expiration, size, buyingPrice, sellingPrice } = req.body;
    await Beverage.findByIdAndUpdate(id,
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
    
      res.redirect(`/beverage/list`);
  } catch (error) {
    next(error);
  }
})


// details
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const beverage = await Beverage.findById(id);
    res.render( 'beverage/beverages-details', beverage);
  } catch (error) {
    next(error);
  }
})


module.exports = router;