const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

aws.config.update({
  secretAccessKey: "X1AqMh/BLIvOLb1C9cY3yDrReDrerGIMEUul500o",
  accessKeyId: "AKIAJRCP63ZL3O2AIWHQ",
  region: "eu-central-1",
});

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "gnglab-devhub",
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
});

// const path = require("path");
// const multer = require("multer");

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     var ext = path.extname(file.originalname);
//     cb(null, Date.now() + ext);
//   },
// });

// var upload = multer({
//   storage: storage,
//   fileFilter: (req, file, cb) => {
//     if (
//       file.mimetype == "image/png" ||
//       file.mimetype == "image/jpg" ||
//       file.mimetype == "image/jpeg" ||
//       file.mimetype == "image/gif"
//     ) {
//       cb(null, true);
//     } else {
//       cb(null, false);
//       //   return cb(new Error("Allowed only .png, .jpg, .jpeg and .gif"));
//       console.log("Allowed only .png, .jpg, .jpeg and .gif");
//     }
//   },
//   limits: {
//     fileSize: 1024 * 1024 * 5,
//   },
// });

module.exports = upload;
