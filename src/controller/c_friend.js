const helper = require("../helper/helper");
const { getUserById } = require("../model/m_user");
const { inviteFriend, checkFriendList } = require("../model/m_friend");

module.exports = {
  inviteFriend: async (request, response) => {
    const { user_id, friend_id } = request.body;
    const setData = {
      user_id: user_id,
      friend_id: friend_id,
    };
    const setData2 = { user_id: friend_id, friend_id: user_id };
    try {
      const checkFriend = await checkFriendList(user_id, friend_id);
      console.log(checkFriend.length);
      if (checkFriend.length >= 1) {
        return helper.response(response, 400, "Friend already added");
      } else {
        const result = await inviteFriend(setData);
        const result2 = await inviteFriend(setData2);
        const result3 = { ...result2, ...result };
        console.log("dibawah");
        console.log(result3);
        return helper.response(
          response,
          200,
          "invite friend success!",
          result3
        );
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request");
    }
  },
};
