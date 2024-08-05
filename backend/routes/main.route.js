const express = require("express");
const router = express.Router();
const {setNewTask,getAssignedTasks,findAssignedTasks,updateTask,deleteTask,singleAssignedTasks,toggleCompletion} = require("../controllers/main.controller");

router.post("/",(req,res,next)=>setNewTask(req,res,next));
router.get("/",(req,res,next)=>getAssignedTasks(req,res,next));
router.get("/:id",(req,res,next)=>findAssignedTasks(req,res,next));
router.put("/:id/:task",(req,res,next)=>updateTask(req,res,next));
router.put("/:id/:task/toggle",(req,res,next)=>toggleCompletion(req,res,next));
router.get("/:id/:task",(req,res,next)=>singleAssignedTasks(req,res,next));
router.delete("/:id/:task",(req,res,next)=>deleteTask(req,res,next));

module.exports = router;