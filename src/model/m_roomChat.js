const connection = require("../config/mysql");

module.exports = {
  postRoom: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO room SET ?", setData, (error, result) => {
        if (!error) {
          const newResult = {
            id: result.insertId,
            ...setData,
          };
          resolve(newResult);
        } else {
          reject(new Error(error));
        }
      });
    });
  },

  getAllRoom: (user_id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT DISTINCT room.room_id, room.room_chat_id, room.user_id, room.friend_id , user.user_name,user.user_image FROM room JOIN user ON room.friend_id = user.user_id where room.user_id = ?",
        user_id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
};