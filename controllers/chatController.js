"use strict";

module.exports = (io) => {
  io.on("connection", (client) => {
    console.log("new connection");
    client.on("disconnect", () => {
      console.log("user disconnected");
    });
    client.on("message", (data) => {
      let messageAttributes = {
          content: data.content,
          userName: data.userName,
          userId: data.userId,
        },
        m = new Chat(messageAttributes);
      m.save()
        .then(() => {
          io.emit("message", messageAttributes);
        })
        .catch((error) => {
          console.log(`error: ${error.message}`);
        });
    });
  });
};
