const router = require("express").Router();

const { inviteFriend } = require("../controller/c_friend");

router.post("/invite", inviteFriend);

module.exports = router;
