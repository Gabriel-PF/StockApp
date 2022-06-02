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
  const { username, password } = req.body;

  if(!username || !password){
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
    const foundUser = await User.findOne({ username });

    if(foundUser){
      return res.render('/', {
        errorMessage: "Name already in use"
      })
    }

    const hashedPassword = bcrypt.hashSync(password, SALT_FACTOR);
    await User.create({
      username,
      password: hashedPassword
    })

    res.redirect('/');

  } catch (error) {
    next(error);
  }
})
// login

router.post("/", async (req, res, next) => {
  const { username, password } = req.body;

  if(username || password){
    return res.render('beverage/beverages-list', {
      errorMessage: "beverages-list"
    })
  }


  /* const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/
  if(!regex.test(password)){
    return res.render('/', {
      errorMessage: "Password needs to have 8 char, including lower/upper case and a digit"
    })
  }  */
 
 try {
    const foundUser = await User.findOne({ username });

    if(!foundUser){
      return res.render('/', {
        errorMessage: "Wrong credentials"
      })
    } 

     const checkPassword = bcrypt.compareSync(password, foundUser.password);
    if(!checkPassword){
      return res.render('/', {
        errorMessage: "Wrong credentials"
      })
    } else {
      const objectUser = foundUser.toObject();
      delete objectUser.password;
      req.session.currentUser = objectUser;
  
      return res.redirect('beverage/create');
    }

    
  } catch (error) {
    
  }
})  


module.exports = router;