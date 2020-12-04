const express = require('express');
const router = express.Router();

router.get('/', async function(req, res, next) {
    let options = {
        title: "Cargo Tracker",
      caption: "Cargo Tracker",
      layout: 'default',
        isHomeActive: "active",
      styles: ['/stylesheets/mystyle.css &ldquo;'],
    }
    res.render('index', options)

})

module.exports = router;
