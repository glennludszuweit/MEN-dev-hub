"use strict";

const Course = require("../models/course");
const User = require("../models/user");
const httpStatus = require("http-status-codes");

const getCourseParams = (body) => {
  return {
    title: body.title,
    description: body.description,
    author: body.author,
    embedUrl: body.embedUrl,
  };
};

module.exports = {
  index: (req, res, next) => {
    Course.find()
      .sort({ _id: -1 })
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
    if (req.query.format === "json") {
      res.json(res.locals.courses);
    } else {
      res.render("courses/index");
    }
  },

  new: (req, res) => {
    res.render("courses/new");
  },

  create: (req, res, next) => {
    let courseParams = getCourseParams(req.body);
    if (req.file) {
      courseParams.image = req.file.path;
    }
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

  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath !== undefined) res.redirect(redirectPath);
    else next();
  },

  respondJSON: (req, res) => {
    res.json({
      status: httpStatus.OK,
      data: res.locals,
    });
  },

  errorJSON: (error, req, res, next) => {
    let errorObject;
    if (error) {
      errorObject = {
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    } else {
      errorObject = {
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: "Error Unknown",
      };
    }
    res.json(errorObject);
  },

  join: (req, res, next) => {
    let courseId = req.params.id;
    let currentUser = req.user;
    if (currentUser) {
      User.findByIdAndUpdate(currentUser, {
        $addToSet: {
          courses: courseId,
        },
      })
        .then((course) => {
          req.flash("success", "Proceed to you profile to check courses!");
          res.locals.success = true;
          next();
        })
        .catch((error) => {
          req.flash("danger", "Please Login to Join!");
          next(error);
        });
    } else {
      next(new Error("User must be logged in."));
    }
  },

  filterUserCourses: (req, res, next) => {
    let currentUser = res.locals.currentUser;
    if (currentUser) {
      let mappedCourses = res.locals.courses.map((course) => {
        let userJoined = currentUser.courses.some((userCourse) => {
          return userCourse.equals(course._id);
        });
        return Object.assign(course.toObject(), {
          joined: userJoined,
        });
      });
      res.locals.courses = mappedCourses;
      next();
    } else {
      next();
    }
  },
};
