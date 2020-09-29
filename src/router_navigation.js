const route = require("express").Router();

const user = require("./routes/r_user");
const friend = require("./routes/r_friend");
const room = require("./routes/r_roomChat");

route.use("/user", user);
route.use("/friend", friend);
route.use("/room", room);

module.exports = route;
