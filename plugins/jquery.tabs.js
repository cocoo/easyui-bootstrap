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
var _3=$(_2).children("div.tabs-header");
var _4=0;
$("ul.tabs li",_3).each(function(){
_4+=$(this).outerWidth(true);
});
var _5=_3.children("div.tabs-wrap").width();
var _6=parseInt(_3.find("ul.tabs").css("padding-left"));
return _4-_5+_6;
};
function _7(_8){
var _9=$.data(_8,"tabs").options;
var _a=$(_8).children("div.tabs-header");
var _b=_a.children("div.tabs-tool");
var _c=_a.children("div.tabs-scroller-left");
var _d=_a.children("div.tabs-scroller-right");
var _e=_a.children("div.tabs-wrap");
_b._outerHeight(_a.outerHeight()-(_9.plain?2:0));
var _f=0;
$("ul.tabs li",_a).each(function(){
_f+=$(this).outerWidth(true);
});
var _10=_a.width()-_b.outerWidth();
if(_f>_10){
_c.show();
_d.show();
_b.css("right",_d.outerWidth());
_e.css({marginLeft:_c.outerWidth(),marginRight:_d.outerWidth()+_b.outerWidth(),left:0,width:_10-_c.outerWidth()-_d.outerWidth()});
}else{
_c.hide();
_d.hide();
_b.css("right",0);
_e.css({marginLeft:0,marginRight:_b.outerWidth(),left:0,width:_10});
_e.scrollLeft(0);
}
};
function _11(_12){
var _13=$.data(_12,"tabs").options;
var _14=$(_12).children("div.tabs-header");
if(_13.tools){
if(typeof _13.tools=="string"){
$(_13.tools).addClass("tabs-tool").appendTo(_14);
$(_13.tools).show();
}else{
_14.children("div.tabs-tool").remove();
var _15=$("<div class=\"tabs-tool\"></div>").appendTo(_14);
for(var i=0;i<_13.tools.length;i++){
var _16=$("<a href=\"javascript:void(0);\"></a>").appendTo(_15);
_16[0].onclick=eval(_13.tools[i].handler||function(){
});
_16.linkbutton($.extend({},_13.tools[i],{plain:true}));
}
}
}else{
_14.children("div.tabs-tool").remove();
}
};
function _17(_18){
var _19=$.data(_18,"tabs").options;
var cc=$(_18);
if(_19.fit==true){
var p=cc.parent();
p.addClass("panel-noscroll");
if(p[0].tagName=="BODY"){
$("html").addClass("panel-fit");
}
_19.width=p.width();
_19.height=p.height();
}
cc.width(_19.width).height(_19.height);
var _1a=$(_18).children("div.tabs-header");
_1a._outerWidth(_19.width);
_7(_18);
var _1b=$(_18).children("div.tabs-panels");
var _1c=_19.height;
if(!isNaN(_1c)){
_1b._outerHeight(_1c-_1a.outerHeight());
}else{
_1b.height("auto");
}
var _1d=_19.width;
if(!isNaN(_1d)){
_1b._outerWidth(_1d);
}else{
_1b.width("auto");
}
};
function _1e(_1f){
var _20=$.data(_1f,"tabs").options;
var tab=_21(_1f);
if(tab){
var _22=$(_1f).children("div.tabs-panels");
var _23=_20.width=="auto"?"auto":_22.width();
var _24=_20.height=="auto"?"auto":_22.height();
tab.panel("resize",{width:_23,height:_24});
}
};
function _25(_26){
var _27=$.data(_26,"tabs").tabs;
var cc=$(_26);
cc.addClass("tabs-container");
cc.wrapInner("<div class=\"tabs-panels\"/>");
$("<div class=\"tabs-header\">"+"<div class=\"tabs-scroller-left\"></div>"+"<div class=\"tabs-scroller-right\"></div>"+"<div class=\"tabs-wrap\">"+"<ul class=\"tabs\"></ul>"+"</div>"+"</div>").prependTo(_26);
cc.children("div.tabs-panels").children("div").each(function(i){
var _28=$.extend({},$.parser.parseOptions(this),{selected:($(this).attr("selected")?true:undefined)});
var pp=$(this);
_27.push(pp);
_32(_26,pp,_28);
});
cc.children("div.tabs-header").find(".tabs-scroller-left, .tabs-scroller-right").hover(function(){
$(this).addClass("tabs-scroller-over");
},function(){
$(this).removeClass("tabs-scroller-over");
});
cc.bind("_resize",function(e,_29){
var _2a=$.data(_26,"tabs").options;
if(_2a.fit==true||_29){
_17(_26);
_1e(_26);
}
return false;
});
};
function _2b(_2c){
var _2d=$.data(_2c,"tabs").options;
var _2e=$(_2c).children("div.tabs-header");
var _2f=$(_2c).children("div.tabs-panels");
if(_2d.plain==true){
_2e.addClass("tabs-header-plain");
}else{
_2e.removeClass("tabs-header-plain");
}
if(_2d.border==true){
_2e.removeClass("tabs-header-noborder");
_2f.removeClass("tabs-panels-noborder");
}else{
_2e.addClass("tabs-header-noborder");
_2f.addClass("tabs-panels-noborder");
}
$(".tabs-scroller-left",_2e).unbind(".tabs").bind("click.tabs",function(){
var _30=$(".tabs-wrap",_2e);
var pos=_30.scrollLeft()-_2d.scrollIncrement;
_30.animate({scrollLeft:pos},_2d.scrollDuration);
});
$(".tabs-scroller-right",_2e).unbind(".tabs").bind("click.tabs",function(){
var _31=$(".tabs-wrap",_2e);
var pos=Math.min(_31.scrollLeft()+_2d.scrollIncrement,_1(_2c));
_31.animate({scrollLeft:pos},_2d.scrollDuration);
});
};
function _32(_33,pp,_34){
var _35=$.data(_33,"tabs");
_34=_34||{};
pp.panel($.extend({},_34,{border:false,noheader:true,closed:true,doSize:false,iconCls:(_34.icon?_34.icon:undefined),onLoad:function(){
if(_34.onLoad){
_34.onLoad.call(this,arguments);
}
_35.options.onLoad.call(_33,$(this));
}}));
var _36=pp.panel("options");
var _37=$(_33).children("div.tabs-header").find("ul.tabs");
function _38(li){
return _37.find("li").index(li);
};
_36.tab=$("<li></li>").appendTo(_37);
_36.tab.unbind(".tabs").bind("click.tabs",function(){
if($(this).hasClass("tabs-disabled")){
return;
}
_44(_33,_38(this));
}).bind("contextmenu.tabs",function(e){
if($(this).hasClass("tabs-disabled")){
return;
}
_35.options.onContextMenu.call(_33,e,$(this).find("span.tabs-title").html(),_38(this));
});
var _39=$("<a href=\"javascript:void(0)\" class=\"tabs-inner\"></a>").appendTo(_36.tab);
var _3a=$("<span class=\"tabs-title\"></span>").html(_36.title).appendTo(_39);
var _3b=$("<span class=\"tabs-icon\"></span>").appendTo(_39);
if(_36.closable){
_3a.addClass("tabs-closable");
var _3c=$("<a href=\"javascript:void(0)\" class=\"tabs-close\"></a>").appendTo(_36.tab);
_3c.unbind(".tabs").bind("click.tabs",function(){
if($(this).parent().hasClass("tabs-disabled")){
return;
}
_3d(_33,_38($(this).parent()));
return false;
});
}
if(_36.iconCls){
_3a.addClass("tabs-with-icon");
_3b.addClass(_36.iconCls);
}
if(_36.tools){
var _3e=$("<span class=\"tabs-p-tool\"></span>").insertAfter(_39);
if(typeof _36.tools=="string"){
$(_36.tools).children().appendTo(_3e);
}else{
for(var i=0;i<_36.tools.length;i++){
var t=$("<a href=\"javascript:void(0)\"></a>").appendTo(_3e);
t.addClass(_36.tools[i].iconCls);
if(_36.tools[i].handler){
t.bind("click",eval(_36.tools[i].handler));
}
}
}
var pr=_3e.children().length*12;
if(_36.closable){
pr+=8;
}else{
pr-=3;
_3e.css("right","5px");
}
_3a.css("padding-right",pr+"px");
}
};
function _3f(_40,_41){
var _42=$.data(_40,"tabs").options;
var _43=$.data(_40,"tabs").tabs;
if(_41.selected==undefined){
_41.selected=true;
}
var pp=$("<div></div>").appendTo($(_40).children("div.tabs-panels"));
_43.push(pp);
_32(_40,pp,_41);
_42.onAdd.call(_40,_41.title,_43.length-1);
_7(_40);
if(_41.selected){
_44(_40,_43.length-1);
}
};
function _45(_46,_47){
var _48=$.data(_46,"tabs").selectHis;
var pp=_47.tab;
var _49=pp.panel("options").title;
pp.panel($.extend({},_47.options,{iconCls:(_47.options.icon?_47.options.icon:undefined)}));
var _4a=pp.panel("options");
var tab=_4a.tab;
tab.find("span.tabs-icon").attr("class","tabs-icon");
tab.find("a.tabs-close").remove();
tab.find("span.tabs-title").html(_4a.title);
if(_4a.closable){
tab.find("span.tabs-title").addClass("tabs-closable");
$("<a href=\"javascript:void(0)\" class=\"tabs-close\"></a>").appendTo(tab);
}else{
tab.find("span.tabs-title").removeClass("tabs-closable");
}
if(_4a.iconCls){
tab.find("span.tabs-title").addClass("tabs-with-icon");
tab.find("span.tabs-icon").addClass(_4a.iconCls);
}else{
tab.find("span.tabs-title").removeClass("tabs-with-icon");
}
if(_49!=_4a.title){
for(var i=0;i<_48.length;i++){
if(_48[i]==_49){
_48[i]=_4a.title;
}
}
}
_2b(_46);
$.data(_46,"tabs").options.onUpdate.call(_46,_4a.title,_4b(_46,pp));
};
function _3d(_4c,_4d){
var _4e=$.data(_4c,"tabs").options;
var _4f=$.data(_4c,"tabs").tabs;
var _50=$.data(_4c,"tabs").selectHis;
if(!_51(_4c,_4d)){
return;
}
var tab=_52(_4c,_4d);
var _53=tab.panel("options").title;
var _54=_4b(_4c,tab);
if(_4e.onBeforeClose.call(_4c,_53,_54)==false){
return;
}
var tab=_52(_4c,_4d,true);
tab.panel("options").tab.remove();
tab.panel("destroy");
_4e.onClose.call(_4c,_53,_54);
_7(_4c);
for(var i=0;i<_50.length;i++){
if(_50[i]==_53){
_50.splice(i,1);
i--;
}
}
var _55=_50.pop();
if(_55){
_44(_4c,_55);
}else{
if(_4f.length){
_44(_4c,0);
}
}
};
function _52(_56,_57,_58){
var _59=$.data(_56,"tabs").tabs;
if(typeof _57=="number"){
if(_57<0||_57>=_59.length){
return null;
}else{
var tab=_59[_57];
if(_58){
_59.splice(_57,1);
}
return tab;
}
}
for(var i=0;i<_59.length;i++){
var tab=_59[i];
if(tab.panel("options").title==_57){
if(_58){
_59.splice(i,1);
}
return tab;
}
}
return null;
};
function _4b(_5a,tab){
var _5b=$.data(_5a,"tabs").tabs;
for(var i=0;i<_5b.length;i++){
if(_5b[i][0]==$(tab)[0]){
return i;
}
}
return -1;
};
function _21(_5c){
var _5d=$.data(_5c,"tabs").tabs;
for(var i=0;i<_5d.length;i++){
var tab=_5d[i];
if(tab.panel("options").closed==false){
return tab;
}
}
return null;
};
function _5e(_5f){
var _60=$.data(_5f,"tabs").tabs;
for(var i=0;i<_60.length;i++){
if(_60[i].panel("options").selected){
_44(_5f,i);
return;
}
}
if(_60.length){
_44(_5f,0);
}
};
function _44(_61,_62){
var _63=$.data(_61,"tabs").options;
var _64=$.data(_61,"tabs").tabs;
var _65=$.data(_61,"tabs").selectHis;
if(_64.length==0){
return;
}
var _66=_52(_61,_62);
if(!_66){
return;
}
var _67=_21(_61);
if(_67){
_67.panel("close");
_67.panel("options").tab.removeClass("tabs-selected");
}
_66.panel("open");
var _68=_66.panel("options").title;
_65.push(_68);
var tab=_66.panel("options").tab;
tab.addClass("tabs-selected");
var _69=$(_61).find(">div.tabs-header div.tabs-wrap");
var _6a=tab.position().left+_69.scrollLeft();
var _6b=_6a-_69.scrollLeft();
var _6c=_6b+tab.outerWidth();
if(_6b<0||_6c>_69.innerWidth()){
var pos=Math.min(_6a-(_69.width()-tab.width())/2,_1(_61));
_69.animate({scrollLeft:pos},_63.scrollDuration);
}else{
var pos=Math.min(_69.scrollLeft(),_1(_61));
_69.animate({scrollLeft:pos},_63.scrollDuration);
}
_1e(_61);
_63.onSelect.call(_61,_68,_4b(_61,_66));
};
function _51(_6d,_6e){
return _52(_6d,_6e)!=null;
};
$.fn.tabs=function(_6f,_70){
if(typeof _6f=="string"){
return $.fn.tabs.methods[_6f](this,_70);
}
_6f=_6f||{};
return this.each(function(){
var _71=$.data(this,"tabs");
var _72;
if(_71){
_72=$.extend(_71.options,_6f);
_71.options=_72;
}else{
$.data(this,"tabs",{options:$.extend({},$.fn.tabs.defaults,$.fn.tabs.parseOptions(this),_6f),tabs:[],selectHis:[]});
_25(this);
}
_11(this);
_2b(this);
_17(this);
_5e(this);
});
};
$.fn.tabs.methods={options:function(jq){
return $.data(jq[0],"tabs").options;
},tabs:function(jq){
return $.data(jq[0],"tabs").tabs;
},resize:function(jq){
return jq.each(function(){
_17(this);
_1e(this);
});
},add:function(jq,_73){
return jq.each(function(){
_3f(this,_73);
});
},close:function(jq,_74){
return jq.each(function(){
_3d(this,_74);
});
},getTab:function(jq,_75){
return _52(jq[0],_75);
},getTabIndex:function(jq,tab){
return _4b(jq[0],tab);
},getSelected:function(jq){
return _21(jq[0]);
},select:function(jq,_76){
return jq.each(function(){
_44(this,_76);
});
},exists:function(jq,_77){
return _51(jq[0],_77);
},update:function(jq,_78){
return jq.each(function(){
_45(this,_78);
});
},enableTab:function(jq,_79){
return jq.each(function(){
$(this).tabs("getTab",_79).panel("options").tab.removeClass("tabs-disabled");
});
},disableTab:function(jq,_7a){
return jq.each(function(){
$(this).tabs("getTab",_7a).panel("options").tab.addClass("tabs-disabled");
});
}};
$.fn.tabs.parseOptions=function(_7b){
return $.extend({},$.parser.parseOptions(_7b,["width","height","tools",{fit:"boolean",border:"boolean",plain:"boolean"}]));
};
$.fn.tabs.defaults={width:"auto",height:"auto",plain:false,fit:false,border:true,tools:null,scrollIncrement:100,scrollDuration:400,onLoad:function(_7c){
},onSelect:function(_7d,_7e){
},onBeforeClose:function(_7f,_80){
},onClose:function(_81,_82){
},onAdd:function(_83,_84){
},onUpdate:function(_85,_86){
},onContextMenu:function(e,_87,_88){
}};
})(jQuery);

