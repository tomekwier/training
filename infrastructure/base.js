var heroin = require('heroin-js');

var configurator = heroin(process.env.HEROKU_API_TOKEN);

var base = {
    region: 'eu',
    maintenance: false,
    stack: 'cedar-14',
    config_vars: {NODE_ENV: 'production'},
    addons: { mongolab: { plan: 'mongolab:sandbox' } },
    collaborators: [ 'tomasz.wiercioch@gmail.com' ],
    features:
    { 'runtime-dyno-metadata': { enabled: false },
        'log-runtime-metrics': { enabled: false },
        'http-session-affinity': { enabled: false },
        preboot: { enabled: false },
        'http-shard-header': { enabled: false },
        'http-end-to-end-continue': { enabled: false },
        'http-sni': { enabled: false } },
    formation: [ { process: 'web', quantity: 1, size: 'Free' } ],
    log_drains: []
};

module.exports = {
    base: base,
    configurator: configurator
};
