const mongoose = require("mongoose");
const Subscriber = require("./models/Subscriber");

mongoose.connect("mongodb://localhost:27017/kitchenhub", {
  useNewUrlParser: true
});

mongoose.connection;

var contacts = [
  {
    name: "Tony Patterdale",
    email: "t.patterdale@gmail.com",
    telNumber: 01714721068
  },
  {
    name: "Gregg Ludszuweit",
    email: "a.ludszuweit@gmail.com",
    telNumber: 01714721068
  },
  {
    name: "Gregg Allen",
    email: "g.allen@gmail.com",
    telNumber: 01714721068
  }
];

Subscriber.deleteMany()
  .exec()
  .then(() => {
    console.log("Subscribers deleted.");
  });

var commands = [];

contacts.forEach(c => {
  commands.push(
    Subscriber.create({
      name: c.name,
      email: c.email,
      telNumber: c.telNumber
    })
  );
});

Promise.all(commands)
  .then(r => {
    console.log(JSON.stringify(r));
    mongoose.connection.close();
  })
  .catch(error => {
    console.log(`ERROR: ${error}`);
  });
