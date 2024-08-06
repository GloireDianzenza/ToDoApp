const express = require("express");
const app = express();
const {Sequelize} = require('sequelize');
const sequelize = new Sequelize('test1', 'root', 'rootsqls442@', {
    host: 'localhost',dialect:"mysql"});
const userRoute = require("./routes/user.route")
const taskRoute = require("./routes/task.route")
const completedRoute = require("./routes/completed.route")
const mainRoute = require("./routes/main.route")
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use(express.json());
app.use("/api/users",userRoute);
app.use("/api/tasks",taskRoute);
app.use("/api/status",completedRoute);
app.use("/api/manage",mainRoute);

async function connect(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
connect()
sequelize.sync();

module.exports = {app,sequelize};