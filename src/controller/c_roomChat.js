const helper = require("../helper/helper");
const { getAllRoom, getRoomById, postRoom, checkRooms, checkRoomById, getChatByUserId,getMessageChatByRoom, postChat } = require("../model/m_roomChat");
const {getUserById} = require('../model/m_user')
module.exports = {
  getAllRoom: async (request, response) => {
    const { user_id } = request.body;
    // const setData = {
    //   user_id: user_id,
    //   friend_id: friend_id,
    // };
    // const setData2 = {
    //   user_id: friend_id,
    //   friend_id: user_id,
    // };
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
      room_chat_id: key,
    };
    const setData2 = {
      user_id: friend_id,
      friend_id: user_id,
      room_chat_id: key,
    };
    console.log(setData)
    console.log(setData2)
    try {
      const checkRoom = await checkRooms(user_id, friend_id)
      console.log(checkRoom.length)
      // console.log(result)
      // console.log(result2)
      if (checkRoom.length > 0) {
      
        return helper.response(response, 404, 'You already have this room chat for this user! ')
      } else {
        const result = await postRoom(setData);
        const result2 = await postRoom(setData2);
        const resultPost = { ...result, ...result2 };
        console.log(resultPost);
        return helper.response(response, 200, "Success post Room!", resultPost);
      }

    } catch (error) {
      return helper.response(response, 400, "Bad Request");
    }
  },
  postChat: async (request, reponse) => {
    const { user_id, friend_id, room_chat_id, chat } = request.body
    if (chat === "") {
      return helper.response(response, 400, "Input Your Message");
    } else if (user_id === friend_id) {
      return helper.response(response, 400, "Failed");
    }
    try {
      const checkRoom = await checkRoomById(room_chat_id)
      const setData = {
        room_chat_id: checkRoom[0].room_chat_id,
        user_id,
        friend_id,
        chat,
      };
      const result = await postChat(setData)
      return helper.response(response, 200, "Success send chat", result)
    } catch (error) {
      console.log(error)
      return helper.response(response, 404, "Bad Request", error);
    }
  },
  getRoomChat: async (request, response) => {
    const {id} = request.params
    const checkRoom = await checkRoomById(id)
    // console.log(checkRoom)
    if (checkRoom.length > 0) {
      const getData = await getChatByUserId(id);

      for (i = 0; i < getData.length; i++) {
        const getSender = await getUserById(getData[i].user_id);
        getData[i].sender = getSender[0].user_name;
      }
console.log(checkRoom)
      checkRoom[0].chat = getData;
      return helper.response(
        response,
        200,
        `Success get room chat by ID ${id}`,
        checkRoom
      );
    }
    try {
      const resultGetRoom = await getAllRoom(user_id);
      // console.log(resultGetRoom);
      return helper.response(response, 200, "Success Get Room!", resultGetRoom);
    } catch (error) {
      return helper.response(response, 400, "Bad Request");
    }
  },
};
