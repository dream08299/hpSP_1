var rp = require('request-promise');
var infoCache =  require('./infoCache');

var options = {
    uri : "https://open.zwjk.com/appointment/zjyyAAA?phID=16",
    proxy:'http://@127.0.0.1:8888',
    rejectUnauthorized: false,
    resolveWithFullResponse: true,
    followRedirect : false
};

module.exports = new Promise(function(resolve, reject){

    if(infoCache.get('jssession') == null){
        rp(options).then(function(response){
            // console.log(response);

        }).catch(function(response){
            if(response.statusCode == '302'){
                infoCache.set('JSESSIONID', response.response.headers['set-cookie'][0].split(";")[0].split("=")[1]);
                infoCache.set('Location', response.response.headers['location']);
                console.log('111',infoCache.get('Location'));
                resolve('getJSsession successed');
            }
        });
    };

});