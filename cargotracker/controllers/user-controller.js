let User = require ('../models/user').User
const{body, validationResult}= require('express-validator')
const passport = require('passport')

exports.userController ={
     create: async (req, res, next) =>{
        const errors= validationResult(req)
        if (!errors.isEmpty()){
            req.flash('error', errors.array().map(e=> e.msg + '</br>').join(''))
            res.redirect('register')
        } else {
            try {
                let userParams = getUserParams(req.body)
                let newUser = new User(userParams)
                let user = await User.register(newUser, req.body.password)
                req.flash('success', `${user.fullName}'s account created successfully`)
                res.redirect('/')
            } catch (error) {
                console.log(`Error saving user: ${error.message}`)
                req.flash('error', `Failed to create user account. Invalid email.`)
                res.redirect('back')
            }
        }
    },
    update: async(req, res, next)=>{
            try{
                let user = await User.findByIdAndUpdate({_id: req.body.id}, getUserParams(req.body), {new: true})
                req.flash('success', `${user.fullName}'s information updated successfully`)
                res.redirect(`/users/view?id=${user._id}`)
            }
            catch (error) {
                console.log(`Error saving user: ${error.message}`)
                req.flash('error', `Failed to update user information.`)
                res.redirect('back')
            }
    },
    authenticate: async (req, res, next)=> {
         await passport.authenticate('local', function (err, user, info) {
             if(err)
                 return next(err)
                 console.log(err)
             if (!user){
                 req.flash('error', 'Failed to login')
                 return res.redirect('back')
             }
             req.logIn(user, function (err){
                 if(err)
                     return next(err)
                 req.flash('success', `${user.fullName} logged in!`)
                 return res.redirect('/')
             })
         })(req, res, next);
    },
    view: async (req, res, next)=>{
         if (req.isAuthenticated()){
             try{
                 const user = await User.findOne({_id: req.query.id})
                 console.log(user)
                 res.render('users/viewUser', {
                     id:req.query.id,
                     caption: 'View user',
                     title: 'View',
                     styles: ['/stylesheets/mystyle.css &ldquo;', '/stylesheets/cargo.css &ldquo;'],
                     firstName: user.name.first,
                     lastName: user.name.last,
                     email: user.email,
                     phone: user.phoneNumber
                 })

             }catch (err){
                 next(err)
             }
         }else{
             req.flash('error', 'Please log in to access Cargo information')
             res.redirect('/users/login')
         }
    },
    edit: async(req, res, next)=>{
        if (req.isAuthenticated()) {
            try {
                const user = await User.findOne({_id: req.query.id})
                res.render('users/edit_user', {
                    id:req.query.id,
                    isCreate: false,
                    caption: "Edit user",
                    title: "Edit user",
                    styles: ['/stylesheets/mystyle.css &ldquo;', '/stylesheets/cargo.css &ldquo;'],
                    firstName: user.name.first,
                    lastName: user.name.last,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    password:user.password
                })
            } catch (err) {
                next(err)
            }
        }else{
            req.flash('error', 'Please log in to access Cargo information')
            res.redirect('/users/login')
        }
    },
}
const getUserParams = body =>{
    return{
        name:{
            first: body.first,
            last: body.last
        },
        phoneNumber:body.phoneNumber,
        email: body.email,
        password: body.password
    }
}

exports.registerValidations =[
    body('first')
        .notEmpty().withMessage('First name is required')
        .isLength({min: 2}).withMessage('First name must be at least 2 characters'),
    body('last')
        .notEmpty().withMessage('Last name is required')
        .isLength({min: 2}).withMessage('Last name must be at least 2 characters'),
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({min: 8}).withMessage('Password must be at least 8 characters'),
    body('email').isEmail().normalizeEmail().withMessage('Email is invalid'),
    body('phoneNumber')
        .notEmpty().withMessage('Phone number is required')
        .isNumeric().withMessage('Please add a number')
        .isLength({min:10, max:10}).withMessage('Phone number has to be 10 digits')
]
