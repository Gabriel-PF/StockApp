module.exports = {
    isLoggedIn: (req, res, next) => {
      if(req.session.currentUser) {
        next();
      } else {
        return res.redirect("/auth/login");
      } 
    },
    isAdmin:  (req, res, next) => {
      if(req.session.currentUser && req.session.currentUser.isAdmin) {
        next();
      } else {
        return res.redirect("/auth/login");
      } 
    }
  }