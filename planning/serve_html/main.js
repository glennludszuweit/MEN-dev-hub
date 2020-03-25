const port = 3000,
  http = require("http"),
  httpStatus = require("http-status-codes"),
  router = require("./router"),
  fs = require("fs"),
  plainTextContent = {
    "Content-Type": "text/plain"
  },
  htmlTextContent = {
    "Content-Type": "text/html"
  },
  customReadFile = (file, res) => {
    fs.readFile(`./${file}`, (errors, data) => {
      if (errors) {
        console.log("Error reading file...");
      }
      res.end(data);
    });
  };

//routes
router.get("/", (req, res) => {
  res.writeHead(httpStatus.OK, plainTextContent);
  res.end("INDEX");
});

router.get("/index.html", (req, res) => {
  res.writeHead(httpStatus.OK, htmlTextContent);
  customReadFile("views/index.html", res);
});

router.post("/", (req, res) => {
  res.writeHead(httpStatus.OK, plainTextContent);
  res.end("POSTED");
});

//server
http.createServer(router.handle).listen(port);
console.log(`The server is running on port: ${port}`);
