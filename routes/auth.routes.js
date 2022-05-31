const router = require("express").Router();
const bcrypt = require("bcryptjs"); 
const User = require("../models/User.model");
/* const updloader = require('../config/cloudinary.config'); */
const SALT_FACTOR = 10;


router.get('/signup', (req, res, next) => {
  res.render('auth/signup');
})


router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;

  if(!username || !password){
    return res.render('auth/login', {
      errorMessage: "Credentials are mondatory!"
    })
  }

/*   const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/
  if(!regex.test(password)){
    return res.render('auth/signup', {
      errorMessage: "Password needs to have 8 char, including lower/upper case and a digit"
    })
  } */ 

  try {
    const foundUser = await User.findOne({ username });

    if(foundUser){
      return res.render('auth/signup', {
        errorMessage: "Name already in use"
      })
    }

    const hashedPassword = bcrypt.hashSync(password, SALT_FACTOR);
    await User.create({
      password: hashedPassword
    })

    res.redirect('/auth/login');

  } catch (error) {
    next(error);
  }
})
// login
router.get('/login', (req, res, next) => {
  res.render('auth/login');
})

router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  if(!username || !password){
    return res.render('auth/login', {
      errorMessage: "Credentials are mondatory!"
    })
  }

/*   const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/
  if(!regex.test(password)){
    return res.render('auth/login', {
      errorMessage: "Password needs to have 8 char, including lower/upper case and a digit"
    })
  } */

  try {
    const foundUser = await User.findOne({ username });

    if(!foundUser){
      return res.render('auth/login', {
        errorMessage: "Wrong credentials"
      })
    }

    const checkPassword = bcrypt.compareSync(password, foundUser.password);
    if(!checkPassword){
      return res.render('auth/login', {
        errorMessage: "Wrong credentials"
      })
    }

    const objectUser = foundUser.toObject();
    delete objectUser.password;
    req.session.currentUser = objectUser;

    return res.redirect('/');
  } catch (error) {
    
  }
})

module.exports = router;