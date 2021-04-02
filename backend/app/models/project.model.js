module.exports = (sequelize, Sequelize) => {
    const Project = sequelize.define("projects", {
      project_uid: {
        type: Sequelize.STRING(10),
        allowNull: false,
        unique: true
      },
      name: {
        type: Sequelize.STRING(64)
      },
      description: {
        type: Sequelize.STRING
      }
    });
  
    return Project;
  };