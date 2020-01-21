var express = require('express');
var router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.json({ title: 'Express' });
});

router.post('/register', function (req, res, next) {

  const { name, password } = req.body
  bcrypt.hash(password, 10).then((hash) => {
    const user = new User({
      name,
      password: hash

    })

    const promise = user.save();
    promise.then((data) => {
      res.json(data)
    }).catch((err) => {
      res.json(err)
    })
  });
});

router.post('/authenticate', (req, res) => {
  const { name, password } = req.body;

  User.findOne({
    name
  }, (err, user) => {
    if (err)
      throw err;

    if (!user) {
      res.json({
        status: false,
        message: 'Authentication failed, user not found.'
      });
    } else {
      bcrypt.compare(password, user.password).then((result) => {
        if (!result) {
          res.json({
            status: false,
            message: 'Authentication failed, wrong password.'
          });
        } else {
          const payload = {
            name
          };
          const token = jwt.sign(payload, req.app.get('api_secret_key'), {
            expiresIn: 720
          });

          res.json({
            status: true,
            token
          })
        }
      });
    }
  });


})




module.exports = router;
