const MD5 = require('./MD5');
var infoCache =  require('../control/infoCache');

function parseQueryString(url){
    var arr,Json={};
    if(url.indexOf("?") == -1){
        return Json;
    }
    var str=url.split("?")[1];
    if(str.indexOf("&") != -1){
        var iterms = str.split("&");
        for(var i=0;i<iterms.length;i++){
            arr=iterms[i].split("=");
            Json[arr[0]]=arr[1];
        }
    }else {
        arr=str.split("=");
        Json[arr[0]]=arr[1];
    }
    return Json;
};

function createSignature(params) {
    var paramArray = [];
    for(var key in params) {
        paramArray.push(key);
    }
    paramArray.sort();
    var sortStr = "";
    for(var i = 0; i < paramArray.length; i++) {
        var key = paramArray[i];
        if('' != params[key] && null != params[key] && undefined != params[key]){
            sortStr = sortStr + key + "=" + params[key] + "&";
        }
    }
    sortStr = sortStr.substring(0, sortStr.lastIndexOf("&"));
    return MD5(sortStr);
};


function setGetHospitalHeader(){
    var requestUrl = "https://api.zwjk.com/export/ui/branch/list_1_1_1?executionId=&pageFormKey="+infoCache.get('currentPageFormKey')+"&ucUiFlowId="+infoCache.get('ucUiFlowIdStr')+"&stepId="+infoCache.get('stepId');
    var requestModel = '';
    var randomStr = Math.random().toString(36).substr(2);
    var timestamp = new Date().getTime();
   // if("GET" == settings.type){
        requestModel = parseQueryString(decodeURIComponent(requestUrl).replace(/\+/g, ' '));
   // }else if("POST" == settings.type){
        //requestModel = parseDataString(decodeURIComponent(settings.data).replace(/\+/g, ' '));
   // }
    requestModel["noticeStr"] = randomStr;
    requestModel["timestamp"] = timestamp;
    var signStr = createSignature(requestModel)
    return {
        "noticeStr" :randomStr,
        "timestamp" : timestamp,
        "sign": signStr,
        "X-Requested-With": "cn.ucmed.beidakouqiangyiyuan.patient",
        "Origin":"	https://open.zwjk.com",
        "Accept": "application/json, text/javascript"
    }

};



function userNameGetHospInfo(hospName){
    var hopsData =   infoCache.get('hospital').branchList;
    for(var i=0,l=hopsData.length; i< l; i++){
        if(hopsData[i]['branchName'] == hospName){
            return hopsData[i]
        };
    };
};

module.exports = {
    'setGetHospitalHeader':setGetHospitalHeader,
    'userNameGetHospInfo':userNameGetHospInfo

};

