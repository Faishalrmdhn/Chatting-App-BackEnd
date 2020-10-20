const router = require("express").Router();

const { inviteFriend , getFriendById} = require("../controller/c_friend");
const { get } = require("./r_user");

router.get('/:id', getFriendById)
router.post("/invite", inviteFriend);


module.exports = router;
