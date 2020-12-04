let Cargo = require ('../models/cargo').Cargo
let {User} = require('../models/user')
const{body, validationResult}= require('express-validator')
const moment = require('moment')

exports.cargoController ={
    add: async (req, res, next) =>{
        if (req.isAuthenticated()){
            try {
                res.render('cargos/add_cargo', {
                    isCreate: true,
                    title:"Send",
                    caption: 'Send a cargo',
                    isAddActive: "active",
                    styles:['/stylesheets/mystyle.css &ldquo;','/stylesheets/cargo.css &ldquo;'],
                    cargoFromName: req.user.fullName,
                    cargoFromNumber: req.user.phoneNumber
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
                const cargo = await Cargo.findOne({_id: req.query.id.trim()})
                let airTransport, autoTransport;
                if (cargo.cargo_type === 'air-transport')
                    airTransport = true
                else autoTransport = true
                res.render('cargos/edit_cargo', {
                    isCreate: false,
                    caption: "Edit cargo",
                    title: "Edit cargo",
                    cargoTitle: cargo.title,
                    styles: ['/stylesheets/mystyle.css &ldquo;', '/stylesheets/cargo.css &ldquo;'],
                    id: req.query.id,
                    cargoItems: cargo.cargo_items,
                    cargoToName: cargo.to_name,
                    cargoFromName: cargo.from_name,
                    cargoToAddress: cargo.to_address,
                    cargoFromAddress: cargo.from_address,
                    cargoToNumber: cargo.to_number,
                    cargoFromNumber: cargo.from_number,
                    cargoType: cargo.cargo_type,
                    airTransport: airTransport,
                    autoTransport: autoTransport,
                    cargoPrice: cargo.cargo_price,
                    cargoSize: cargo.cargo_size,
                    cargoDate: cargo.cargo_date,
                })
            } catch (err) {
                next(err)
            }
        }else{
            req.flash('error', 'Please log in to access Cargo information')
            res.redirect('/users/login')
        }
    },

    view: async(req, res, next)=>{
        if (req.isAuthenticated()) {
            try {
                const cargo = await Cargo.findOne({_id: req.query.id.trim()})
                res.render('cargos/view_cargo', {
                    caption: "View cargo",
                    title: "View",
                    styles: ['/stylesheets/mystyle.css &ldquo;', '/stylesheets/cargo.css &ldquo;'],
                    id: req.query.id,
                    cargoTrack: req.query.id,
                    cargoItems: cargo.cargo_items,
                    cargoToName: cargo.to_name,
                    cargoFromName: cargo.from_name,
                    cargoToAddress: cargo.to_address,
                    cargoFromAddress: cargo.from_address,
                    cargoToNumber: cargo.to_number,
                    cargoFromNumber: cargo.from_number,
                    cargoType: cargo.cargo_type,
                    cargoPrice: cargo.cargo_price,
                    cargoSize: cargo.cargo_size,
                    cargoDate: cargo.cargo_date,
                })
            } catch (err) {
                next(err)
            }
        }else{
            req.flash('error', 'Please log in to access Cargo information')
            res.redirect('/users/login')
        }
    },
    viewAll: async ( req, res, next)=>{
        if (req.isAuthenticated()) {
            try {
                let cargoIds = req.user.cargos
                let cargoPromises = cargoIds.map(id => Cargo.findOne({_id:id}))
                let cargos = await  Promise.all(cargoPromises)
                // const cargos = await Cargo.find({})
                let allCargos = await cargos.map(cargo => {
                    return {
                        id: cargo._id,
                        to_name: cargo.to_name
                    }
                })
                let options = {
                    caption: 'View all cargo',
                    title: "View all",
                    isViewAllActive: "active",
                    styles: ['/stylesheets/mystyle.css &ldquo;', '/stylesheets/cargo.css &ldquo;'],
                    cargoList: allCargos
                }
                res.render('cargos/viewall_cargo', options)
            } catch (err) {
                next(err)
            }
        }else {
            req.flash('error', 'Please log in to access Cargo information')
            res.redirect('/users/login')
        }
    },

    create: async(req, res, next)=>{
        const errors= validationResult(req)
        if (!errors.isEmpty()){
            req.flash('error', errors.array().map(e=> e.msg + '</br>').join(''))
            res.redirect('add')
        } else {
            try {
                let cargo = await Cargo.create(getCargoParams(req.body))
                req.user.cargos.push(cargo.id)
                req.user = await User.findByIdAndUpdate({_id:req.user.id.trim() }, {cargos:req.user.cargos}, {new: true})
                res.redirect(`/cargos/view?id=${cargo._id}`)
            } catch (error) {
                console.log(`Error adding a cargo: ${error.message}`)
                req.flash('error', `Failed to add a cargo.`)
                res.redirect('back')
            }
        }
    },
    update: async(req, res, next)=>{
        let cargo = await Cargo.findByIdAndUpdate({_id:req.body.id},getCargoParams(req.body), {new: true})
        res.redirect(`/cargos/view?id=${cargo._id}`)
    },
    delete: async(req, res, next)=>{
        let cargo = await Cargo.findByIdAndDelete({_id:req.query.id})
        req.user.cargos.pull(cargo.id.trim())
        req.user = await User.findByIdAndUpdate({_id:req.user.id.trim() }, {cargos:req.user.cargos}, {new: true})
        return cargo
    }
}
const getCargoParams = body =>{
    let date = moment()
    return{
        from_name: body.from_name,
        from_address: body.from_address,
        from_number: body.from_number,
        to_name: body.to_name,
        to_number: body.to_number,
        to_address: body.to_address,
        cargo_type: body.cargo_type,
        cargo_date:date,
        cargo_price: body.price,
        cargo_size: body.size,
        cargo_items: body.items
    }
}
exports.cargoValidations =[
    body('from_name')
        .notEmpty().withMessage('Sender name is required')
        .isLength({min: 2}).withMessage('Sender name must be at least 2 characters'),
    body('from_address')
        .notEmpty().withMessage('Sender address is required'),
    body('from_number')
        .notEmpty().withMessage('Sender phone number is required')
        .isNumeric().withMessage('Please add a sender phone number')
        .isLength({min:10, max:10}).withMessage('Sender phone number has to be 10 digits'),

    body('to_name')
        .notEmpty().withMessage('Receiver name is required')
        .isLength({min: 2}).withMessage('Receiver  name must be at least 2 characters'),
    body('to_address')
        .notEmpty().withMessage('Receiver address is required'),
    body('to_number')
        .notEmpty().withMessage('Receiver phone number is required')
        .isNumeric().withMessage('Please add a receiver  phone number')
        .isLength({min:10, max:10}).withMessage('Receiver phone number has to be 10 digits'),

    body('price')
        .notEmpty().withMessage('Cargo price is required')
        .isNumeric().withMessage('Only numeric value is required'),
    body('size')
        .notEmpty().withMessage('Cargo size is required')
        .isNumeric().withMessage('Only numeric value is required'),
    body('items')
        .notEmpty().withMessage('Cargo items are required')
        .isLength({min: 2}).withMessage('Cargo items must be at least 2 characters'),
]
