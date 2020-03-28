const httpStatus = require("http-status-codes");

exports.resourceNotFound = (req, res) => {
  let errorCode = httpStatus.NOT_FOUND;
  res.status(errorCode);
  res.sendFile(`./public/${errorCode}.html`, {
    root: "./"
  });
};

exports.internalError = (error, req, res, next) => {
  let errorCode = httpStatus.INTERNAL_SERVER_ERROR;
  console.log(`Error occured: ${error.stack}`);
  res.status(errorCode);
  res.sendFile(`./public/${errorCode}.html`, {
    root: "./"
  });
};

// exports.logErrors = (error, req, res, next) => {
//   console.error(error.stack);
//   next();
// };
