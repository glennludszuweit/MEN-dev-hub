const router = require("express").Router();

const userRoutes = require("./userRoutes");
const subscriberRoutes = require("./subscriberRoutes");
const courseRoutes = require("./courseRoutes");
const apiRoutes = require("./apiRoutes");
const contactRoutes = require("./contactRoutes");
const homeRoutes = require("./homeRoutes");
const errorRoutes = require("./errorRoutes");

router.use("/users", userRoutes);
router.use("/subscribers", subscriberRoutes);
router.use("/courses", courseRoutes);
router.use("/api", apiRoutes);
router.use("/", contactRoutes);
router.use("/", homeRoutes);
router.use("/", errorRoutes);

module.exports = router;
