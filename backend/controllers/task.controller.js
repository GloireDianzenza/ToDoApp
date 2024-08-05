const {Sequelize} = require('sequelize');
const sequelize = new Sequelize('test1', 'root', 'rootsqls442@', {
    host: 'localhost',dialect:"mysql"});
const Task = require("../models/task.model");

async function getTasks(req,res,next){
    try{
        const tasks = await Task.findAll();
        let newTasks = [];//sequelize.query("SELECT * FROM tasks;");
        for(let tsk of tasks){
            newTasks.push(tsk.dataValues);
        }
        return res.status(200).json(newTasks);
    }
    catch(error){
        res.status(404).json({error});
    }
}

async function findTask(req,res,next) {
    try{
        const task = await Task.findAll({where:{id:req.params.id}});//sequelize.query(`SELECT * FROM tasks WHERE id = '${req.params.id}';`);
        return res.status(200).json(task[0].dataValues);
    }
    catch(error){
        res.status(404).json({error});
    }
}

async function addTask(req,res,next) {
    try{
        const tasks = await Task.create({title:req.body.title});//sequelize.query(`INSERT INTO task (title) VALUES ('${req.body.title}');`);
        return res.status(200).json({message:"Tâche ajoutée"});
    }
    catch(error){
        res.status(404).json({error});
    }
}

async function updateTask(req,res,next) {
    try{
        const tasks = await sequelize.query(`UPDATE tasks SET title = '${req.body.title}' WHERE id = '${req.params.id}';`);
        return res.status(200).json({message:"Tâche modifiée"});
    }
    catch(error){
        res.status(404).json({error});
    }
}

async function deleteTask(req,res,next) {
    try{
        const tasks = await sequelize.query(`DELETE FROM tasks WHERE id = '${req.params.id}';`);
        return res.status(200).json({message:"Tâche supprimée"});
    }
    catch(error){
        res.status(404).json({error});
    }
}

module.exports = {getTasks,findTask,addTask,updateTask,deleteTask};