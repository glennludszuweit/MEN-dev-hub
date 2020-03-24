const routeMap = {
  "/info": "<h1>Information Page</h1>",
  "/contact": "<h1>Contact Page</h1>",
  "/about": "<h1>About Page</h1>",
  "/error": "<h1>404 Page not Found.</h1>"
};

const port = 3000,
  http = require("http"),
  httpStatus = require("http-status-codes"),
  app = http.createServer((req, res) => {
    res.writeHead(httpStatus.OK, {
      "Content-Type": "text/html"
    });

    if (routeMap[req.url]) {
      res.end(routeMap[req.url]);
    } else {
      res.end("<h1>Welcome</h1>");
    }
  });

app.listen(port);
console.log(`Server started! Listening on port: ${port}`);
