const path = require("path");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    var ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
    // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/gif"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      //   return cb(new Error("Allowed only .png, .jpg, .jpeg and .gif"));
      console.log("Allowed only .png, .jpg, .jpeg and .gif");
    }
  },
  // function(req, res) {
  //   var newItem = new Item();
  //   newItem.img.data = fs.readFileSync(req.files.userPhoto.path);
  //   newItem.img.contentType = `image/png`;
  //   newItem.save();
  // },
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
});

// var upload = multer({ dest: "uploads/" });

module.exports = upload;
