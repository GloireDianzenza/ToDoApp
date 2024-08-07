const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize('test1', 'root', 'rootsqls442@', {
    host: 'localhost',dialect:"mysql",define:{timestamps:false}});
const User = require("../models/user.model");
const Task = require("../models/task.model");
const Completed = require("../models/completed.model");

const UserTask = sequelize.define("UserTask",{
    idUser:{type:DataTypes.INTEGER,allowNull:false},
    idTask:{type:DataTypes.INTEGER,allowNull:false},
    completion:{type:DataTypes.STRING,allowNull:false}
});

User.belongsToMany(Task,{through:UserTask});
Task.belongsToMany(User,{through:UserTask});

module.exports = UserTask;