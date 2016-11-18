"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hget = hget;
function hget(key, hashKey) {
  return this.data.get(key)[hashKey];
}