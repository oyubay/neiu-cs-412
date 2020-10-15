const express = require('express');
const router = express.Router();

router.get('/', async function(req, res, next) {
  let options = {
    title: 'Cargo Tracker',
    layout: 'default',
    styles: ['/stylesheets/stylesheet/mystyle.css &ldquo;']
  }
  res.render('index', options);
});

module.exports = router;
