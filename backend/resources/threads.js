/*
Returns the number of logical cores to be used by the application
*/

const os = require('os');
var numberOfLogicalCores = os.cpus().length;
var fractionOfLogicalCoresUsed = 0.75;

module.exports = {
    numberOfLogicalCores: numberOfLogicalCores,
    fractionOfLogicalCoresUsed: fractionOfLogicalCoresUsed
};