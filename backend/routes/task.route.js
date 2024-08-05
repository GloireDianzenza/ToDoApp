const express = require("express");
const router = express.Router();
const {getTasks,findTask,addTask,updateTask,deleteTask} = require("../controllers/task.controller");

router.get("/",(req,res,next)=>getTasks(req,res,next));
router.post("/",(req,res,next)=>addTask(req,res,next));
router.put("/:id",(req,res,next)=>updateTask(req,res,next));
router.delete("/:id",(req,res,next)=>deleteTask(req,res,next));
router.get("/:id",(req,res,next)=>findTask(req,res,next));

module.exports = router;