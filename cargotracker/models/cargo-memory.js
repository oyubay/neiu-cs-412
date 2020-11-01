let Cargo = require ('./cargo').Cargo
let AbstractCargoStore = require('./cargo').AbstractCargoStore

let cargos = [];
exports.InMemoryCargoStore = class InMemoryCargosStore extends AbstractCargoStore {
    async close(){ }

    async update(key, tracking_id, from_name, to_name, from_address, to_address, from_number, to_number, cargo_type, size, price, date, items) {
        cargos[key].tracking_id = tracking_id
        cargos[key].from_name = from_name
        cargos[key].to_name = to_name
        cargos[key].from_address = from_address
        cargos[key].to_address = to_address
        cargos[key].from_number = from_number
        cargos[key].to_number = to_number
        cargos[key].cargo_type = cargo_type
        cargos[key].size = size
        cargos[key].price = price
        cargos[key].date = date
        cargos[key].items = items
        return cargos[key]
    }

    async create(key, tracking_id, from_name, to_name, from_address, to_address, from_number, to_number, cargo_type, size, price, date, items){
        cargos[key] = new Cargo(key,tracking_id,  from_name, to_name, from_address, to_address, from_number, to_number, cargo_type, size, price, date, items)
        return cargos[key]
    }

    async read(key){
        console.log(cargos[key])
        if (cargos[key])
            return cargos[key]
        else
            throw new Error('Note ${key} does not exist')
    }
    async destroy(key){
        console.log(cargos[key])
        if (cargos[key])
            delete cargos[key]
        else
            throw new Error('Note ${key} does not exist')
    }
    async keyList(){
        return Object.keys(cargos)
    }
    async count(){
        return cargos.length
    }
}
