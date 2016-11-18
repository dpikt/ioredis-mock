"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lpop = lpop;
function lpop(key) {
  if (this.data.has(key) && !(this.data.get(key) instanceof Array)) {
    throw new Error("Key " + key + " does not contain a list");
  }
  var list = this.data.get(key) || [];

  return list.length > 0 ? list.shift() : null;
}