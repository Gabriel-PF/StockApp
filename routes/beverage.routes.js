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

//  Bar
router.get('/bar', isLoggedIn,(req, res, next) => {
  res.render('beverage/beverages-bar');
})
//  Edit
router.get('/edit', isAdmin,(req, res, next) => {
  res.render('beverage/beverages-edit');
})

// list
router.get('/list', isLoggedIn, async (req, res, next) => {
  const beverages = await Beverage.find();
  res.render( 'beverage/beverages-list', { beverages,  isAdmin: req.session.currentUser.isAdmin });
})
// details
router.get('/details', isLoggedIn,(req, res, next) => {
  res.render('beverage/beverages-details',);
})


 // delete ?? 
router.post('/beverages/:beverageId/delete',isAdmin, (req, res, next) => {
  const { beverageId } = req.params;


   Beverage.findByIdAndDelete(beverageId)
    .then(() => res.redirect('beverages/list'))
    .catch(error => next(error));
}); 


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




 router.get('/:id/delete', async (req, res, next) => {
  try {
    const { name, type, expiration, size, buyingPrice, sellingPrice } = req.body;
    await Beverage.findByIdAndDelete({
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