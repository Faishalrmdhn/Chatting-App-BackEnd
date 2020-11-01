require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const routerNavigation = require("./src/router_navigation");

const app = express();
const socket = require("socket.io");
app.use(cors());

const http = require("http");
const server = http.createServer(app);
const io = socket(server);

io.on("connection", (socket) => {
  console.log("Socket.io Connect !");
//=====================================================
  socket.on('setRoom', (data)=>{
    socket.join(data.room_chat_id)
    console.log('roomAwwal')
    console.log(data)
  })

  socket.on("changeRoom", (data)=>{
    socket.leave(data[1])
    socket.join(data[0])
    console.log('room baru')
    console.log(data)
  })

  socket.on("roomMessage", (data) => {
    socket.join(data.room_chat_id);
    socket.leave()
    io.to(data.room_chat_id).emit("chatMessage", data);
    console.log(data)
  });
});
// =======================================
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(express.static("uploads"));
app.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Request-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use("/", routerNavigation);
app.get("*", (request, response) => {
  response.status(404).send("Path Not Found");
});

server.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
