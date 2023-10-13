const express = require("express");
const app = express();
const applyMiddleware = require("./middleware");
const userRouter = require("./routes/userRoutes");
const postRouter = require("./routes/postRoutes");

applyMiddleware(app);

app.use("/api/user", userRouter);
app.use("/api", postRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("app running on port 3000");
});
