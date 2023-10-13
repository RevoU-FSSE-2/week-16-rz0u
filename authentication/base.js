class BaseAuth {
  async getUser(req) {
    return null;
  }
  async authenticate(req, res, next) {
    if (!req.user) {
      const user = await this.getUser(req);
      if (user) {
        req.user = user;
      }
    }
  }
  exclude(user, keys) {
    return Object.fromEntries(
      Object.entries(user).filter(([key]) => !keys.includes(key))
    );
  }
}

module.exports = BaseAuth;
