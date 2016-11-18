'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hincrby = hincrby;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function hincrby(key, field) {
  var increment = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

  if (!this.data.has(key)) {
    this.data.set(key, _defineProperty({}, field, '0'));
  }
  if (!{}.hasOwnProperty.call(this.data.get(key), field)) {
    this.data.get(key)[field] = '0';
  }
  var curVal = Number(this.data.get(key)[field]);
  var nextVal = curVal + parseInt(increment, 10);
  this.data.get(key)[field] = nextVal.toString();
  return nextVal;
}