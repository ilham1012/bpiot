const db = require("../models");
const { nanoid } = require('nanoid');

const Project = db.project;
// const Device = db.device;
const User = db.user;
const project = {};

project.create = async (project) => {
    var same_uid = true;
    var uid = nanoid(10);
    
    while(same_uid){
        uid = nanoid(10);
        let project = await Project.findOne({where: {project_uid: uid}});
        
        console.log("find uid ");
        console.log(project);
        if (project == null){
            same_uid = false;
        }
    }

    console.log("PROJECT CREATE");
    console.log("uid: ", uid);

    return Project.create({
        project_uid: nanoid(10),
        name: project.name,
        description: project.description,
    })
        .then((project) => {
            console.log(">> Created project: " + JSON.stringify(project, null, 4));
            return project;
        })
        .catch((err) => {
            console.log(">> Error while creating project: ", err);
            return null;
        });
  };


project.findById = (project_id) => {
    return Project.findByPk(project_id, 
        {
            include:
            [
                "devices",
                {
                    model: User,
                    as: "users",
                    attributes: ["username", "full_name", "email"],
                    through: {
                        attributes: [],
                    }
                },
            ],
        })
        .then((project) => {
            return project;
        })
        .catch((err) => {
            console.log(">> Error while finding project: ", err);
            return null;
        });
};

project.findAll = function () {
    return Project.findAll({

    }).then((projects) => {
        console.log("FIND ALL");
        console.log(projects);
        return projects;
    });
};


// Update a Project by the id in the request
project.update = (id, body) => {
    const name = body.name;
    const desc = body.description;

    return Project.update({name: name, description: desc}, {
      where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                return {status: 200, message: "Project was updated successfully."};
            } else {
                return {status: 404, message: `Cannot update Project with id=${id}. Maybe Project was not found or req.body is empty!`};
            }
        })
    .catch(err => {
        return {status: 500, message: "Error updating Project with id=" + id};
    });
}


// Delete a Project with the specified id in the request
project.delete = (id) => {
    // const id = req.params.id;

    return Project.destroy({
        where: { id: id }
    })
        .then(num => {
        if (num == 1) {
            return {status: 200, message: "Project was deleted successfully!"};
        } else {
            return {status: 404, message: `Cannot delete Project with id=${id}. Maybe Project was not found!`};
        }
    })
    .catch(err => {
        return {status: 500, message: "Could not delete Project with id=" + id};
    });
};


project.addUser = (project_id, user_id) => {
    return Project.findByPk(project_id)
      .then((project) => {
        if (!project) {
          console.log("Project not found!");
          return null;
        }
        
        return User.findByPk(user_id).then((user) => {
          if (!user) {
            console.log("User not found!");
            return null;
          }
  
          project.addUser(user);
          console.log(`>> added User id=${user.id} to Project id=${project.id}`);
          return project;
        });
      })
      .catch((err) => {
        console.log(">> Error while adding User to Project: ", err);
      });
};


// ========== API ==========


project.api_create = async (req, res) => {
    let newProject = await project.create(req.body);

    if (newProject != null){
        return res.status(201).send({message: 'Project was created successfully'});
    }

    return res.status(500).send({message: 'Error while creating project.'});
}

project.api_findById = async (req, res) => {
    let result = await project.findById(req.params.id);
    console.log("Project API");
    console.log(result);

    if (result != null){
        return res.status(200).send({message: result});
    }
    
    return res.status(404).send({message: 'Project not found.'});
}

project.api_findAll = async (req, res) => {
    let result = await project.findAll();

    if (result != null){
        return res.status(200).send({message: result});
    }
    
    return res.status(404).send({message: 'No project found.'});
}

project.api_update = async(req, res) => {
    let result = await project.update(req.params.id, req.body);
    return res.status(result.status).send({message: result.message});
};

project.api_delete = async(req, res) => {
    let result = await project.delete(req.params.id);
    return res.status(result.status).send({message: result.message});
}


module.exports = project;