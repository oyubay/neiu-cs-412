const express = require('express')
const router = express.Router()
let userStore = require('../app').userStore

router.get('/register', async (req, res, next)=>{
    res.render('users/register',{
        title: 'Register'
    })
})

module.exports = router
