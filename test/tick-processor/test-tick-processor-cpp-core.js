'use strict';
const common = require('../common');

if (common.isWindows ||
    common.isSunOS ||
    common.isAix ||
    common.isLinuxPPCBE ||
    common.isFreeBSD) {
  common.skip('C++ symbols are not mapped for this os.');
  return;
}

if (!common.enoughTestCpu) {
  common.skip('test is CPU-intensive');
  return;
}

const base = require('./tick-processor-base.js');

base.runTest({
  pattern: /MakeContext/,
  code: `function f() {
           require('vm').createContext({});
           setImmediate(function() { f(); });
         };
         f();`
});
