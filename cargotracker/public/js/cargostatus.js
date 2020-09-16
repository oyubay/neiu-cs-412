let freightcargo = require('./freightcargo')
exports.getStatus= function(){
    let status = freightcargo.getFreight()
   // console.log(status)
    console.log('This is the status for your ' + status)
    return "shipped"
}
