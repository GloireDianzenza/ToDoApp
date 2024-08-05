const express = require("express");
const router = express.Router();
const {getStatus,completedBooleanValue} = require("../controllers/completed.controller");

router.get("/",(req,res,next)=>getStatus(req,res,next));
router.get("/:title",(req,res,next)=>completedBooleanValue(req,res,next));

module.exports = router;