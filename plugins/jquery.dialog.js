/**
 * jQuery EasyUI 1.3
 * 
 * Licensed under the GPL terms
 * To use it on other terms please contact us
 *
 * Copyright(c) 2009-2012 stworthy [ stworthy@gmail.com ] 
 * 
 */
(function($){
function _1(_2){
var t=$(_2);
t.wrapInner("<div class=\"dialog-content\"></div>");
var _3=t.children("div.dialog-content");
_3.attr("style",t.attr("style"));
t.removeAttr("style").css("overflow","hidden");
_3.panel({border:false,doSize:false});
return _3;
};
function _4(_5){
var _6=$.data(_5,"dialog").options;
var _7=$.data(_5,"dialog").contentPanel;
if(_6.toolbar){
if(typeof _6.toolbar=="string"){
$(_6.toolbar).addClass("dialog-toolbar").prependTo(_5);
$(_6.toolbar).show();
}else{
$(_5).find("div.dialog-toolbar").remove();
var _8=$("<div class=\"dialog-toolbar\"></div>").prependTo(_5);
for(var i=0;i<_6.toolbar.length;i++){
var p=_6.toolbar[i];
if(p=="-"){
_8.append("<div class=\"dialog-tool-separator\"></div>");
}else{
var _9=$("<a href=\"javascript:void(0)\"></a>").appendTo(_8);
_9.css("float","left");
_9[0].onclick=eval(p.handler||function(){
});
_9.linkbutton($.extend({},p,{plain:true}));
}
}
_8.append("<div style=\"clear:both\"></div>");
}
}else{
$(_5).find("div.dialog-toolbar").remove();
}
if(_6.buttons){
if(typeof _6.buttons=="string"){
$(_6.buttons).addClass("dialog-button").appendTo(_5);
$(_6.buttons).show();
}else{
$(_5).find("div.dialog-button").remove();
var _a=$("<div class=\"dialog-button\"></div>").appendTo(_5);
for(var i=0;i<_6.buttons.length;i++){
var p=_6.buttons[i];
var _b=$("<a href=\"javascript:void(0)\"></a>").appendTo(_a);
if(p.handler){
_b[0].onclick=p.handler;
}
_b.linkbutton(p);
}
}
}else{
$(_5).find("div.dialog-button").remove();
}
var _c=_6.href;
var _d=_6.content;
_6.href=null;
_6.content=null;
_7.panel({closed:_6.closed,cache:_6.cache,href:_c,content:_d,onLoad:function(){
if(_6.height=="auto"){
$(_5).window("resize");
}
_6.onLoad.apply(_5,arguments);
}});
$(_5).window($.extend({},_6,{onOpen:function(){
_7.panel("open");
if(_6.onOpen){
_6.onOpen.call(_5);
}
},onResize:function(_e,_f){
var _10=$(_5).panel("panel").find(">div.panel-body");
_7.panel("panel").show();
_7.panel("resize",{width:_10.width(),height:(_f=="auto")?"auto":_10.height()-_10.find(">div.dialog-toolbar").outerHeight()-_10.find(">div.dialog-button").outerHeight()});
if(_6.onResize){
_6.onResize.call(_5,_e,_f);
}
}}));
_6.href=_c;
_6.content=_d;
};
function _11(_12,_13){
var _14=$.data(_12,"dialog").contentPanel;
_14.panel("refresh",_13);
};
$.fn.dialog=function(_15,_16){
if(typeof _15=="string"){
var _17=$.fn.dialog.methods[_15];
if(_17){
return _17(this,_16);
}else{
return this.window(_15,_16);
}
}
_15=_15||{};
return this.each(function(){
var _18=$.data(this,"dialog");
if(_18){
$.extend(_18.options,_15);
}else{
$.data(this,"dialog",{options:$.extend({},$.fn.dialog.defaults,$.fn.dialog.parseOptions(this),_15),contentPanel:_1(this)});
}
_4(this);
});
};
$.fn.dialog.methods={options:function(jq){
var _19=$.data(jq[0],"dialog").options;
var _1a=jq.panel("options");
$.extend(_19,{closed:_1a.closed,collapsed:_1a.collapsed,minimized:_1a.minimized,maximized:_1a.maximized});
var _1b=$.data(jq[0],"dialog").contentPanel;
return _19;
},dialog:function(jq){
return jq.window("window");
},refresh:function(jq,_1c){
return jq.each(function(){
_11(this,_1c);
});
}};
$.fn.dialog.parseOptions=function(_1d){
return $.extend({},$.fn.window.parseOptions(_1d),$.parser.parseOptions(_1d,["toolbar","buttons"]));
};
$.fn.dialog.defaults=$.extend({},$.fn.window.defaults,{title:"New Dialog",collapsible:false,minimizable:false,maximizable:false,resizable:false,toolbar:null,buttons:null});
})(jQuery);

