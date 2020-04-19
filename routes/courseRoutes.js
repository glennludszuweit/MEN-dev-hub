const router = require("express").Router();
const coursesController = require("../controllers/coursesController");
const upload = require("../middlewares/upload");
// const multer = require("multer");
// const upload = multer({ dest: "uploads/" }).single("image");

router.get("/", coursesController.index, coursesController.indexView);
router.get("/new", coursesController.new);
router.post(
  "/create",
  upload.single("image"),
  coursesController.create,
  coursesController.redirectView
);
// router.post("/image", (req, res) => {
//   upload(req, res, (err) => {
//     if (err) {
//       res.status(400).send("Something went wrong!");
//     }
//     res.send(req.file);
//   });
// });
router.get("/:id/edit", coursesController.edit);
router.put(
  "/:id/update",
  coursesController.update,
  coursesController.redirectView
);
router.get("/:id", coursesController.show, coursesController.showView);
router.delete(
  "/:id/delete",
  coursesController.delete,
  coursesController.redirectView
);

module.exports = router;
