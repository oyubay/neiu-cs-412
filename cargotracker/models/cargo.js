const _cargo_key = Symbol('key')
const _cargo_title = Symbol('title')
const _cargo_body = Symbol('body')

exports.Cargo = class Cargo {
    constructor(key, title, body) {
        this[_cargo_key] = key
        this[_cargo_title] = title
        this[_cargo_body] = body
    }

    get key() { return this[_cargo_key] }
    get title() { return this[_cargo_title] }
    set title(newTitle) { this [_cargo_title] = newTitle }
    get body() { return this[_cargo_body] }
    set body(newBody) { this[_cargo_body] = newBody }
}

exports.AbstractCargoStore = class AbstractCargoStore{
    async close() { }
    async update(key, title, body) { }
    async create(key, title, body) { }
    async read(key) { }
    async destroy (key) { }
    async keyList(){ }
    async count() { }

}
