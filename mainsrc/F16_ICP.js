const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));
var NowAircraft;
var g_DCSData;
var ICPDevs;
var resultArr = {};
var resultTitleArr = {};





var g_XpData;
var WWTHIDJSAPI;
let data = 200
let count = 0

module.exports.init = function (_WWTHIDJSAPI, XpData) {
    g_XpData = XpData
    WWTHIDJSAPI = _WWTHIDJSAPI;
	WWTHIDJSAPI.ICPDrawStart();
	WWTHIDJSAPI.ICPDraw(0, 0,  "COM1     " + g_XpData, false, "DCS");
	WWTHIDJSAPI.ICPDraw(0, 15, "NAV1     " + "117.50", false, "DCS");
	WWTHIDJSAPI.ICPDraw(0, 30, "ALTITUDE " + "13333", false, "DCS");
	WWTHIDJSAPI.ICPDraw(0, 45, "AIRSPEED " + "222", false, "DCS");
	WWTHIDJSAPI.ICPDrawEnd(); 
	console.log('end od init');



	
	
/*   setInterval(() => {
    WWTHIDJSAPI.ICPDrawStart();
    WWTHIDJSAPI.ICPDraw(0, 1, "SECONDS " + count + "    " + g_XpData, false, "DCS");
    count++
	g_XpData++
    WWTHIDJSAPI.ICPDrawEnd(); 
  }, 1000);  */
}



module.exports.dispDat = function (_WWTHIDJSAPI, XpData) {
    WWTHIDJSAPI = _WWTHIDJSAPI;
	WWTHIDJSAPI.ICPDrawStart();
	WWTHIDJSAPI.ICPDraw(0, 0,  'test', false, "DCS");
	WWTHIDJSAPI.ICPDrawEnd(); 
	console.log('should have worked :-( ');
	end();
}

function end(){
	WWTHIDJSAPI.ICPDrawStart();
	WWTHIDJSAPI.ICPDraw(0, 15, "NAV1" ,false, "DCS");
	WWTHIDJSAPI.ICPDrawEnd();
}
/* var CB_addCommon = (msg) => {
  const data = msg;
    WWTHIDJSAPI.ICPDrawStart();

	WWTHIDJSAPI.ICPDraw(0, 1,  "1234", false, "DCS");
      
      
    });

    WWTHIDJSAPI.ICPDrawEnd();

} */