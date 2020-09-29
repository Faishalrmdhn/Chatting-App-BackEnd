const router = require("express").Router();
const {
  getAllRoom,
  getRoomById,
  postRoom,
} = require("../controller/c_roomChat");

router.post("/chat", getAllRoom);
router.post("/chat/by-id", getRoomById);
router.post("/post", postRoom);

module.exports = router;
