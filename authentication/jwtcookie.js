const User = require("../models/User");
const BaseAuth = require("./base");

class JWTAuthCookies extends BaseAuth {
  async getUser(req) {
    const token = req.cookies.accessToken;
    if (token) {
      const _user = await User.parseTokenSafe(token);
      if (!_user) return null;
      return _user;
    }
  }
}

module.exports = JWTAuthCookies;
