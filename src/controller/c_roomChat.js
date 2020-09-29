const helper = require("../helper/helper");
const { getAllRoom, getRoomById, postRoom } = require("../model/m_roomChat");

module.exports = {
  getAllRoom: async (request, response) => {
    const { user_id, friend_id } = request.body;
    const setData = {
      user_id: user_id,
      friend_id: friend_id,
    };
    const setData2 = {
      user_id: friend_id,
      friend_id: user_id,
    };
    try {
      const resultGetRoom = await getAllRoom(user_id);
      // console.log(resultGetRoom);
      return helper.response(response, 200, "Success Get Room!", resultGetRoom);
    } catch (error) {
      return helper.response(response, 400, "Bad Request");
    }
  },
  getRoomById: async (request, response) => {
    const { user_id, friend_id } = request.body;

    const setData = {
      user_id: user_id,
      friend_id: friend_id,
    };
    const setData2 = {
      user_id: friend_id,
      friend_id: user_id,
    };

    try {
      const resultGetRoom = await getRoomById(user_id, friend_id);
      // console.log(resultGetRoom);
      console.log(resultGetRoom);
      return helper.response(response, 200, "Success Get Room!", resultGetRoom);
    } catch (error) {
      return helper.response(response, 400, "Bad Request");
    }
  },
  postRoom: async (request, response) => {
    const { user_id, friend_id } = request.body;
    const uniqueKey = Math.round(Math.random() * 10000);
    const key = uniqueKey;
    const setData = {
      user_id: user_id,
      friend_id: friend_id,
      room_chat_id: uniqueKey,
    };
    const setData2 = {
      user_id: friend_id,
      friend_id: user_id,
      room_chat_id: uniqueKey,
    };

    try {
      const result = await postRoom(setData);
      const result2 = await postRoom(setData2);
      const resultPost = { ...result, ...result2 };
      console.log(resultPost);
      return helper.response(response, 200, "Success post Room!", resultPost);
    } catch (error) {
      return helper.response(response, 400, "Bad Request");
    }
  },
};
