const express = require("express")
const {login, post, signup, list} = require("../Controllers/controller");

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.get("/list", list);


module.exports = router