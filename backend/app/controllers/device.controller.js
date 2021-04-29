const { customAlphabet } = require('nanoid/non-secure');
const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 10);

const db = require("../models");
const Project = db.project;
const Device = db.device;
const ACL = require("../controllers/acl.controller");
const { Op } = require("sequelize");

const device = {};

device.create = (project_id, device) => {
    console.log(device);
    return Device.create({
        project_id: project_id,
        uid: nanoid(),
        password: nanoid(12),
        name: device.name,
        description: device.description,
    })
        .then((device) => {
            // create default ACL
            if (project_id) {
                Project.findByPk(project_id)
                    .then(async(project) => {
                        pattern = project.uid + "/#";
                        // pub
                        await ACL.create(device.id, {
                            pub: true,
                            pattern: pattern
                        });
    
                        await ACL.create(device.id, {
                            pub: false,
                            pattern: pattern
                        });
                    });
            }

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
            return null;
        });
};

device.findAll = (attr) => {
    console.log("----------------- DEVICE FIND -------------");
    console.log(attr);

    return Device.findAll({attributes: attr, where: {id: {[Op.ne]: 1}}})
        .then((devices) => {
            return devices;
        });
};


// Update a Device by the id in the request
device.update = (id, body) => {
    const name = body.name;
    const desc = body.description;

    return Device.update({name: name, description: desc}, {
      where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                return {status: 200, message: "Device was updated successfully."};
            } else {
                return {status: 404, message: `Cannot update Device with id=${id}. Maybe Device was not found or req.body is empty!`};
            }
        })
    .catch(err => {
        return {status: 500, message: "Error updating Device with id=" + id};
    });
}


// Delete a Device with the specified id in the request
device.delete = (id) => {
    // const id = req.params.id;

    return Device.destroy({
        where: { id: id }
    })
        .then(num => {
        if (num == 1) {
            return {status: 200, message: "Device was deleted successfully!"};
        } else {
            return {status: 404, message: `Cannot delete Device with id=${id}. Maybe Device was not found!`};
        }
    })
    .catch(err => {
        return {status: 500, message: "Could not delete Device with id=" + id};
    });
};


// ========== API ==========


device.api_create = async (req, res) => {
    console.log(req.body);
    let newDevice = await device.create(req.body.project_id, req.body);
    
    if (newDevice != null){
        return res.status(201).send({message: 'Device was created successfully'});
    }

    return res.status(500).send({message: 'Error while creating device.'});
}

device.api_findById = async (req, res) => {
    let result = await device.findById(req.params.id);

    if (result != null){
        return res.status(200).send(result);
    }

    return res.status(404).send({message: 'device not found.'});
}

device.api_findAll = async (req, res) => {
    let result = await device.findAll(['id','uid', 'name', 'description', 'project_id', 'token']);
        
    if (result != null){
        return res.status(200).send(result);
    }
    
    return res.status(404).send({message: 'No device found.'});
}


device.api_update = async(req, res) => {
    let result = await device.update(req.params.id, req.body);
    return res.status(result.status).send({message: result.message});
};

device.api_delete = async(req, res) => {
    let result = await device.delete(req.params.id);
    return res.status(result.status).send({message: result.message});
}

module.exports = device;