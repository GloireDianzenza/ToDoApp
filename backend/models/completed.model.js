const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize('test1', 'root', 'rootsqls442@', {
    host: 'localhost',dialect:"mysql",define:{timestamps:false}});

const Completed = sequelize.define("Completed",{
    title:{type:DataTypes.STRING,primaryKey:true,autoIncrement:false,allowNull:false},
    value:{type:DataTypes.TINYINT,allowNull:false,defaultValue:false}
});

module.exports = Completed;