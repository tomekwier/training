var heroin = require('heroin-js');

var configurator = heroin(process.env.HEROKU_API_TOKEN);

configurator.export('training-tomek').then((result) => {
    console.log(result);
});
