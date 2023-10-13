const postController = require("../controller/postController");
const permission = require("../permission");
const { Router } = require("express");
const postRouter = Router();

postRouter.post(
  "/books",
  permission.is_authenticated,
  postController.createPost
);
postRouter.get("/books", permission.is_authenticated, postController.getPosts);
postRouter.patch(
  "/books",
  permission.is_authenticated,
  postController.getPosts
);
postRouter.delete(
  "/books",
  permission.is_authenticated,
  postController.getPosts
);

module.exports = postRouter;
