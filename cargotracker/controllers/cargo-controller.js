let Cargo = require ('../models/cargo').Cargo

exports.cargoController ={
    create = async (tracking_id, from_name, to_name, from_address, to_address, from_number,
        to_number, cargo_type, cargo_size, cargo_price, cargo_date, cargo_items)=> {
        let cargo = new Cargo({
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
        cargo = await cargo.save()
        return cargo
    }
    update: async(req, res, next)=>{

    }
    async update(key, tracking_id, from_name, to_name, from_address, to_address, from_number, to_number, cargo_type,cargo_size, cargo_price,  cargo_items) {
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
}
