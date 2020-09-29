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
};
