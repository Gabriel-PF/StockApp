const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User.model");
const SALT_FACTOR = 10;


router.get("/login", (req, res, next) => {
  res.render("auth/login");
});

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.get('/logout',  function (req, res, next)  {
  if (req.session) {
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});
router.post("/signup", async (req, res, next) => {
  const { username, password, isAdmin, admId  } = req.body;
  console.log(username, password)
  if (!username || !password) {
    return res.render("auth/signup", {
      errorMessage: "Credentials are mandatory",
    });
  }
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
  if (!regex.test(password)) {
    return res.render("auth/signup", {
      errorMessage:
        "Password needs to have 8 char, including lower/upper case and a digit",
    });
  }
  try {
    const foundUser = await User.findOne({ username });
    if (foundUser) {
      return res.render("auth/signup", {
        errorMessage: "Name already in use",
      });
    } else {
      const hashedPassword = bcrypt.hashSync(password, SALT_FACTOR);
      await User.create({
        username,
        password: hashedPassword,
        isAdmin,
        admId
        
      });
      res.redirect("auth/login");
    }
  } catch (error) {
    next(error);
  }
});
// login
router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.render("auth/login", {
      errorMessage: "Credentials are mondatory!",
    });
  }
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
  if (!regex.test(password)) {
    return res.render("auth/login", {
      errorMessage:
        "Password needs to have 8 char, including lower/upper case and a digit",
    });
  }
  try {
    const foundUser = await User.findOne({ username });
    if (!foundUser) {
      return res.render("auth/login", {
        errorMessage: "Wrong credentials",
      });
    }
    const checkPassword = bcrypt.compareSync(password, foundUser.password);
    if (!checkPassword) {
      return res.render("auth/login", {
        errorMessage: "Wrong credentials",
      });
    } else {
      const objectUser = foundUser.toObject();
      delete objectUser.password;
      req.session.currentUser = objectUser;
      return res.redirect("/");
    }
  } catch (error) {}
});


module.exports = router;