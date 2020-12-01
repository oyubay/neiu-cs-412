let Cargo = require ('./cargo').Cargo
let AbstractCargoStore = require('./cargo').AbstractCargoStore

const mongoose = require('mongoose')
const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    } catch (err) {
        console.log(err)
    }
}

exports.MongooseCargoStore = class MongooseCargoStore extends AbstractCargoStore {

    async update(key, tracking_id, from_name, to_name, from_address, to_address, from_number, to_number, cargo_type,cargo_size,
                 cargo_price,  cargo_items) {
        let cargo = await Cargo.findOneAndUpdate({key:key},{
            tracking_id:tracking_id,
            from_name: from_name,
            from_address: from_address,
            from_number: from_number,
            to_name: to_name,
            to_number: to_number,
            to_address: to_address,
            cargo_type: cargo_type,
            // cargo_date:cargo_date,
            cargo_price: cargo_price,
            cargo_size:cargo_size,
            cargo_items:cargo_items
        })
        return cargo
    }

    async create(key, tracking_id, from_name, to_name, from_address, to_address, from_number,
                 to_number, cargo_type, cargo_size, cargo_price, cargo_date, cargo_items){
        let count = await Cargo.countDocuments({})
        let cargo = new Cargo({
            key:count,
            tracking_id: tracking_id,
            from_name: from_name,
            from_address: from_address,
            from_number: from_number,
            to_name: to_name,
            to_number: to_number,
            to_address: to_address,
            cargo_type: cargo_type,
            cargo_date:cargo_date,
            cargo_price: cargo_price,
            cargo_size:cargo_size,
            cargo_items:cargo_items
        })
        await cargo.save()
        return cargo
    }
    async read(key){
        const cargo = await Cargo.findOne({key:key})
        return cargo
    }
    async findAllCargos(){
        const cargos = await Cargo.find({})
        return cargos.map(cargo => {
            return {
                key:cargo.key,
                tracking_id:cargo.tracking_id
            }
        })
    }
    async destroy(key){
        let cargo = await Cargo.findOneAndDelete({key:key})
        return cargo
    }
    async count(){
        const count = await Cargo.countDocuments({})
        return count
    }
}
