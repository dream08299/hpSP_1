var rp = require('request-promise');
var infoCache =  require('./infoCache');


var loginInfo = {
    method: 'POST',
    uri: 'https://open.zwjk.com/api/exec/f649e0f8-b33d-4e4d-865a-7753335cf6f8.htm',
    proxy:'http://@127.0.0.1:8888',
    rejectUnauthorized: false,
    headers:{
        Accept:"application/xml",
        K:"1234567",
    },

    form: {
        requestData: '{"login_name":"15001237161","password":"a3000844a5fdbec9e54232cbbe4d7c182ac1b3ce9fe1abca08dd2147cae0e56a","TX":"U001014","T":"1","V":"1.0.2","S":"","D":"6cddff4f620bef4d"}'
    }
};

module.exports = new Promise(function(resolve, reject) {
    rp(loginInfo).then(function (parsedBody) {
        let rs = JSON.parse(parsedBody);
        if(rs.R == "200"){
            let {keys, values, entries} = Object;
            for (let [key, value] of entries(rs)) {
                if(key != "R") infoCache.set(key, value);
            };
            resolve('login successed');
        }
        // console.log(parsedBody)
    }).catch(function (parsedBody) {
         reject('login failed');

    });
});



