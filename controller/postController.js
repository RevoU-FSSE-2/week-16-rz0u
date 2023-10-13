const Post = require("../models/Post");

exports.createPost = async (req, res) => {
  const { title, content } = req.body;
  const post = await Post.create({ title, content });
  post.authorId = req.user.id;
  await post.save();
  res.status(201).json(post);
};

exports.getPosts = async (req, res) => {
  let query = {};
  if (req.user.role === "User") {
    query = { authorId: req.user.id };
  }
  const posts = await Post.get(query, { include: "author" });
  res.status(200).json(posts);
};

exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const updatedFields = { title, content };
  const post = await Post.get({ id });
  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }
  if (post.authorId !== req.user.id) {
    return res.status(403).json({ error: "Unauthorized" });
  }
  const updatedPost = await Post.update(id, updatedFields);
  res.status(200).json(updatedPost);
};

exports.deletePost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.get({ id });
  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }
  if (req.user.role !== "Publisher") {
    return res.status(403).json({ error: "Unauthorized" });
  }
  await Post.delete(id);
  res.status(204).end();
};
