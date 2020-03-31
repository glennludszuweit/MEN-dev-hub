exports.indexPage = (req, res) => {
  res.render("index");
};

var courses = [
  {
    title: "Event Driven Cakes.",
    cost: 50
  },
  {
    title: "Asychronous Artichokes",
    cost: 50
  },
  {
    title: "Object Oriented Orange Juice",
    cost: 50
  }
];
exports.showCourses = (req, res) => {
  res.render("courses", {
    offeredCourses: courses
  });
};

// exports.showSignUp = (req, res) => {
//   res.render("contact");
// };

// exports.postedSignUpForm = (req, res) => {
//   res.render("thanks");
// };
