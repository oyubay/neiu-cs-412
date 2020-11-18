const _cargo_key = Symbol('key')
const _cargo_tracking_id = Symbol('tracking_id')
const _cargo_items = Symbol('items')
const _shipping_from_name = Symbol('from_name')
const _shipping_to_name = Symbol('to_name')
const _shipping_from_address = Symbol('from_address')
const _shipping_to_address = Symbol('to_address')
const _shipping_from_number = Symbol('from_number')
const _shipping_to_number = Symbol('to_number')
const _cargo_type = Symbol('cargo_type')
const _cargo_size = Symbol('size')
const _cargo_price = Symbol('price')
const _cargo_date = Symbol('date')

exports.Cargo = class Cargo {
    constructor(key,tracking_id, from_name, to_name, from_address, to_address, from_number, to_number, cargo_type, size, price, date, items ) {
        this[_cargo_key] = key
        this[_cargo_tracking_id] = tracking_id
        this[_cargo_items] = items
        this[_shipping_from_name]=from_name
        this[_shipping_to_name] = to_name
        this[_shipping_from_address] = from_address
        this[_shipping_to_address] = to_address
        this[_shipping_from_number] = from_number
        this[_shipping_to_number]=to_number
        this[_cargo_type] = cargo_type
        this[_cargo_size] = size
        this[_cargo_price] = price
        this[_cargo_date] = date
    }

    get key() { return this[_cargo_key] }

    get tracking_id(){ return this[_cargo_tracking_id]}
    set tracking_id(newTracking){ this[_cargo_tracking_id]=newTracking}
    get items(){ return this[_cargo_items]}
    set items(newItems){this [ _cargo_items] = newItems}
    get from_name(){ return this [_shipping_from_name]}
    set from_name(newName){ this[_shipping_from_name]=newName}
    get to_name(){ return this [_shipping_to_name]}
    set to_name(newName){ this[_shipping_to_name]=newName}
    get from_address(){ return this [_shipping_from_address]}
    set from_address(newAddress){ this[_shipping_from_address]=newAddress}
    get to_address(){ return this [_shipping_to_address]}
    set to_address(newAddress){ this[_shipping_to_address]=newAddress}
    get from_number(){ return this [_shipping_from_number]}
    set from_number(newNumber){ this[_shipping_from_number]=newNumber}
    get to_number(){ return this [_shipping_to_number]}
    set to_number(newNumber){ this[_shipping_to_number]=newNumber}
    get cargo_type(){ return this[_cargo_type]}
    set cargo_type(newType){ this[_cargo_type]=newType}
    get price(){return this[_cargo_price]}
    set price(newPrice){this[_cargo_price]=newPrice}
    get size(){return this[_cargo_size]}
    set size(newSize){this[_cargo_size]=newSize}
    get date(){ return this[_cargo_date]}
    set date(newDate){this[_cargo_date]=newDate}

}

exports.AbstractCargoStore = class AbstractCargoStore{
    // async close() { }
    // async update(key, title, body) { }
    // async create(key, title, body) { }
    // async read(key) { }
    // async destroy (key) { }
    // async keyList(){ }
    // async count() { }

    async close() { }
    async update(key, tracking_id, from_name, to_name, from_address, to_address, from_number, to_number, cargo_type, size, price, date, items) { }
    async create(key, tracking_id, from_name, to_name, from_address, to_address, from_number, to_number, cargo_type, size, price, date, items) { }
    async read(key) { }
    async destroy (key) { }
    async keyList(){ }
    async count() { }

}
