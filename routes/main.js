const express = require("express");
const router = express.Router();
const controllers = require("../controllers/main")

router.route("/login").post(controllers.login);
router.route("/dashboard").get(controllers.dashboard);


module.exports = router