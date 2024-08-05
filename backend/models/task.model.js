const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize('test1', 'root', 'rootsqls442@', {
    host: 'localhost',dialect:"mysql",define:{timestamps:false}});

const Task = sequelize.define("Task",{
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    title:{type:DataTypes.STRING,allowNull:false}
});

module.exports = Task;