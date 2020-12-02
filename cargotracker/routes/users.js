const express = require('express')
const router = express.Router()
const{registerValidations, userController}=require('../controllers/user-controller')

router.get('/register', async (req, res, next)=>{
    res.render('users/register',{
        caption: 'Register',
        title:'Register',
        styles: ['/stylesheets/mystyle.css &ldquo;','/stylesheets/style.css &ldquo;', '/stylesheets/cargo.css &ldquo;'],
    })
})

router.get('/login', async (req, res, next)=>{
    res.render('users/login',{
        caption: 'Login',
        title:'Login',
        styles: ['/stylesheets/mystyle.css &ldquo;','/stylesheets/style.css &ldquo;', '/stylesheets/cargo.css &ldquo;']
    })
})

router.post('/register',registerValidations , async(req, res, next)=>{
    await userController.create(req, res, next)
})

router.post('/login', async(req, res, next)=>{
    await userController.authenticate(req, res, next)
})

router.get('/logout', async (req, res, next)=>{
    req.logout()
    req.flash('success', 'You are successfully logged out')
    res.redirect('/')
})

router.get('/viewUser', async (req, res, next)=>{
    await userController.viewUser(req, res, next)

})

module.exports = router
