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
};
