const router = require("express").Router();
const homeController = require("../controllers/homeController");
const usersController = require("../controllers/usersController");

router.get("/", homeController.index);
router.get("/chat", usersController.index, homeController.chat);

module.exports = router;
