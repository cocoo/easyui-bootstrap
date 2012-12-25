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
var _3=$.data(_2,"calendar").options;
var t=$(_2);
if(_3.fit==true){
var p=t.parent();
_3.width=p.width();
_3.height=p.height();
}
var _4=t.find(".calendar-header");
t._outerWidth(_3.width);
t._outerHeight(_3.height);
t.find(".calendar-body")._outerHeight(t.height()-_4.outerHeight());
};
function _5(_6){
$(_6).addClass("calendar").wrapInner("<div class=\"calendar-header\">"+"<div class=\"calendar-prevmonth\"></div>"+"<div class=\"calendar-nextmonth\"></div>"+"<div class=\"calendar-prevyear\"></div>"+"<div class=\"calendar-nextyear\"></div>"+"<div class=\"calendar-title\">"+"<span>Aprial 2010</span>"+"</div>"+"</div>"+"<div class=\"calendar-body\">"+"<div class=\"calendar-menu\">"+"<div class=\"calendar-menu-year-inner\">"+"<span class=\"calendar-menu-prev\"></span>"+"<span><input class=\"calendar-menu-year\" type=\"text\"></input></span>"+"<span class=\"calendar-menu-next\"></span>"+"</div>"+"<div class=\"calendar-menu-month-inner\">"+"</div>"+"</div>"+"</div>");
$(_6).find(".calendar-title span").hover(function(){
$(this).addClass("calendar-menu-hover");
},function(){
$(this).removeClass("calendar-menu-hover");
}).click(function(){
var _7=$(_6).find(".calendar-menu");
if(_7.is(":visible")){
_7.hide();
}else{
_14(_6);
}
});
$(".calendar-prevmonth,.calendar-nextmonth,.calendar-prevyear,.calendar-nextyear",_6).hover(function(){
$(this).addClass("calendar-nav-hover");
},function(){
$(this).removeClass("calendar-nav-hover");
});
$(_6).find(".calendar-nextmonth").click(function(){
_9(_6,1);
});
$(_6).find(".calendar-prevmonth").click(function(){
_9(_6,-1);
});
$(_6).find(".calendar-nextyear").click(function(){
_f(_6,1);
});
$(_6).find(".calendar-prevyear").click(function(){
_f(_6,-1);
});
$(_6).bind("_resize",function(){
var _8=$.data(_6,"calendar").options;
if(_8.fit==true){
_1(_6);
}
return false;
});
};
function _9(_a,_b){
var _c=$.data(_a,"calendar").options;
_c.month+=_b;
if(_c.month>12){
_c.year++;
_c.month=1;
}else{
if(_c.month<1){
_c.year--;
_c.month=12;
}
}
_d(_a);
var _e=$(_a).find(".calendar-menu-month-inner");
_e.find("td.calendar-selected").removeClass("calendar-selected");
_e.find("td:eq("+(_c.month-1)+")").addClass("calendar-selected");
};
function _f(_10,_11){
var _12=$.data(_10,"calendar").options;
_12.year+=_11;
_d(_10);
var _13=$(_10).find(".calendar-menu-year");
_13.val(_12.year);
};
function _14(_15){
var _16=$.data(_15,"calendar").options;
$(_15).find(".calendar-menu").show();
if($(_15).find(".calendar-menu-month-inner").is(":empty")){
$(_15).find(".calendar-menu-month-inner").empty();
var t=$("<table></table>").appendTo($(_15).find(".calendar-menu-month-inner"));
var idx=0;
for(var i=0;i<3;i++){
var tr=$("<tr></tr>").appendTo(t);
for(var j=0;j<4;j++){
$("<td class=\"calendar-menu-month\"></td>").html(_16.months[idx++]).attr("abbr",idx).appendTo(tr);
}
}
$(_15).find(".calendar-menu-prev,.calendar-menu-next").hover(function(){
$(this).addClass("calendar-menu-hover");
},function(){
$(this).removeClass("calendar-menu-hover");
});
$(_15).find(".calendar-menu-next").click(function(){
var y=$(_15).find(".calendar-menu-year");
if(!isNaN(y.val())){
y.val(parseInt(y.val())+1);
}
});
$(_15).find(".calendar-menu-prev").click(function(){
var y=$(_15).find(".calendar-menu-year");
if(!isNaN(y.val())){
y.val(parseInt(y.val()-1));
}
});
$(_15).find(".calendar-menu-year").keypress(function(e){
if(e.keyCode==13){
_17();
}
});
$(_15).find(".calendar-menu-month").hover(function(){
$(this).addClass("calendar-menu-hover");
},function(){
$(this).removeClass("calendar-menu-hover");
}).click(function(){
var _18=$(_15).find(".calendar-menu");
_18.find(".calendar-selected").removeClass("calendar-selected");
$(this).addClass("calendar-selected");
_17();
});
}
function _17(){
var _19=$(_15).find(".calendar-menu");
var _1a=_19.find(".calendar-menu-year").val();
var _1b=_19.find(".calendar-selected").attr("abbr");
if(!isNaN(_1a)){
_16.year=parseInt(_1a);
_16.month=parseInt(_1b);
_d(_15);
}
_19.hide();
};
var _1c=$(_15).find(".calendar-body");
var _1d=$(_15).find(".calendar-menu");
var _1e=_1d.find(".calendar-menu-year-inner");
var _1f=_1d.find(".calendar-menu-month-inner");
_1e.find("input").val(_16.year).focus();
_1f.find("td.calendar-selected").removeClass("calendar-selected");
_1f.find("td:eq("+(_16.month-1)+")").addClass("calendar-selected");
_1d._outerWidth(_1c.outerWidth());
_1d._outerHeight(_1c.outerHeight());
_1f._outerHeight(_1d.height()-_1e.outerHeight());
};
function _20(_21,_22,_23){
var _24=$.data(_21,"calendar").options;
var _25=[];
var _26=new Date(_22,_23,0).getDate();
for(var i=1;i<=_26;i++){
_25.push([_22,_23,i]);
}
var _27=[],_28=[];
while(_25.length>0){
var _29=_25.shift();
_28.push(_29);
var day=new Date(_29[0],_29[1]-1,_29[2]).getDay();
if(day==(_24.firstDay==0?7:_24.firstDay)-1){
_27.push(_28);
_28=[];
}
}
if(_28.length){
_27.push(_28);
}
var _2a=_27[0];
if(_2a.length<7){
while(_2a.length<7){
var _2b=_2a[0];
var _29=new Date(_2b[0],_2b[1]-1,_2b[2]-1);
_2a.unshift([_29.getFullYear(),_29.getMonth()+1,_29.getDate()]);
}
}else{
var _2b=_2a[0];
var _28=[];
for(var i=1;i<=7;i++){
var _29=new Date(_2b[0],_2b[1]-1,_2b[2]-i);
_28.unshift([_29.getFullYear(),_29.getMonth()+1,_29.getDate()]);
}
_27.unshift(_28);
}
var _2c=_27[_27.length-1];
while(_2c.length<7){
var _2d=_2c[_2c.length-1];
var _29=new Date(_2d[0],_2d[1]-1,_2d[2]+1);
_2c.push([_29.getFullYear(),_29.getMonth()+1,_29.getDate()]);
}
if(_27.length<6){
var _2d=_2c[_2c.length-1];
var _28=[];
for(var i=1;i<=7;i++){
var _29=new Date(_2d[0],_2d[1]-1,_2d[2]+i);
_28.push([_29.getFullYear(),_29.getMonth()+1,_29.getDate()]);
}
_27.push(_28);
}
return _27;
};
function _d(_2e){
var _2f=$.data(_2e,"calendar").options;
$(_2e).find(".calendar-title span").html(_2f.months[_2f.month-1]+" "+_2f.year);
var _30=$(_2e).find("div.calendar-body");
_30.find(">table").remove();
var t=$("<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><thead></thead><tbody></tbody></table>").prependTo(_30);
var tr=$("<tr></tr>").appendTo(t.find("thead"));
for(var i=_2f.firstDay;i<_2f.weeks.length;i++){
tr.append("<th>"+_2f.weeks[i]+"</th>");
}
for(var i=0;i<_2f.firstDay;i++){
tr.append("<th>"+_2f.weeks[i]+"</th>");
}
var _31=_20(_2e,_2f.year,_2f.month);
for(var i=0;i<_31.length;i++){
var _32=_31[i];
var tr=$("<tr></tr>").appendTo(t.find("tbody"));
for(var j=0;j<_32.length;j++){
var day=_32[j];
$("<td class=\"calendar-day calendar-other-month\"></td>").attr("abbr",day[0]+","+day[1]+","+day[2]).html(day[2]).appendTo(tr);
}
}
t.find("td[abbr^=\""+_2f.year+","+_2f.month+"\"]").removeClass("calendar-other-month");
var now=new Date();
var _33=now.getFullYear()+","+(now.getMonth()+1)+","+now.getDate();
t.find("td[abbr=\""+_33+"\"]").addClass("calendar-today");
if(_2f.current){
t.find(".calendar-selected").removeClass("calendar-selected");
var _34=_2f.current.getFullYear()+","+(_2f.current.getMonth()+1)+","+_2f.current.getDate();
t.find("td[abbr=\""+_34+"\"]").addClass("calendar-selected");
}
var _35=6-_2f.firstDay;
var _36=_35+1;
if(_35>=7){
_35-=7;
}
if(_36>=7){
_36-=7;
}
t.find("tr").find("td:eq("+_35+")").addClass("calendar-saturday");
t.find("tr").find("td:eq("+_36+")").addClass("calendar-sunday");
t.find("td").hover(function(){
$(this).addClass("calendar-hover");
},function(){
$(this).removeClass("calendar-hover");
}).click(function(){
t.find(".calendar-selected").removeClass("calendar-selected");
$(this).addClass("calendar-selected");
var _37=$(this).attr("abbr").split(",");
_2f.current=new Date(_37[0],parseInt(_37[1])-1,_37[2]);
_2f.onSelect.call(_2e,_2f.current);
});
};
$.fn.calendar=function(_38,_39){
if(typeof _38=="string"){
return $.fn.calendar.methods[_38](this,_39);
}
_38=_38||{};
return this.each(function(){
var _3a=$.data(this,"calendar");
if(_3a){
$.extend(_3a.options,_38);
}else{
_3a=$.data(this,"calendar",{options:$.extend({},$.fn.calendar.defaults,$.fn.calendar.parseOptions(this),_38)});
_5(this);
}
if(_3a.options.border==false){
$(this).addClass("calendar-noborder");
}
_1(this);
_d(this);
$(this).find("div.calendar-menu").hide();
});
};
$.fn.calendar.methods={options:function(jq){
return $.data(jq[0],"calendar").options;
},resize:function(jq){
return jq.each(function(){
_1(this);
});
},moveTo:function(jq,_3b){
return jq.each(function(){
$(this).calendar({year:_3b.getFullYear(),month:_3b.getMonth()+1,current:_3b});
});
}};
$.fn.calendar.parseOptions=function(_3c){
var t=$(_3c);
return $.extend({},$.parser.parseOptions(_3c,["width","height",{firstDay:"number",fit:"boolean",border:"boolean"}]));
};
$.fn.calendar.defaults={width:180,height:180,fit:false,border:true,firstDay:0,weeks:["S","M","T","W","T","F","S"],months:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],year:new Date().getFullYear(),month:new Date().getMonth()+1,current:new Date(),onSelect:function(_3d){
}};
})(jQuery);

