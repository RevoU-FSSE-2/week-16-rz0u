const { PrismaClient } = require("@prisma/client");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const prisma = new PrismaClient();

class User {
  static async create({ username, email, password }) {
    return await prisma.user.create({
      data: { username, email, password: this.make_password(password) },
    });
  }
  static async get(fieldValuePair, options) {
    return await prisma.user.findUnique({ where: fieldValuePair, ...options });
  }
  static async update(id, updatedFields) {
    return await prisma.user.update({
      where: { id },
      data: updatedFields,
    });
  }
  static make_password(password) {
    return CryptoJS.PBKDF2(password, process.env.SECRET, {
      keySize: 256 / 32,
      iterations: 1000,
    }).toString();
  }
  static async authenticate(username, rawPassword) {
    const user = await this.get({ username });
    if (!user) return false;
    const hashedPassword = this.make_password(rawPassword);
    return user.password === hashedPassword;
  }
  static async generateToken(user) {
    const expireAt = Math.floor(Date.now() / 1000 + 60 * 3); // 3 minutes expire time
    const accessToken = jwt.sign({ id: user.id }, process.env.SECRET, {
      expiresIn: expireAt,
    });
    const refreshToken = jwt.sign({ id: user.id }, process.env.SECRETREFRESH, {
      expiresIn: "7d",
    });
    return { accessToken, refreshToken, expireAt };
  }
  static async parseToken(token) {
    const { id } = jwt.verify(token, process.env.SECRET);
    return await this.get({ id }, options);
  }
  static async parseTokenSafe(token, options) {
    try {
      return await this.parseToken(token, options);
    } catch (error) {
      return null;
    }
  }
}

module.exports = User;
