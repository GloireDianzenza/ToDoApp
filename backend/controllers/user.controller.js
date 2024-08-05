const {Sequelize} = require('sequelize');
const sequelize = new Sequelize('test1', 'root', 'rootsqls442@', {
    host: 'localhost',dialect:"mysql"});
const bcrypt=require("bcrypt");
const User = require("../models/user.model");

async function getUsers(req,res,next){
    try{
        const users = await User.findAll();//await sequelize.query("SELECT * FROM users");
        const newUsers = [];
        for(let us of users){
            newUsers.push(us.dataValues);
        }
        return res.status(200).json(newUsers);
    }catch(error){
        return res.status(404).json(error);
    }
}

async function findUser(req,res,next){
    try{
        const user = await User.findAll({
            where:{id:req.params.id}
        });//await sequelize.query(`SELECT * FROM users WHERE id = '${req.params.id}'`);
        return res.status(200).json(user[0].dataValues);
    }catch(error){
        return res.status(404).json(error);
    }
}

async function checkLogin(req,res,next){
    try{
        let user = await User.findAll({where:{pseudo:req.params.username}});//await sequelize.query(`SELECT * FROM users WHERE id = '${req.params.id}'`);
        if(user.length <= 0)throw new Error("User not found");
        else{
            user = user[0].dataValues
            let pass = user.password;
            bcrypt.compare(req.params.password,pass)
            .then(valid=>{
                if(valid){
                    res.status(200).json(user);
                }
                else{
                    return res.status(404).json({message:"Mot de passe invalide"});
                }
            })
            .catch(error=>{
                return res.status(404).json(error);
            })
        }
    }catch(error){
        return res.status(404).json(error);
    }
}

async function addUser(req,res,next){
    try{
        bcrypt.hash(req.body.password.toString(),10)
        .then(async hash=>{
            console.log(hash);
            const user = await User.create({
                pseudo:req.body.username,
                password:hash
            });//await sequelize.query(`INSERT INTO user (pseudo,password) VALUES ('${req.body.username}','${hash}')`);
            return res.status(201).json({message:"Utilisateur ajouté",username:req.body.username,password:hash});
        })
        .catch(error=>{
            console.log(error);
            return res.status(404).json(error);
        })
    }catch(error){
        return res.status(404).json(error);
    }
}

module.exports = {getUsers,addUser,findUser,checkLogin};