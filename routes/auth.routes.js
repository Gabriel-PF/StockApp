const router = require("express").Router();
const bcrypt = require("bcryptjs"); 
const User = require("../models/User.model");
/* const updloader = require('../config/cloudinary.config'); */
const SALT_FACTOR = 10;


/* router.get('/login', (req, res, next) => {
  res.render('/');
})
 */
//Sign up
/* router.get('/signup', (req, res, next) => {
  res.render('/');
}) */


router.post('/', async (req, res, next) => {
  const { Signupusername, Signuppassword } = req.body;

  if(!Signupusername || !Signuppassword){
    return res.render('/', {
      errorMessage: "Create an Acc!"
    })
  } 

    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/
  if(!regex.test(password)){
    return res.render('/', {
      errorMessage: "Password needs to have 8 char, including lower/upper case and a digit"
    })
  }  
 
  try {
    const foundUser = await User.findOne({ Signupusername });

    if(foundUser){
      return res.render('/', {
        errorMessage: "Name already in use"
      })
    }

    const hashedPassword = bcrypt.hashSync(Signuppassword, SALT_FACTOR);
    await User.create({
      Signupusername,
      Signuppassword: hashedPassword
    })

    res.redirect('/');

  } catch (error) {
    next(error);
  }
})
// login

router.post("/", async (req, res, next) => {
  const { Loginusername, Loginpassword } = req.body;

  if(Loginusername || Loginpassword){
    return res.render('beverage/beverages-list', {
      errorMessage: "beverages-list"
    })
  }


  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/
  if(!regex.test(password)){
    return res.render('/', {
      errorMessage: "Password needs to have 8 char, including lower/upper case and a digit"
    })
  } 
 
 try {
    const foundUser = await User.findOne({ Loginusername });

    if(!foundUser){
      return res.render('/', {
        errorMessage: "Wrong credentials"
      })
    } 

     const checkPassword = bcrypt.compareSync(Loginpassword, foundUser.Loginpassword);
    if(!checkPassword){
      return res.render('/', {
        errorMessage: "Wrong credentials"
      })
    } else {
      const objectUser = foundUser.toObject();
      delete objectUser.Loginpassword;
      req.session.currentUser = objectUser;
  
      return res.redirect('beverage/beverages-list');
    }

    
  } catch (error) {
    
  }
})  


module.exports = router;