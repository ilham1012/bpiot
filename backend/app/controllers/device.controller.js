const { nanoid } = require('nanoid');

const db = require("../models");
const Project = db.project;
const Device = db.device;

const device = {};

device.create = (project_id, device) => {
    console.log(device);
    return Device.create({
        project_id: project_id,
        uid: nanoid(10),
        password: nanoid(12),
        name: device.name,
        description: device.description,
    })
        .then((device) => {
            console.log(">> Created device: " + JSON.stringify(device, null, 4));
            return device;
        })
        .catch((err) => {
            console.log(">> Error while creating project: ", err);
        });
  };

device.findById = (id) => {
    return Device.findByPk(id, { include: ["project"] })
        .then((device) => {
            return device;
        })
        .catch((err) => {
            console.log(">> Error while finding device: ", err);
        });
};

device.findAll = (attr) => {
    return Device.findAll({attributes: attr})
        .then((devices) => {
            return devices;
        });
};


device.api_create = (req, res) => {
    console.log(req.body);
    device.create(req.body.project_id, req.body)
        .then((newDevice)=>{
            if (newDevice != null){
                return res.status(201).send({message: 'Device was created successfully'});
            }
            res.status(500).send({message: 'Error while creating device.'});
        });
}

device.api_findById = (req, res) => {
    device.findById(req.params.id)
        .then((result)=>{
            if (result != null){
                return res.status(200).send(result);
            }
            res.status(404).send({message: 'device not found.'});
        });
}

device.api_findAll = (req, res) => {
    device.findAll(['uid', 'name', 'description', 'project_id'])
        .then((result)=>{
            console.log(result);
        
            if (result != null){
                return res.status(200).send(result);
            }
            
            res.status(404).send({message: 'No device found.'});

        })
}

module.exports = device;