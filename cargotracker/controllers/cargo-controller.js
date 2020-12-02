let Cargo = require ('../models/cargo').Cargo
let {User} = require('../models/user')

exports.cargoController ={
    add: async (req, res, next) =>{
        if (req.isAuthenticated()){
            try {
                res.render('cargos/add_cargo', {
                    isCreate: true,
                    title:"Add",
                    caption: 'Add a cargo',
                    isAddActive: "active",
                    styles:['/stylesheets/mystyle.css &ldquo;','/stylesheets/cargo.css &ldquo;']
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
                    cargoTrack: cargo.tracking_id,
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
                    cargoTrack: cargo.tracking_id,
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
                        tracking_id: cargo.tracking_id
                    }
                })
                let options = {
                    caption: 'View all cargo',
                    title: "View all",
                    isViewAllActive: "active",
                    styles: ['/stylesheets/mystyle.css &ldquo;', '/stylesheets/style.css &ldquo;', '/stylesheets/cargo.css &ldquo;'],
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
        let cargo = await Cargo.create(getCargoParams(req.body))
        return cargo
    },

    update: async(req, res, next)=>{
        let cargo = await Cargo.findByIdAndUpdate({_id:req.body.id},getCargoParams(req.body), {new: true})
        return cargo;
    },
    delete: async(req, res, next)=>{
        let cargo = await Cargo.findByIdAndDelete({_id:req.query.id})
        req.user.cargos.pull(cargo.id.trim())
        req.user = await User.findByIdAndUpdate({_id:req.user.id.trim() }, {cargos:req.user.cargos}, {new: true})
        return cargo
    }
}
const getCargoParams = body =>{
    let date = new Date()
    return{
        tracking_id:body.tracking_id,
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
