const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class Post {
  static async create({ title, description }) {
    return await prisma.post.create({
      data: { title, description },
    });
  }
  static async get(fieldValuePair, options) {
    return await prisma.post.findUnique({ where: fieldValuePair, ...options });
  }
  static async update(id, updatedFields) {
    return await prisma.post.update({
      where: { id },
      data: updatedFields,
    });
  }
  static async delete(id) {
    return await prisma.post.delete({
      where: { id },
    });
  }
}

module.exports = Post;
