const mongoose = require('mongoose')
const Schema = mongoose.Schema
const SchemaTypes = mongoose.SchemaTypes

exports.AbstractUserStore = class AbstractUserStore {
    async create(reqBody){ }
}

const UserSchema = new Schema({
    name:{
        first:{
            type: String,
            trim: true
        },
        last:{
            type: String,
            trim: true
        }
    },
    email:{
        type:String,
        require:[true, 'Email is required'],
        unique:true
    },
    password:{
        type:String,
        required:[true, 'Password is required']
    },
    cargos:[
        {
            type:SchemaTypes.ObjectID,
            ref: 'Cargo'
        }
    ]
})

UserSchema.virtual('fullname').get(function (){
    return `${this.name.first} ${this.name.last}`
})

exports.User = mongoose.model('users', UserSchema)
