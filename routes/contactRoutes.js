const router = require("express").Router();
const subscribersController = require("../controllers/subscribersController");

router.get("/contact", subscribersController.contact);
router.post(
  "/send",
  subscribersController.send,
  subscribersController.redirectView
);

module.exports = router;
