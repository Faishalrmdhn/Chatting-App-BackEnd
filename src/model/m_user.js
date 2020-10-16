const connection = require("../config/mysql");

module.exports = {
  getAllUser: () => {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM user", (error, result) => {
        !error ? resolve(result) : reject(new Error(error));
      });
    });
  },
  postUser: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO user SET ?", setData, (error, result) => {
        if (!error) {
          const newResult = {
            id: result.insertId,
            ...setData,
          };
          delete newResult.user_password;
          resolve(newResult);
        } else {
          reject(new Error(error));
        }
      });
    });
  },
  checkUser: (email) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM user WHERE user_email = ?",
        email,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  checkKey: (keys) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM user WHERE user_key = ?",
        keys,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  patchUser: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE user SET ? WHERE user_id = ?",
        [setData, id],
        (error, result) => {
          if (!error) {
            const newResult = {
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
  // patchUser: (updateData, id) => {
  //   return new Promise((resolve, reject) => {
  //     connection.query(
  //       "UPDATE user SET ? WHERE user_id = ?",
  //       [updateData, id],
  //       (error, result) => {
  //         if (!error) {
  //           const newResult = {
  //             ...updateData,
  //           };
  //           resolve(newResult);
  //         } else {
  //           reject(new Error(error));
  //         }
  //       }
  //     );
  //   });
  // },
  getUserById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM user WHERE user_id = ?",
        id,
        (error, result) => {
          if (!error) {
            delete result[0].user_password;
            resolve(result);
          } else {
            reject(new Error(error));
          }
        }
      );
    });
  },
  searchUserByName: (search) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM user WHERE user_name ${search}`,
        (error, result) => {
          if (!error) {
            delete result[0].user_password;
            resolve(result);
          } else {
            reject(new Error(error));
          }
        }
      );
    });
  },
  searchUserByEmail: (email) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM user WHERE user_name LIKE "%${email}%"`,
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            reject(new Error(error));
          }
        }
      );
    });
  },
  searchUserFriendList: (user_id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT friends.friend_id, user.user_name, user.user_email,  user.profileImage, user.user_phone FROM user JOIN friends ON friends.friend_id = user.user_id WHERE friends.user_id = ?",
        user_id,
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            reject(new Error(error));
          }
        }
      );
    });
  },
};
