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
  patchUser: (data, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE user SET ? WHERE user_id = ?",
        [data, id],
        (error, result) => {
          if (!error) {
            const newResult = {
              ...data,
            };
            resolve(newResult);
          } else {
            reject(new Error(error));
          }
        }
      );
    });
  },
  getUserById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM user WHERE user_id = ?",
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  getUserByIdV2: (id) => {
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
        "SELECT friends.friend_id, user.user_name, user.user_email, user.user_image, user.user_phone FROM user JOIN friends ON friends.friend_id = user.user_id WHERE friends.user_id = ?",
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
