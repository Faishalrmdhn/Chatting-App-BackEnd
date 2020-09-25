const jwt = require("jsonwebtoken");
const helper = require("../helper/helper");

module.exports = {
  authorization: (request, response, next) => {
    let token = request.headers.authorization;
    if (token) {
      token = token.split(" ")[1];
      // console.log(token)
      jwt.verify(token, "SECRET", (error, result) => {
        if (
          (error && error.name === "JsonWebTokenError") ||
          (error && error.name === "TokenExpiredError")
        ) {
          return helper.response(response, 403, error.message);
        } else {
          request.token = result;
          next();
        }
      });
    } else {
      return helper.response(response, 400, "Please login first!");
    }
  },
  authorizationUser: (request, response, next) => {
    let token = request.headers.authorization;
    if (token) {
      token = token.split(" ")[1];
      jwt.verify(token, "SECRET", (error, result) => {
        if (
          (error && error.name === "JsonWebTokenError") ||
          (error && error.name === "TokenExpiredError")
        ) {
          return helper.response(response, 403, error.message);
        } else {
          if (result.role !== 1) {
            return helper.response(
              response,
              403,
              "You don't have permission to access this feature"
            );
          } else {
            request.token = result;
            next();
          }
        }
      });
    } else {
      return helper.response(response, 403, "Please login first");
    }
  },
};
