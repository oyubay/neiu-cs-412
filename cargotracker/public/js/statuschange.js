let cargostatus = require('./cargostatus')
exports.changeStatus= function (){
    let tempStatus=cargostatus.getStatus()
    console.log("You changed your status to " + tempStatus)
    return true
}
