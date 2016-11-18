"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hexists = hexists;
function hexists(key, field) {
  return {}.hasOwnProperty.call(this.data.get(key), field) ? 1 : 0;
}