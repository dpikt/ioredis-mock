'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bufsToString = bufsToString;
exports.nonBufsToString = nonBufsToString;
exports.stringsToBuf = stringsToBuf;

var _lodash = require('lodash');

function bufsToString(value) {
  if ((0, _lodash.isBuffer)(value)) {
    return value.toString();
  }
  if ((0, _lodash.isArray)(value)) {
    return value.map(function (val) {
      return (0, _lodash.isBuffer)(val) ? val.toString() : val;
    });
  }
  return value;
}

function nonBufsToString(values) {
  return values.map(function (value) {
    return (0, _lodash.isBuffer)(value) ? value : value && value.toString();
  });
}

function stringsToBuf(value) {
  if ((0, _lodash.isString)(value)) {
    return Buffer.from(value);
  }
  if ((0, _lodash.isArray)(value)) {
    return value.map(function (val) {
      return (0, _lodash.isString)(val) ? Buffer.from(val) : val;
    });
  }
  return value;
}