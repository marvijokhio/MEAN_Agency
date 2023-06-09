const express = require('express');
require('dotenv').config();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();
router.post( '/signup', passport.authenticate('signup', { session: false } ),
    async (req, res) => {
      res.json({
        message: 'Signup successful',
        user: req.user
      });
        // res.redirect('/login')
    }
  );

// ...

router.post('/login', async (req, res, next) => {
    passport.authenticate( 'login', async (err, user, info) => {
        try {
              if (err || !user) {
                const error = new Error('An error occurred.');
                return next(error);
              }

              req.login( user, { session: false }, async (error) => {
                if (error) return next(error);

                const body = { _id: user._id, email: user.email };
                const token = jwt.sign({ user: body }, process.env.APP_SECRET_TOKEN, { expiresIn: "24h"} );
                
                // res.redirect(`/user/profile?secret_token=${token}`)
                return res.json({ token });
              });

        } catch (error) {
            return next(error);
        }
      }
    )(req, res, next);
  }
);

module.exports = router;