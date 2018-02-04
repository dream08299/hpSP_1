var infoCache =  require('../control/infoCache');
var getHostpital =  require('./getHostpital');

module.exports  = function(hospName) {
        let userInfo =infoCache.get('user');


        let hosp = getHostpital.userNameGetHospInfo(hospName);
        var transmitData = {
            executionId: '',
            ucUiFlowId: infoCache.get('ucUiFlowIdStr'),
            title: hosp.branchName,//下级title为院区名称
            branchName: hosp.branchName,//下级title为院区名称
            branchId: hosp.branchId, //院区ID
            pageFormKey: infoCache.get('currentPageFormKey'),
            userOpenId :  userInfo.open_id,
            stepId : infoCache.get('stepId')

        }
        return  JSON.stringify(transmitData);
        //view.open(flowurl + "&_eventId=" + id + "&transmitData=" + JSON.stringify(transmitData))

}