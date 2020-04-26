module.exports = (io) => {
  io.on("connect", (client) => {
    console.log("User connected");
    client.on("disconnect", () => {
      console.log("User disconnected");
    });
    client.on("message", () => {
      io.emit("message", {
        content: "Hello",
      });
    });
  });
};
