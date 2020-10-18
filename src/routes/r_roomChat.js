const router = require("express").Router();
const {
  getAllRoom,
  getRoomById,
  postRoom,
  postChat
} = require("../controller/c_roomChat");

router.post("/chat", getAllRoom);
router.post("/chat/by-id", getRoomById);
router.post("/post", postRoom);
router.post('/chatting', postChat)

module.exports = router;
