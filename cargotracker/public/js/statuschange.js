let cargostatus = require('./cargostatus')
let moment = require('moment')
exports.changeStatus= function (){
    let tempStatus=cargostatus.getStatus()
    let now = moment().format()
    console.log("You changed your status to " + tempStatus + " at " + now)

    return true
}
