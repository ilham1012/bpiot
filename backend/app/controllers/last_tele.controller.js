const db = require("../models");
const LastTele = db.last_tele;
const { Op } = require("sequelize");

const last_tele = {};



last_tele.create = async (data) => {
    console.log(data);

    const tele = await LastTele.findOne({ 
        where: {
            [Op.and]: [
                { device_id: data.device_id },
                { key_id: data.key_id }
            ] 
        }
    });

    if (tele === null) {
        console.log('Last Telemetry Not found!');
        return LastTele.create(data).catch((err) => {
            console.log(">> Error creating last telemetry: ", err);
            return null;
        });;
    } else {
        console.log('Last Telemetry found!');
        return LastTele.update({
            time: data.time,
            device_id: data.device_id,
            key_id: data.key_id,
            long_val: data.long_val,
            double_val: data.double_val,
            string_val: data.string_val,
            json_val: data.json_val
        }, {
            where: { id: tele.id }
        }).catch((err) => {
            console.log(">> Error updating last telemetry: ", err);
            return null;
        });
    }

};

last_tele.findById = (id) => {
    return LastTele.findByPk(id)
    .then((tele) => {
        return tele;
    })
    .catch((err) => {
        console.log(">> Error while finding last tele: ", err);
        return null;
    });
};

last_tele.findAll = (device_id) => {    
    console.log("zzzzzzzzzz");
    return LastTele.findAll({where: {device_id: device_id}, include: "key" })
        .then((teles) => {
            return teles;
        }).catch((err) => {
            console.log(">> Error while finding last teles: ", err);
            return null;
        });
};


// ========== API ==========


// last_tele.api_create = async (req, res) => {
//     console.log(req.body);
//     let newDevice = await last_tele.create(req.body.project_id, req.body);
    
//     if (newDevice != null){
//         return res.status(201).send({message: 'Device was created successfully'});
//     }

//     return res.status(500).send({message: 'Error while creating device.'});
// }

last_tele.api_findById = async (req, res) => {
    let result = await last_tele.findById(req.params.id);

    if (result != null){
        return res.status(200).send(result);
    }

    return res.status(404).send({message: 'last tele not found.'});
}

last_tele.api_findAll = async (req, res) => {  
    console.log("zzzzzzzzzz");
    // let device = await db.device.findOne({where: {uid: req.params.device_uid}});
    let result = await last_tele.findAll(req.params.id);

    console.log(result);

    

    if (result != null){
        return res.status(200).send(result);
    }

    return res.status(404).send({message: 'last telemetry not found for device: ' + req.params.device_uid});
}

module.exports = last_tele;