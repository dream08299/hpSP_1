var rp = require('request-promise');
var infoCache =  require('./infoCache');




module.exports = new Promise(function(resolve, reject) {

    var options = {
        uri :infoCache.get('Location'),
        proxy:'http://@127.0.0.1:8888',
        rejectUnauthorized: false,
        resolveWithFullResponse: true
    };

    if(infoCache.get('jssession') == null){
        rp(options).then(function(response){
            /flowurl.*\'(.*)\'/gi.test(response.body);
            console.log( RegExp.$1)
            infoCache.set('flowurl', RegExp.$1);
            /ucUiFlowIdStr.*\'(.*)\'/gi.test(response.body);
            infoCache.set('ucUiFlowIdStr', RegExp.$1);
            console.log(RegExp.$1);
            /currentPageFormKey.*\'(.*)\'/gi.test(response.body);
            infoCache.set('currentPageFormKey', RegExp.$1);
            console.log(RegExp.$1);
            /stepId.*\'(.+)\'/gi.test(response.body);
            infoCache.set('stepId', RegExp.$1);
            console.log(RegExp.$1)
            resolve('getUcUiFlowIDStr successed');
        }).catch(function(response){

        })
    }

});