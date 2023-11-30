var express = require('express');
var router = express.Router();
const passport = require('passport');
let DB = require('../config/db');
let userModel = require('../models/user');
let User = userModel.User;

router.get('/login',function(req,res,next){
  if(!req.user)
  {
    res.render('auth/login',
    {
      title:'Login',
      message: req.flash('loginMessage'),
      displayName: req.user ? req.user.displayName:''
    })
  }
  else{
    return res.redirect('/index')
  }
})

router.post('/login',function(req,res,next){
  passport.authenticate('local',function(err,User,info){
      // server error
      if(err)
      {
        return next(err);
      }
      // login error
      if(!User)
      {
        req.flash('loginMessage',
        'AuthenticationError');
        return res.redirect('/login')
      }
      req.login(User,(err)=>{
        if(err)
        {
          return next(err)
        }
        return res.redirect('/workoutslist');
      })
  })(req,res,next)
})

router.get('/register',function(req,res,next){
  if(!req.user)
  {
    res.render('auth/register',
    {
      title:'Register',
      message: req.flash('registerMessage'),
      displayName: req.user ? req.user.displayName: ''
    })
  }
  else{
    return res.redirect('/index')
  }
})

router.post('/register', function(req,res,next){
  let newUser = new User({
    username: req.body.username,
    // password: req.body.password,
    email: req.body.email,
    displayName: req.body.displayName
  })
  User.register(newUser, req.body.password,(err) => {
    if(err)
    {
      console.log("Error in inserting new User");
      if(err.name =='UserExistError')
      {
        req.flash('registerMessage',
        'Registration Error : User already Exist'
      )}
      return res.render('auth/register',
      {
        title:'Register',
        message: req.flash('registerMessage'),
        displayName: req.user ? req.user.displayName:''
      })
    }
    else{
      return passport.authenticate('local')(req,res,()=>{
        res.redirect('/workoutslist');
      })
    }
  })
})

router.get('/logout',function(req,res,next){
  req.logout(function(err){
    if(err)
    {
      return next(err);
    }
  })
  res.redirect('/index')
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: "Celine's Portfolio",
    displayName: req.user ? req.user.displayName:''  
  });
});
/* GET home page. */
router.get('/index', function(req, res, next) {
  res.render('index', { 
    title: "Celine's Portfolio",
    displayName: req.user ? req.user.displayName:''  
});
});
/* GET about me page. */
router.get('/aboutme', function(req, res, next) {
  res.render('aboutme', { 
    title: 'About Me',
    displayName: req.user ? req.user.displayName:''  
  });
});
/* GET projects page. */
router.get('/projects', function(req, res, next) {
  res.render('projects', { 
    title: 'Projects',
    displayName: req.user ? req.user.displayName:'' 
  });
});
/* GET contact page. */
router.get('/contact', function(req, res, next) {
  res.render('contact', { 
    title: 'Contact',
    displayName: req.user ? req.user.displayName:'' 
  });
});

module.exports = router;
