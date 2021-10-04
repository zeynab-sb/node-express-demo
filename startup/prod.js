const helemt = require('helmet');
const compression = require('compression');

module.exports = function(app){
    app.use(helemt());
    app.use(compression());
}