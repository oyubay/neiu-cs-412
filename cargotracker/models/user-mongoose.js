let User = require ('./user').User
let AbstractUserStore = require('./user').AbstractUserStore

const mongoose = require('mongoose')
const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
    } catch (err) {
        console.log(err)
    }
}
exports.MongooseUserStore = class MongooseUserStore extends AbstractUserStore{
    async create(reqBody){
        await connectDB()
        let userParams = getUserParams(reqBody)
        let user = await User.create()
        await mongoose.disconnect()
        return user
    }
}

const getUserParams = body =>{
    return {
        name:{
            first: body.first,
            last: body.last,
        },
        email: body.email,
        password: body.password
    }
}
