const passport = require('passport');
const router = require('express').Router();

  router.get(
    '/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  router.get(
    '/google/redirect',
    passport.authenticate('google',{
      successRedirect: '/blogs',
      failureRedirect: '/'
    })
  );

  // version changed

  // router.get('/logout', (req, res) => {
  //   req.logout();
  //   res.redirect('http://localhost:3000/');
  // });

  router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { 
        return next(err); 
        }
      res.redirect('/');
    });
  });

  router.get('/current_user', (req, res) => {
    // console.log("router: ", req.user);
    res.send(req.user);
  });

  module.exports = router;

