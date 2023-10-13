const User = require("../models/User");
const BaseAuth = require("./base");

class JWTAuth extends BaseAuth {
  async getUser(req) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      if (token) {
        const _user = User.parseTokenSafe(token);
        if (!_user) return null;
        const user = this.exclude(_user, ["password"]);
        return user;
      }
    }
  }
}

module.exports = JWTAuth;
