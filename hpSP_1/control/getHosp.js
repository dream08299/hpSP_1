var rp = require('request-promise');
var infoCache =  require('./infoCache');
var getHostpital =  require('../tools/getHostpital').setGetHospitalHeader();





module.exports = new Promise(function(resolve, reject) {
    var options = {
        uri :"https://api.zwjk.com/export/ui/branch/list_1_1_1?executionId=&pageFormKey="+infoCache.get('currentPageFormKey')+"&ucUiFlowId="+infoCache.get('ucUiFlowIdStr')+"&stepId="+infoCache.get('stepId'),
        headers:getHostpital,
        proxy:'http://@127.0.0.1:8888',
        rejectUnauthorized: false,
        resolveWithFullResponse: true
    };

    rp(options).then(function(response){
        infoCache.set('hospital', JSON.parse(response.body));
        resolve('getHosp successed');
    }).catch(function(response){
        console.log(response)
        reject('getHosp Failed');
    })

});