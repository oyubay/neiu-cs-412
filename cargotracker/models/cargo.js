exports.AbstractCargoStore = class AbstractCargoStore{
    async close() { }
    async update(key, tracking_id, from_name, to_name, from_address, to_address, from_number, to_number, cargo_type, cargo_size, cargo_price, cargo_date, cargo_items) { }
    async create(key, tracking_id, from_name, to_name, from_address, to_address, from_number, to_number, cargo_type, cargo_size, cargo_price, cargo_date, cargo_items) { }
    async read(key) { }
    async destroy (key) { }
    async keyList(){ }
    async count() { }
}
const mongoose = require('mongoose')
const cargoSchema = new mongoose.Schema({
    key:{
        type:Number,
        required: true,
        unique: true
    },
    tracking_id:{
        type:Number,
        required: true,
        unique: true
    },
    from_name:{
        type:String,
        required:[true, 'Sender name is required']
    },
    from_address:{
        type:String,
        required:[true,'Sender address is required']
    },
    from_number:{
        type:Number,
        required:[true, 'Sender phone number is required']
    },
    to_name:{
        type:String,
        required:[true, 'Receiver name is required']
    },
    to_address:{
        type:String,
        required:[true,'Receiver address is required']
    },
    to_number:{
        type:Number,
        required:[true, 'Receiver phone number is required']
    },
    cargo_type:{
        type:String,
        required:[true,'Please choose your cargo type']
    },
    cargo_size:{
        type:Number,
        required:[true, 'How many lb is it?']
    },
    cargo_price:{
        type:Number,
        required:true
    },
    cargo_date:{
        type:Date,
        required:true
    },
    cargo_items:{
        type:String,
        required:true
    }
})

exports.Cargo = mongoose.model('cargotrackers', cargoSchema)
