const router = require("express").Router();
const {
  getRoomChat,
  getAllRoom,
  getRoomById,
  postRoom,
  postChat,
} = require("../controller/c_roomChat");


router.get('/roomchat/:id', getRoomChat)
router.post("/all", getAllRoom);
router.post("/chat/by-id", getRoomById);

router.post("/post", postRoom);
router.post('/chatting', postChat)

module.exports = router;
