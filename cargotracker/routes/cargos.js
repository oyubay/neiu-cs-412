const express = require('express')
const router = express.Router()
let cargosStore = require('../app').cargosStore

router.get('/add', async (req, res, next) => {
    try {
        res.render('add_cargo', {
            isCreate: true,
            title: 'Add a cargo',
            cargoKey: await cargosStore.count(),
            styles:['/stylesheets/mystyle.css &ldquo;','/stylesheets/cargo.css &ldquo;']
        })
    } catch (err){
        next(err)
    }
})
router.get('/viewall', async function(req, res, next) {

    try {
        let keyList = await cargosStore.keyList()
        let keyPromises = keyList.map(key => {
            return cargosStore.read(key)
        })
        let allCargos = await Promise.all(keyPromises)
        let options = {
            title: 'View all cargo',
            styles: ['/stylesheets/mystyle.css &ldquo;','/stylesheets/style.css &ldquo;', '/stylesheets/cargo.css &ldquo;'],
            cargoList: extractNotesToLiteral(allCargos)
        }
        res.render('viewall_cargo', options)
    }catch(err){
        next(err)
    }
})
function extractNotesToLiteral(allCargos){
    return allCargos.map(cargos=> {
        return {
            key: cargos.key,
            title: cargos.title
        }
    })
}

router.post('/save', async(req, res, next)=>{
    try {
        let cargo;
        if(req.body.saveMethod === 'create')
            cargo = await cargosStore.create(req.body.cargoKey, req.body.title, req.body.body)
        else
            cargo = await cargosStore.update(req.body.cargoKey, req.body.title, req.body.body)
        res.redirect('/cargos/view?key='+req.body.cargoKey)
    }catch (err){
        next(err)
    }
})

router.get('/view', async(req, res, next)=>{
    try{
        let cargo = await cargosStore.read(req.query.key)
        res.render('view_cargo', {
            title:"View cargo",
            cargoTitle: cargo.title,
            cargoKey: cargo.key,
            cargoBody: cargo.body,
            styles: ['/stylesheets/mystyle.css &ldquo;', '/stylesheets/cargo.css &ldquo;'],
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
            title:"Edit cargo",
            cargoTitle: cargo.title,
            cargoKey: cargo.key,
            cargoBody: cargo.body,
            styles: ['/stylesheets/mystyle.css &ldquo;', '/stylesheets/cargo.css &ldquo;']
        })
    }catch(err){
        next(err)
    }
})

router.get('/destroy', async(req, res, next)=>{
    try{
        let cargo = await cargosStore.read(req.query.key)
        res.render('delete_cargo', {
            isCreate: true,
            title: "Delete cargo",
            cargoKey:cargo.key,
            styles: ['/stylesheets/mystyle.css &ldquo;']
        })
        cargo = await cargosStore.destroy(req.query.key)

        res.redirect('viewall')

    }catch (err){
        next(err)
    }
})

module.exports = router;
