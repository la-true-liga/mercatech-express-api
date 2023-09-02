"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _dotenv = require("dotenv");
(0, _dotenv.config)();
var _default = {
  secret: process.env.SECRET,
  email: process.env.EMAil,
  email_pass: process.env.EMAIL_PASS
};
exports["default"] = _default;