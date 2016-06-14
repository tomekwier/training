var heroin = require('heroin-js');
var _ = require('lodash');
var base = require('./base');

var test = {
    name: 'training-tomek-test'
};

var test_merged = _.merge(base.base, test);

base.configurator(test_merged);
