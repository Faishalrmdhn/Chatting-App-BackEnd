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
        "SELECT DISTINCT room.room_id, room.room_chat_id, room.user_id, room.friend_id , user.user_name,user.profileImage FROM room JOIN user ON room.friend_id = user.user_id where room.user_id = ?",
        user_id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  getRoomById: (user_id, friend_id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT DISTINCT room.room_id, room.room_chat_id, room.user_id, room.friend_id , user.user_name,user.profileImage FROM room JOIN user ON room.friend_id = user.user_id where room.user_id = ${user_id} and room.friend_id = ${friend_id}`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  checkRooms: (user_id, friend_id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * from room where user_id = ${user_id} and friend_id = ${friend_id}`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  checkRoomById: (room_chat_id) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * from room where room_chat_id = ${room_chat_id} `, (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  },
  getChatByUserId: (room_chat_id) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * from chat where room_chat_id = ${room_chat_id} `, (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  },
  getChatByRoomId: (room_chat_id) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * from chat where room_chat_id = ${room_chat_id} `, (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  },
  postChat: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO chat SET ?",
        setData,
        (error, result) => {
          if (!error) {
            const newResult = {
              chat_id: result.insertId,
              ...setData,
            };
            resolve(newResult);
          } else {
            reject(new Error(error));
          }
        }
      );
    });
  },
  getLastChat: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        `select * from chat where chat_id in
        (select max(chat_id) from chat group by room_chat_id)`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      );
    });
  },
};
