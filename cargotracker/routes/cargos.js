const express = require('express')
const router = express.Router()
let cargosStore = require('../app').cargosStore

router.get('/add', async (req, res, next) => {
    try {
        res.render('add_cargo', {
            isCreate: true,
            title:"Add",
            caption: 'Add a cargo',
            cargoKey: await cargosStore.count(),
            isAddActive: "active",
            styles:['/stylesheets/mystyle.css &ldquo;','/stylesheets/cargo.css &ldquo;']
        })
    } catch (err){
        next(err)
    }
})

router.post('/save', async(req, res, next)=>{
    try {
        let cargo
        let date = new Date()
        if(req.body.saveMethod === 'create')
            cargo = await cargosStore.create(req.body.cargoKey, req.body.tracking_id, req.body.from_name, req.body.to_name, req.body.from_address,
                req.body.to_address, req.body.from_number, req.body.to_number, req.body.cargo_type, req.body.size, req.body.price,
                date, req.body.items)
        else
            cargo = await cargosStore.update(req.body.cargoKey,req.body.tracking_id, req.body.from_name, req.body.to_name, req.body.from_address,
                req.body.to_address, req.body.from_number, req.body.to_number, req.body.cargo_type, req.body.size, req.body.price,
                 req.body.items)
        res.redirect('/cargos/view?key='+req.body.cargoKey)
    }catch (err){
        next(err)
    }
})

router.get('/destroy', async(req, res, next)=>{
    try{
        await cargosStore.destroy(req.query.key)
        res.redirect('viewall')
    }
    catch (err){
        next(err)
    }
})

router.get('/viewall', async function(req, res, next) {

    try {
        let allCargos = await cargosStore.findAllCargos()
        let options = {
            caption: 'View all cargo',
            title:"View all",
            isViewAllActive: "active",
            styles: ['/stylesheets/mystyle.css &ldquo;','/stylesheets/style.css &ldquo;', '/stylesheets/cargo.css &ldquo;'],
            cargoList: allCargos
        }
        res.render('viewall_cargo', options)
    }catch(err){
        next(err)
    }
})

router.get('/view', async(req, res, next)=>{
    try{
        let cargo = await cargosStore.read(req.query.key)
        res.render('view_cargo', {
            caption:"View cargo",
            title:"View",
            styles: ['/stylesheets/mystyle.css &ldquo;', '/stylesheets/cargo.css &ldquo;'],
            cargoKey: cargo.key,
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
            cargoDate:cargo.cargo_date,
        })
    }
    catch(err){

    }
})

router.get('/edit', async (req, res, next)=>{
    try{
        let cargo = await cargosStore.read(req.query.key)
        res.render('edit_cargo', {
            isCreate: false,
            caption:"Edit cargo",
            title:"Edit cargo",
            cargoTitle: cargo.title,
            styles: ['/stylesheets/mystyle.css &ldquo;', '/stylesheets/cargo.css &ldquo;'],
            cargoKey: cargo.key,
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
            cargoDate:cargo.cargo_date,
        })
    }catch(err){
        next(err)
    }
})


module.exports = router;
