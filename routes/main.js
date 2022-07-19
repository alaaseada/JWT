const express = require("express");
const router = express.Router();
const controllers = require("../controllers/main");
const authMiddleware = require("../middleware/auth")

router.route("/login").post(controllers.login);
router.route("/dashboard").get(authMiddleware, controllers.dashboard);


module.exports = router