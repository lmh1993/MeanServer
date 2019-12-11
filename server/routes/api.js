const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require ('../models/user');
const mongoose = require('mongoose');
//const db = "mongodb://Minghui:Appie12345@ds211875.mlab.com:11875/heroku_7mt753c8";
const db = "mongodb+srv://Minghui:Appie12345@cluster0-ayo02.mongodb.net/eventsdb?retryWrites=true&w=majority";

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true}, err => {
    if (err) {
        console.error('Error!' + err);
    } else {
        console.log('Connected to mongodb');
    }
});

function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send('Unauthorized request');
  }
  let token = req.headers.authorization.split(' ')[1];
  if (token === 'null') {
    return res.status(401).send('Unauthorized request');
  }
  try {
    let payload = jwt.verify(token, 'secretKey');
    if (!payload) {
      return res.status(401).send('Unauthorized request');
    }
    req.userId = payload.subject;
    next();
  } 
  catch {
    return res.status(401).send('Unauthorized request');
  }
}

router.get('/', (req, res) => {
    res.send('from api route')
});

router.post('/register', (req,res) => {
    let userData = req.body;
    let user = new User(userData);
    let hashedPassword = user.generateHash(user.password);
    user.password = hashedPassword;
    user.save((error, registeredUser) => {
        if (error) {
            console.log(error);
        } else {
            let payload = { subject: registeredUser._id};
            let token = jwt.sign(payload, 'secretKey');
            res.status(200).send({token});
        }
    });
});

router.post('/usercheck', function(req, res) {
  let userData = req.body;
  User.findOne({email: userData.email}, function(err, user){
      if(err) {
        console.log(err);
      } else {
          var message;
          if(user) {
              message = {exist: true};
          } else {
              message = {};
          }
          res.json(message);
      }
  });
});

router.post('/login', (req,res) => {
    let userData = req.body;
    User.findOne({email: userData.email}, (err, user) => {
        if (err) {
            console.log(err);
        } else {
            if (!user) {
                res.status(401).send('Invalid email/password');
            } else {
                //if ( user.password !== userData.password) {
                if (!user.validatePassword(userData.password, user.password)) {
                    res.status(401).send('Invalid email/password');
                } else {
                  let payload = { subject: user._id};
                  let token = jwt.sign(payload, 'secretKey');
                  res.status(200).send({token});
                }
            }
        }
    });
});

router.get('/events', (req,res) => {
    let events = [
        {
          "_id": "1",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "2",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "3",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "4",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "5",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "6",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        }
      ]
      res.json(events);
});

router.get('/special', verifyToken, (req,res) => {
    let events = [
        {
          "_id": "1",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "2",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "3",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "4",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "5",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "6",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        }
      ]
      res.json(events);
});

module.exports = router;