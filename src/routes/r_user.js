const router = require("express").Router();
const {
  registerUser,
  loginUser,
  forgotPassword,
  updatePassword,
  getUserById,
  patchDataUser,
  getUserByName,
  getUserByEmail,
  getUserFriend,
  patchImageUser
} = require("../controller/c_user");

const uploadImage = require("../middleware/multer");
const { authorization } = require("../middleware/auth");

router.get("/:id", getUserById);
// router.get('/name')
router.get("/search/email", getUserByEmail);
router.post("/search/friendlist", getUserFriend);
router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/forgot-password", forgotPassword);
router.patch("/update-password", updatePassword);
router.patch("/:id", patchDataUser);
router.patch('/image/:id', uploadImage, patchImageUser)

module.exports = router;
