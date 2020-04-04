const mongoose = require("mongoose");
const Subscriber = require("./models/subscriber");
const Course = require("./models/course");

var testCourse;
var testSubscriber;

mongoose.connect("mongodb://localhost:27017/kitchenhub", {
  useNewUrlParser: true
});

mongoose.Promise = global.Promise;

Subscriber.remove({})
  .then(items => {
    console.log(`Removed ${items.n} records!`);
  })
  .then(() => {
    return Course.remove({});
  })
  .then(items => {
    console.log(`Removed ${items.n} records!`);
  })
  .then(() => {
    return Subscriber.create({
      name: "Jon",
      email: "j.wexler@email.com",
      telNumber: "01714721068"
    });
  })
  .then(subscriber => {
    console.log(`Created Subscriber: ${subscriber.getInfo()}`);
  })
  .then(() => {
    return Subscriber.findOne({ name: "Jon" });
  })
  .then(subscriber => {
    testSubscriber = subscriber;
    console.log(`Found one Subscriber: ${subscriber.getInfo()}`);
  })
  .then(() => {
    return Course.create({
      title: "Persian Omelete",
      description: "Learn to cook Persians favourite breakfast",
      items: "Tomatoes, Eggs, Garlic, Onions, Mayonaise, Salt and Pepper",
      telNumber: "01714721068",
      address: "London, UK"
    });
  })
  .then(course => {
    testCourse = course;
    console.log(`Created course: ${course.title}`);
  })
  .then(() => {
    testSubscriber.courses.push(testCourse);
    testSubscriber.save();
  })
  .then(() => {
    return Subscriber.populate(testSubscriber, "courses");
  })
  .then(subscriber => console.log(subscriber))
  .then(() => {
    return Subscriber.find({
      courses: mongoose.Types.ObjectId(testCourse._id)
    });
  })
  .then(subscriber => console.log(subscriber));
