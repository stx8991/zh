var jxurl = 'http://jx.ttjuba.com';
var jxurls = 'http://jx.ttjuba.com';
var mac_flag = 1;
//播放器版本
var mac_second = 0;
//播放前预加载广告时间 1000表示1秒
var mac_width = 0;
//播放器宽度0自适应
var mac_height = 550;
//播放器高度
var mac_widthmob = 0;
//手机播放器宽度0自适应
var mac_heightmob = 300;
//手机播放器高度
var mac_widthpop = 604;
//弹窗窗口宽度
var mac_heightpop = 566;
//弹窗窗口高度
var mac_showtop = 0;
//美化版播放器是否显示头部
var mac_showlist = 0;
//美化版播放器是否显示列表
var mac_autofull = 1;
//是否自动全屏,0否,1是
var mac_buffer = "";
//缓冲广告地址
var mac_prestrain = "";
//预加载提示地址
var mac_colors = "000000,F6F6F6,F6F6F6,333333,666666,FFFFF,FF0000,2c2c2c,ffffff,a3a3a3,2c2c2c,adadad,adadad,48486c,fcfcfc";
//背景色，文字颜色，链接颜色，分组标题背景色，分组标题颜色，当前分组标题颜色，当前集数颜色，集数列表滚动条凸出部分的颜色，滚动条上下按钮上三角箭头的颜色，滚动条的背景颜色，滚动条空白部分的颜色，滚动条立体滚动条阴影的颜色 ，滚动条亮边的颜色，滚动条强阴影的颜色，滚动条的基本颜色
var mac_show = {}
  , mac_show_server = {};
//播放器名称,服务器组地址
//缓存开始
mac_show["ckplayer"] = "高清播放";
mac_show["m3u8"] = "极速播放";
mac_show["putong"] = "普通播放";
mac_show["qiyi"] = "奇艺云";
mac_show["miaopai"] = "在线秒拍";
mac_show["youku"] = "超速Y线";
mac_show["letv"] = "超速L线";
mac_show["mgtv"] = "超速M线";
mac_show["sohu"] = "超速S线";
mac_show["qq"] = "超速T线";
mac_show["pptv"] = "超速P线";
mac_show["migu"] = "咪咕云";
mac_show["pptvyun"] = "PP云";
mac_show["diaosi"] = "屌丝云";
mac_show["zqzy"] = "最全资源";
mac_show["zdzy"] = "最大资源";
mac_show["zkzy"] = "最快资源";
mac_show["kbzy"] = "酷播资源";
mac_show["bjzy"] = "BJ资源";
mac_show["wlzy"] = "WL资源";
mac_show["dbzy"] = "豆瓣资源";
mac_show["hkzy"] = "HK资源";
mac_show["okzy"] = "OK资源";
mac_show["link"] = "外链播放";
mac_show["banquan"] = "资源屏蔽";
mac_show_server["webplay"] = "maccmsc.com";
//缓存结束
