const express = require("express");

const app = express();

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
  console.log(req.params);
  console.log(req.body);
  console.log(req.url);
  console.log(req.query);
});
