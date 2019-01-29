'use strict';

module.exports = {
    Gibbons: require('./lib/gibbons'),
    GibbonAdapter: require('./lib/adapters/gibbon-adapter.mjs'),
    Gibbon: require('./lib/gibbon.mjs'),
    GibbonProcessor: require('./lib/gibbon-processor.mjs').GibbonProcessor
};
