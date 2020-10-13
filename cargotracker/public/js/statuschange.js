//JS file 3
let cargostatus = require('./cargostatus')
let moment = require('moment')

let EventEmitter = require('events').EventEmitter

exports.changeStatus= function (){

    let emitter = new EventEmitter();
    let tempStatus=cargostatus.getStatus(emitter)
    let now = moment().format()
    console.log("You changed your status to " + tempStatus + " at " + now)

    for (let i=0; i<=10; i++){
        console.log('pre-emitter')
        emitter.emit('getFreight' , i )
        console.log('post-emitter')
    }
    emitter.removeAllListeners('getFreight')

    return true
}
