//JS file 2
let freightcargo = require('./freightcargo')
exports.getStatus= function(emitter){
    emitter.on('getFreight', function(i){
        console.log("Received event " + i)
    })
    let status = freightcargo.getFreight()
    console.log('This is the status for your ' + status)
    return "shipped"
}
