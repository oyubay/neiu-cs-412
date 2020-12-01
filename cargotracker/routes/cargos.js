const express = require('express')
const router = express.Router()
// let cargosStore = require('../app').cargosStore
const cargoController = require('../controllers/cargo-controller').cargoController
router.get('/add', async (req, res, next) => {

    await cargoController.add(req, res, next)
})

router.post('/save', async(req, res, next)=>{
    try{
        let cargo
        if(req.body.saveMethod === "create"){
            cargo = await cargoController.create(req, res, next)
        }
        else{
            cargo = await cargoController.update(req, res, next)
        }
        res.redirect(`/cargos/view?id=${cargo._id}`)
    }catch (err){
        next(err)
    }

})

router.get('/viewall', async function(req, res, next) {
    await cargoController.viewAll(req, res, next)
})

router.get('/view', async(req, res, next)=>{
    await cargoController.view(req, res, next)
})

router.get('/edit', async (req, res, next)=>{
    await cargoController.edit(req, res, next)
})

router.get('/destroy', async(req, res, next)=>{
    try{
        await cargoController.delete(req, res, next)
        res.redirect('viewall')
    }
    catch (err){
        next(err)
    }
})

module.exports = router;
