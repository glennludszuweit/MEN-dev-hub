const router = require("express").Router();
const usersController = require("../controllers/usersController");
const coursesController = require("../controllers/coursesController");

router.get("/", usersController.index, usersController.indexView);
router.get("/new", usersController.new);
router.post(
  "/create",
  usersController.validate,
  usersController.create,
  usersController.redirectView
);
router.get("/login", usersController.login);
router.post("/login", usersController.authenticate);
router.get("/logout", usersController.logout, usersController.redirectView);
router.get("/:id/edit", usersController.edit);
router.put("/:id/update", usersController.update, usersController.redirectView);
router.get("/:id", usersController.show, usersController.showView);
router.delete(
  "/:id/delete",
  usersController.delete,
  usersController.redirectView
);
router.put("/removeCourse", (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.params.id },
    { $pull: { courses: { _id: req.params.id } } }
  );
  res.end();
});

module.exports = router;
