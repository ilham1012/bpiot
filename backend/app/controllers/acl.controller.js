const { nanoid } = require('nanoid');

const db = require("../models");
const ACL = db.acl;

exports.create = (deviceId, acl) => {
    console.log(acl);
    return ACL.create({
        deviceId: deviceId,
        pub: acl.pub,
        pattern: acl.pattern,
    })
        .then((acl) => {
            console.log(">> Created device: " + JSON.stringify(acl, null, 4));
            return acl;
        })
        .catch((err) => {
            console.log(">> Error while creating project: ", err);
        });
  };

exports.findById = (id) => {
    return ACL.findAll({where: {deviceId: id}})
        .then((acl) => {
            return acl;
        })
        .catch((err) => {
            console.log(">> Error while finding device: ", err);
        });
};

exports.findAll = (attr) => {
    return ACL.findAll({attributes: attr})
        .then((acl) => {
            return acl;
        });
};


exports.api_create = (req, res) => {
    console.log(req.body);
    this.create(req.body.deviceId, req.body)
        .then((newACL)=>{
            if (newACL != null){
                return res.status(201).send({message: 'ACL was created successfully'});
            }
            res.status(500).send({message: 'Error while creating ACL.'});
        });
}

exports.api_findById = (req, res) => {
    this.findById(req.params.id)
        .then((result)=>{
            if (result != null){
                return res.status(200).send(result);
            }
            res.status(404).send({message: 'device not found.'});
        });
}

exports.api_findAll = (req, res) => {
    this.findAll(['deviceId', 'pub', 'pattern'])
        .then((result)=>{
            console.log(result);
        
            if (result != null){
                return res.status(200).send(result);
            }
            
            res.status(404).send({message: 'No ACL found.'});

        })
}



exports.mqttAuth = (req, res) => {
    send = {}

    send.status = "Ok";
    send.publish_acl = [];
    send.subscribe_acl = [];

    ACL.findAll({where: {deviceId: req.userId}})
        .then((acl) => {
            acl.forEach(ac => {
                item = { pattern: ac.pattern };

                if (ac.pub) {
                    send.publish_acl.push(item);
                } else {
                    send.subscribe_acl.push(item);
                }
            });

            return res.status(200).send(send);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};
