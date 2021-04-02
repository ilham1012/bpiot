const db = require("../models");
const { nanoid } = require('nanoid');

const Project = db.project;
// const Device = db.device;
const User = db.user;
const project = {};

project.create = (project) => {
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


project.findById = (projectId) => {
    return Project.findByPk(projectId, 
        {
            include: [
                "devices", "users"
            ]
        })
        .then((project) => {
            return project;
        })
        .catch((err) => {
            console.log(">> Error while finding project: ", err);
            return null;
        });
};

project.findAll = () => {
    return Project.findAll({
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
    }).then((projects) => {
        return projects;
    });
  };

project.addUser = (projectId, userId) => {
    return Project.findByPk(projectId)
      .then((project) => {
        if (!project) {
          console.log("Project not found!");
          return null;
        }
        
        return User.findByPk(userId).then((user) => {
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

project.api_create = (req, res) => {
    newProject = project.create(req.body);

    if (newProject != null){
        res.status(201, 'Project was created successfully');
    }

    res.status(500, 'Error while creating project.');
}

project.api_findById = (req, res) => {
    result = project.findById(req.params.id);

    if (result != null){
        res.status(200, result);
    }
    
    res.status(404, 'Project not found.');
}

project.api_findAll = (req, res) => {
    result = project.findAll();

    if (result != null){
        res.status(200, result);
    }
    
    res.status(404, 'No project found.');
}


module.exports = project;