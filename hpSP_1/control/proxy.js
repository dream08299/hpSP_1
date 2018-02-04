var rp = require('request-promise');
var infoCache =  require('./infoCache');

var options = {
    uri : "https://open.zwjk.com/appointment/zjyyAAA?phID=16",
    proxy:'http://@127.0.0.1:8888',
    rejectUnauthorized: false,
    resolveWithFullResponse: true,
    followRedirect : false
};
if(infoCache.get('jssession') == null){
    rp(options).then(function(response){
        console.log(response);

    }).catch(function(response){
        console.log(response.response.caseless);
    })
}