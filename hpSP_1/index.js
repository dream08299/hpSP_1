var login = require('./control/login');
//var getUcUiFlowIdStr = require('./control/getUcUiFlowIdStr');






login.then(function (value){
    console.log(value);
    return require('./control/getJSsession');
}).then(function(value){
    console.log(value);
    return  require('./control/getUcUiFlowIdStr');
}).then(function(value){
    console.log(value);
    return  require('./control/getHosp');
}).then(function(value){
    console.log(value);
    return  require('./control/getPartList');
}).then(function(value){
    console.log(value);
}).catch(function(value){
    console.log(value);
    //return  require('./control/getHosp');
});
