var g_DCSData;
var g_XpData;
var WWTHIDJSAPI;


module.exports.init = function (_WWTHIDJSAPI, XpData) {
    g_XpData = XpData
    WWTHIDJSAPI = _WWTHIDJSAPI;
	WWTHIDJSAPI.ICPDrawStart();
	WWTHIDJSAPI.ICPDraw(0, 0,  "COM1" + g_XpData[0], false, "DCS");
	WWTHIDJSAPI.ICPDraw(100, 0,  "STBY " + g_XpData[1], true, "DCS");	
	WWTHIDJSAPI.ICPDraw(0, 15, "NAV1" + g_XpData[2], false, "DCS");
	WWTHIDJSAPI.ICPDraw(100, 15, "STBY " + g_XpData[3], true, "DCS");	
	WWTHIDJSAPI.ICPDraw(0, 30, "HDG " + g_XpData[4], false, "DCS");
	WWTHIDJSAPI.ICPDraw(100, 30, "ALT " + g_XpData[5], false, "DCS");	
	WWTHIDJSAPI.ICPDraw(0, 45, "ASPD " + g_XpData[6], false, "DCS");
	WWTHIDJSAPI.ICPDraw(100, 45, "GSPD " + g_XpData[7], false, "DCS");	
	WWTHIDJSAPI.ICPDrawEnd(); 
	console.log('end od init');

}


