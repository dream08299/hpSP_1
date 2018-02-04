var rp = require('request-promise');
var infoCache =  require('./infoCache');
var getHostpital =  require('../tools/getHostpital').userNameGetHospInfo;
var hospName = "北京大学口腔医院总院";
var transmitData = require('../tools/transmitData')(hospName);



var options = {
    uri :  "https://open.zwjk.com" +infoCache.get('flowurl') + "&_eventId="+getHostpital(hospName).branchIdentify + "&transmitData="+ encodeURIComponent(transmitData) ,
    proxy:'http://@127.0.0.1:8888',
    rejectUnauthorized: false,
    resolveWithFullResponse: true,
    gzip:true
};

module.exports = new Promise(function(resolve, reject){

        rp(options).then(function(response){
            /executionId.*\'(.*)\'/gi.test(response.body);
            infoCache.set('executionId', RegExp.$1);

            /stepId.*\'(.+)\'/gi.test(response.body);
            infoCache.set('stepId', RegExp.$1);

            /currentPageFormKey.*\'(.*)\'/gi.test(response.body);
            infoCache.set('currentPageFormKey', RegExp.$1);
            resolve('getPartList scuccessed');

        }).catch(function(response){
            console.log(response);
            reject('getPartList failed')
        });

});