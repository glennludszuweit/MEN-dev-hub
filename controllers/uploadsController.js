const Course = require("../models/course");
const path = require("path");

module.exports = (req, res) => {
  let image = req.files.image;
  image.mv(
    path.resolve(__dirname, "..", "public/img", image.name),
    async (error) => {
      await Course.create({
        ...req.body,
        image: "/img/" + image.name,
        userid: req.session.userId,
      });
      res.redirect("/");
    }
  );
};
