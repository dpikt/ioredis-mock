"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sismember = sismember;
function sismember(key, val) {
  return this.data.get(key).has(val) ? 1 : 0;
}