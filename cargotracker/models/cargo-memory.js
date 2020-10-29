let Cargo = require ('./cargo').Cargo
let AbstractCargoStore = require('./cargo').AbstractCargoStore

let cargos = [];
exports.InMemoryCargoStore = class InMemoryCargosStore extends AbstractCargoStore {
    async close(){ }

    async update(key, title, body) {
        cargos[key].title = title
        cargos[key].body = body
        return cargos[key]
    }

    async create(key, title, body){
        cargos[key] = new Cargo(key, title, body)
        return cargos[key]
    }

    async read(key){
        if (cargos[key])
            return cargos[key]
        else
            throw new Error('Note ${key} does not exist')
    }
    async destroy(key){
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
