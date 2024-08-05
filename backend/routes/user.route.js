const express = require("express");
const router = express.Router();
const {getUsers,addUser,findUser,checkLogin} = require("../controllers/user.controller");

router.get("/",(req,res,next)=>getUsers(req,res,next));
router.post("/",(req,res,next)=>addUser(req,res,next));
router.get("/:id",(req,res,next)=>checkLogin(req,res,next));

module.exports = router;