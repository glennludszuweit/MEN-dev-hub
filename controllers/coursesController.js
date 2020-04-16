"use strict";

const Course = require("../models/course");

const getCourseParams = (body) => {
  return {
    title: body.title,
    description: body.description,
    zipCode: body.zipCode,
    maxStudents: body.maxStudents,
    cost: body.cost,
  };
};

module.exports = {
  index: (req, res, next) => {
    Course.find()
      .then((courses) => {
        res.locals.courses = courses;
        next();
      })
      .catch((error) => {
        console.log(`Error fetching courses: ${error.message}`);
        next(error);
      });
  },
  indexView: (req, res) => {
    res.render("courses/index");
  },

  new: (req, res) => {
    res.render("courses/new");
  },

  create: (req, res, next) => {
    let courseParams = getCourseParams(req.body);
    Course.create(courseParams)
      .then((course) => {
        req.flash("success", `${course.title} added!`);
        res.locals.redirect = "/courses";
        res.locals.course = course;
        next();
      })
      .catch((error) => {
        res.locals.redirect = "/courses/new";
        req.flash("error", `Falied: ${error.message}`);
        next();
      });
  },

  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath !== undefined) res.redirect(redirectPath);
    else next();
  },

  show: (req, res, next) => {
    let courseId = req.params.id;
    Course.findById(courseId)
      .then((course) => {
        res.locals.course = course;
        next();
      })
      .catch((error) => {
        console.log(`Error fetching course by ID: ${error.message}`);
        next(error);
      });
  },

  showView: (req, res) => {
    res.render("courses/show");
  },

  edit: (req, res, next) => {
    let courseId = req.params.id;
    Course.findById(courseId)
      .then((course) => {
        res.render("courses/edit", {
          course: course,
        });
      })
      .catch((error) => {
        console.log(`Error fetching course by ID: ${error.message}`);
        next(error);
      });
  },

  update: (req, res, next) => {
    let courseId = req.params.id,
      courseParams = getCourseParams(req.body);

    Course.findByIdAndUpdate(courseId, {
      $set: courseParams,
    })
      .then((course) => {
        req.flash("success", `${course.title} updated!`);
        res.locals.redirect = `/courses/${courseId}`;
        res.locals.course = course;
        next();
      })
      .catch((error) => {
        res.locals.redirect = `/courses/${courseId}/edit`;
        req.flash("error", `Falied: ${error.message}`);
        next();
      });
  },

  delete: (req, res, next) => {
    let courseId = req.params.id;
    Course.findByIdAndRemove(courseId)
      .then(() => {
        req.flash("success", `${course.title} deleted!`);
        res.locals.redirect = "/courses";
        next();
      })
      .catch((error) => {
        console.log(`Error deleting course by ID: ${error.message}`);
        res.locals.redirect = "/courses";
        next();
      });
  },
};
