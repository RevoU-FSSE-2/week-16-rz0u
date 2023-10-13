const applyHelmet = require("./helmet");
const applyBodyParser = require("./bodyParser");
const applyMorgan = require("./morgan");
const applyAuth = require("./auth");
const applyCookieParser = require("./cookieParser");

module.exports = (app) => {
  applyHelmet(app);
  applyBodyParser(app);
  applyMorgan(app);
  applyCookieParser(app);
  applyAuth(app);
};
