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
} = require("../controller/c_user");

const upload = require("../middleware/multer");
const { authorization } = require("../middleware/auth");

router.get(":id", getUserById);
// router.get('/name')
router.get("/search/email", getUserByEmail);
router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/forgot-password", forgotPassword);
router.patch("/update-password", updatePassword);
router.patch("/:id", upload, patchDataUser);

module.exports = router;
