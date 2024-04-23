const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');

exports.user_create_get = (req, res, next) => {
  res.render('sign-up-form');
};

exports.user_create_post = asyncHandler(async (req, res, next) => {
  // bcrypt hash
  bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
    if (err) {
      return next(err);
    } else {
      // Create user object
      const user = new User({
        username: req.body.username,
        password: hashedPassword,
      });
      const result = await user.save();
      res.redirect('/');
    }
  });
});
