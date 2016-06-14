var heroin = require('heroin-js');
var _ = require('lodash');
var base = require('./base');

var prod = {
    name: 'training-tomek'
};

var prod_merged = _.merge(base.base, prod);

base.configurator(prod_merged);
