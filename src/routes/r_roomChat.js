const router = require("express").Router();
const { getAllRoom, getRoomById } = require("../controller/c_roomChat");

router.post("/chat", getAllRoom);
// router.post("/chat/by-id", getRoomById);

module.exports = router;
