exports.indexPage = (req, res) => {
  console.log(req.body);
  console.log(req.query);
  res.send("POST Successful!");
};

exports.vegetable = (req, res) => {
  let veg = req.params.vegetable;
  res.send(`This page is for ${veg}`);
};
