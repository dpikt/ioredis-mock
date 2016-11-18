'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.discard = discard;
function discard() {
  this.batch.length = 0;

  return 'OK';
}