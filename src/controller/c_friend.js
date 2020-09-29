const helper = require("../helper/helper");
const { getUserById } = require("../model/m_user");
const { inviteFriend } = require("../model/m_friend");

module.exports = {
  inviteFriend: async (request, response) => {
    const { user_id, friend_id } = request.body;
    const setData = {
      user_id: user_id,
      friend_id: friend_id,
    };
    const setData2 = { user_id: friend_id, friend_id: user_id };
    // const setData3 = { ...setData, ...setData2 };
    // const pickUserId = await getUserById(user_id);
    try {
      const result = await inviteFriend(setData);
      const result2 = await inviteFriend(setData2);
      result3 = { ...result, ...result2 };
      console.log(result);
      return helper.response(response, 200, "invite friend success!", result3);

      // return helper.response(response, 200, "invite friend success!", result2);
    } catch (error) {
      return helper.response(response, 400, "Bad Request");
    }
  },
};
