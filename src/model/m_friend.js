const connection = require("../config/mysql");

module.exports = {
  inviteFriend: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO friends SET ?",
        setData,
        (error, result) => {
          if (!error) {
            const newResult = {
              id: result.insertId,
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
  checkFriendList: (user_id, friend_id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM friends WHERE user_id = ${user_id} and friend_id = ${friend_id}`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  getFriendById: (id, friend_id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT friends.friend_id, user.user_name,user.user_phone, user.user_bio,user.profileImage FROM friends JOIN user ON friends.friend_id = user.user_id WHERE friends.user_id = ${id} AND friends.friend_id = ${friend_id}`,
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
};
