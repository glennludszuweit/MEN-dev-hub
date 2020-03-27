const express = require("express");
const app = express();
const port = 3000;
const homeController = require("./controllers/homeController");

//MIDDLEWARE
app.use("/", (req, res, next) => {
  console.log(`Request made to: ${req.url}`);
  next();
});

app.use(
  express.urlencoded({
    extended: false
  })
);

app.use(express.json());

//ROUTE REGISTER
app.post("/", homeController.indexPage);

app.get("/items/:vegetable", homeController.vegetable);

//SERVER
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
