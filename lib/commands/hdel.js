"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hdel = hdel;
function hdel(key) {
  var _this = this;

  for (var _len = arguments.length, fields = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    fields[_key - 1] = arguments[_key];
  }

  return fields.filter(function (field) {
    if ({}.hasOwnProperty.call(_this.data.get(key), field)) {
      delete _this.data.get(key)[field];
      return true;
    }
    return false;
  }).length;
}