(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.statuschange = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
let freightcargo = require('./freightcargo')
exports.getStatus= function(){
    let status = freightcargo.getFreight()
   // console.log(status)
    console.log('This is the status for your ' + status)
    return "shipped"
}

},{"./freightcargo":2}],2:[function(require,module,exports){
exports.getFreight=function (){
    console.log("It is your freight cargo")
    return "freight"
}



},{}],3:[function(require,module,exports){
let cargostatus = require('./cargostatus')
exports.changeStatus= function (){
    let tempStatus=cargostatus.getStatus()
    console.log("You changed your status to " + tempStatus)
    return true
}

},{"./cargostatus":1}]},{},[3])(3)
});
