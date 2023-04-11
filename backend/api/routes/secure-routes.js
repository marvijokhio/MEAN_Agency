const express = require('express');
const { verify } = require('jsonwebtoken');
const router = express.Router();

router.get(
  '/profile',
  (req, res) => {
    res.json({
      token: req.query.secret_token
    })
  }
);

module.exports = router;