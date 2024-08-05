const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize('test1', 'root', 'rootsqls442@', {
    host: 'localhost',dialect:"mysql",define:{timestamps:false}});

const User = sequelize.define("User",{
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    pseudo:DataTypes.STRING,
    password:DataTypes.STRING
});

module.exports = User;