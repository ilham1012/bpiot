const db = require("../models");
const Tele = db.telemetry;
const { Op } = require("sequelize");

const telemetry = {};


telemetry.find = (device_id, key_id, q_limit=10) => {    
    console.log(`device_id: ${device_id} key_id: ${key_id}`);
    return Tele.findAll({
            where: {
                [Op.and]: [
                    { device_id: device_id },
                    { key_id: key_id }
                ] },
            include: [
                { model: db.telemetry_key, as: "telemetry_key", attributes: ["id", "key"]},
                { model: db.device, as: "telemetry_device", attributes: ["id", "uid"]}] ,
            limit: q_limit,
            order: [['time', 'DESC']],
        })
        .then((teles) => {
            return telemetry.formatData(teles);
        }).catch((err) => {
            console.log(">> Error while finding teles: ", err);
            return null;
        });
};


telemetry.formatData = (teles) => {
    let data = {};
    let times = [];
    let values = [];
    // let keys = [];

    for(let i=0; i < teles.length; i++){
        let val = null;
        let tele = teles[i];
        
        if (tele.long_val != null){
            val = tele.long_val;
        } else if (tele.double_val != null){
            val = tele.double_val;
        } else if (tele.string_val != null){
            val = tele.string_val;
        } else if (tele.json_val != null){
            val = tele.json_val;
        }

        times.push(tele.time);
        values.push(val);
        // keys.push(tele.telemetry_key.key);
    };

    // data.push(keys);
    data.device = teles[0].telemetry_device;
    data.telemetry_key = teles[0].telemetry_key;
    data.time = times;
    data.values = values;

    return data
};


// ========== API ==========

telemetry.api_find = async (req, res) => {  
    console.log("zzzzzzzzzz");
    let result = await telemetry.find(req.params.device_id, req.params.key_id);

    console.log(result);

    

    if (result != null){
        return res.status(200).send(result);
    }

    return res.status(404).send({message: 'telemetry not found for device: ' + req.params.device_uid});
}

module.exports = telemetry;