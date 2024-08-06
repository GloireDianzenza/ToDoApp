const {Sequelize} = require('sequelize');
const sequelize = new Sequelize('test1', 'root', 'rootsqls442@', {
    host: 'localhost',dialect:"mysql"});
const Completed = require("../models/completed.model");
    
async function getStatus(req,res,next){
    try{
        const statuses = await Completed.findAll();//sequelize.query("SELECT title FROM completeds");
        let result = [];
        for(let st of statuses){
            result.push(st.dataValues);
        }
        return res.status(200).json(result);
    }catch(error){
        return res.status(404).json(error);
    }
}
async function completedBooleanValue(req,res,next){
    try{
        const title = req.params.title;
        switch(title){
            case "done":
                return res.status(200).json({value:true})
            case "pending":
                return res.status(200).json({value:false})
            default:
                throw new Error("Invalid value");
        }
    }catch(error){
        return res.status(404).json({error});
    }
}


module.exports = {getStatus,completedBooleanValue};