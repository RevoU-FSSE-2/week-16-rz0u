const User = require("../models/User");
const cache = require("memory-cache");

const sendEmail = (email, key) => {
  console.log(`Subject: Password reset request`);
  console.log(`To: ${email}`);
  console.log(`Body: Click following, http://localhost:3000/reset?key=${key}`);
};

// Login with cookie
exports.login_session = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.get({ username: username });
  const isAuth = await User.authenticate(user.username, password);
  if (!user || !isAuth) {
    res.status(401).json({ error: "Invalid username or password" });
    return;
  }
  const { accessToken, expireAt, refreshToken } = await User.generateToken(
    user
  );
  res.cookie("accessToken", accessToken, { httpOnly: true, expire: expireAt });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    expire: expireAt,
  });
  res.json();
};

// Login
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.get({ username });
  const is_authenticated = await User.authenticate(username, password);
  if (!user || !is_authenticated) {
    res.status(401).json({ error: "Invalid username or password" });
    return;
  }
  const responseToken = await User.generateToken(user);
  res.json(responseToken);
};

// Register
exports.registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;
  const user = await User.create({ username, email, password, role });
  const responseToken = User.generateToken(user);
  res.status(201).json(responseToken);
};

// Reset password
exports.passwordResetRequest = async (req, res) => {
  const { email } = req.body;
  const user = await User.get({ email: email });
  if (!user) {
    res.status(400).json({ error: "Encountered Error" });
    return;
  }
  const key = Math.random().toString(36).substring(2, 15);
  cache.put(key, user.email, 5 * 60 * 1000);
  sendEmail(user.email, key);
  res.json({ message: "Password reset email sent" });
};
exports.passwordReset = async (req, res) => {
  const { password } = req.body;
  const { key } = req.query;
  const email = cache.get(key);
  if (!email) {
    res.status(400).json({ error: "Invalid token" });
    return;
  }
  const user = await User.get({ email: email });
  if (!user) {
    res.status(400).json({ error: "Encountered Error" });
    return;
  }

  await User.update(user.id, { password: User.make_password(password) });
  // jika sukses kunci dihapus
  cache.del(key);
  res.json({ message: "Password reset success" });
};

// Logout delete cookie
exports.logout_session = async (req, res) => {
  res.clearCookie("accesToken");
  res.clearCookie("refreshToken");
  res.json({ message: "Logged out" });
};
