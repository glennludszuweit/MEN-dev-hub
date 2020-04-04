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

module.exports = {
  indexPage: (req, res) => {
    res.render("index");
  },

  showCourses: (req, res) => {
    res.render("courses", {
      offeredCourses: courses
    });
  }
};
