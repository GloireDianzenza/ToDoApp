const {Sequelize} = require('sequelize');
const sequelize = new Sequelize('test1', 'root', 'rootsqls442@', {
    host: 'localhost',dialect:"mysql"});
const bcrypt=require("bcrypt");
const Task = require("../models/task.model");
const User = require("../models/user.model");
const Main = require("../models/main.model");

async function setNewTask(req,res,next){
    try{
        const idUser = req.body.idUser;
        const checkUser = await User.findAll({where:{id:idUser}});//sequelize.query(`SELECT * FROM user WHERE id = '${idUser}'`);
        if(checkUser.length > 0){
            let newTask = req.body.task;
            const checkTask = await Task.findAll({where:{title:newTask}});//sequelize.query(`SELECT id FROM task WHERE title = '${newTask}'`);
            if(checkTask.length > 0){
                const idTask = checkTask[0].id;
                const addTask = await Main.create({idUser:idUser,idTask:idTask,completion:"Pending",UserId:idUser,TaskId:idTask});//sequelize.query(`INSERT INTO user_task VALUES ('${idUser}','${idTask}','Pending')`);
                return res.status(201).json({message:"Tâche ajoutée"});
            }
            else{
                //New task
                const _newTask = await Task.create({title:newTask})//sequelize.query(`INSERT INTO task (title) VALUES ('${newTask}')`);
                const newIdTask = await Task.findAll({where:{title:newTask}});//sequelize.query(`SELECT id FROM task WHERE title = '${newTask}'`);
                const idTask = newIdTask[0].id;
                const addTask = await Main.create({idUser:idUser,idTask:idTask,completion:"Pending",UserId:idUser,TaskId:idTask});//sequelize.query(`INSERT INTO user_task VALUES ('${idUser}','${idTask}','Pending')`);
                return res.status(201).json({message:"Tâche ajoutée"});
            }
        }
        else{
            throw new Error("User not found");
        }
    }catch(error){
        return res.status(404).json({error});
    }
}

async function getAssignedTasks(req,res,next){
    try{
        const allTasks = await Main.findAll();//sequelize.query("SELECT * FROM usertasks");
        let tsks = [];
        for(tsk of allTasks){
            tsks.push(tsk.dataValues);
        }
        return res.status(200).json(tsks);
    }catch(error){
        return res.status(404).json({error});
    }
}

async function findAssignedTasks(req,res,next){
    try{
        const id = req.params.id;
        const allTasks = await Main.findAll({where:{idUser:id}});//sequelize.query("SELECT * FROM usertasks");
        let tsks = [];
        for(tsk of allTasks){
            tsks.push(tsk.dataValues);
        }
        return res.status(200).json(tsks);
    }catch(error){
        return res.status(404).json({error});
    }
}

async function singleAssignedTasks(req,res,next){
    try{
        const id = req.params.id;
        const task = req.params.task;
        const allTasks = await Main.findAll({where:{idUser:id,idTask:task}});//sequelize.query("SELECT * FROM usertasks");
        return res.status(200).json(allTasks[0].dataValues);
    }catch(error){
        return res.status(404).json({error});
    }
}

async function updateTask(req,res,next){
    try{
        const idUser = req.params.id;
        const idTask = req.params.task;
        const updateTask = await sequelize.query(`UPDATE task SET title = '${req.body.title}' WHERE id = '${idTask}'`);
        return res.status(201).json({message:"Tâche mise à jour"});
    }catch(error){
        return res.status(400).json({error});
    }
}

async function deleteTask(req,res,next){
    try{
        const idUser = req.params.id;
        const idTask = req.params.task;
        const updateTask = await sequelize.query(`DELETE FROM usertasks WHERE idUser = '${idUser}' AND idTask = '${idTask}'`);
        return res.status(201).json({message:"Tâche supprimée"});
    }catch(error){
        return res.status(400).json({error});
    }
}

async function toggleCompletion(req,res,next){
    try{
        const idUser = req.params.id;
        const idTask = req.params.task;
        const editCompletion = await sequelize.query(`UPDATE usertasks SET completion = CASE WHEN completion = 'Pending' THEN 'Done' ELSE 'Pending' END WHERE idUser = '${idUser}' AND idTask = '${idTask}'`);
        return res.status(201).json({message:"Completion toggled"})
    }catch(error){
        return res.status(404).json({error});
    }
}

module.exports = {setNewTask,getAssignedTasks,findAssignedTasks,updateTask,deleteTask,singleAssignedTasks,toggleCompletion};