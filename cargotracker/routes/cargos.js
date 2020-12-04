const express = require('express')
const router = express.Router()
// let cargosStore = require('../app').cargosStore
const {cargoController, cargoValidations} = require('../controllers/cargo-controller')
let {User} = require('../models/user')
router.get('/add', async (req, res, next) => {

        await cargoController.add(req, res, next)
})
router.post('/save',cargoValidations,  async(req, res, next)=>{

        if(req.body.saveMethod === "create")
            await cargoController.create(req, res, next)
        else
            await cargoController.update(req, res, next)

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
