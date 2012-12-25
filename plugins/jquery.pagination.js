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
var _3=$.data(_2,"pagination");
var _4=_3.options;
var bb=_3.bb={};
var _5={first:{iconCls:"pagination-first",handler:function(){
if(_4.pageNumber>1){
_d(_2,1);
}
}},prev:{iconCls:"pagination-prev",handler:function(){
if(_4.pageNumber>1){
_d(_2,_4.pageNumber-1);
}
}},next:{iconCls:"pagination-next",handler:function(){
var _6=Math.ceil(_4.total/_4.pageSize);
if(_4.pageNumber<_6){
_d(_2,_4.pageNumber+1);
}
}},last:{iconCls:"pagination-last",handler:function(){
var _7=Math.ceil(_4.total/_4.pageSize);
if(_4.pageNumber<_7){
_d(_2,_7);
}
}},refresh:{iconCls:"pagination-load",handler:function(){
if(_4.onBeforeRefresh.call(_2,_4.pageNumber,_4.pageSize)!=false){
_d(_2,_4.pageNumber);
_4.onRefresh.call(_2,_4.pageNumber,_4.pageSize);
}
}}};
var _8=$(_2).addClass("pagination").html("<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tr></tr></table>");
var tr=_8.find("tr");
function _9(_a){
var a=$("<a href=\"javascript:void(0)\"></a>").appendTo(tr);
a.wrap("<td></td>");
a.linkbutton({iconCls:_5[_a].iconCls,plain:true}).unbind(".pagination").bind("click.pagination",_5[_a].handler);
return a;
};
if(_4.showPageList){
var ps=$("<select class=\"pagination-page-list\"></select>");
ps.bind("change",function(){
_4.pageSize=parseInt($(this).val());
_4.onChangePageSize.call(_2,_4.pageSize);
_d(_2,_4.pageNumber);
});
for(var i=0;i<_4.pageList.length;i++){
$("<option></option>").text(_4.pageList[i]).appendTo(ps);
}
$("<td></td>").append(ps).appendTo(tr);
$("<td><div class=\"pagination-btn-separator\"></div></td>").appendTo(tr);
}
bb.first=_9("first");
bb.prev=_9("prev");
$("<td><div class=\"pagination-btn-separator\"></div></td>").appendTo(tr);
$("<span style=\"padding-left:6px;\"></span>").html(_4.beforePageText).appendTo(tr).wrap("<td></td>");
bb.num=$("<input class=\"pagination-num\" type=\"text\" value=\"1\" size=\"2\">").appendTo(tr).wrap("<td></td>");
bb.num.unbind(".pagination").bind("keydown.pagination",function(e){
if(e.keyCode==13){
var _b=parseInt($(this).val())||1;
_d(_2,_b);
return false;
}
});
bb.after=$("<span style=\"padding-right:6px;\"></span>").appendTo(tr).wrap("<td></td>");
$("<td><div class=\"pagination-btn-separator\"></div></td>").appendTo(tr);
bb.next=_9("next");
bb.last=_9("last");
if(_4.showRefresh){
$("<td><div class=\"pagination-btn-separator\"></div></td>").appendTo(tr);
bb.refresh=_9("refresh");
}
if(_4.buttons){
$("<td><div class=\"pagination-btn-separator\"></div></td>").appendTo(tr);
for(var i=0;i<_4.buttons.length;i++){
var _c=_4.buttons[i];
if(_c=="-"){
$("<td><div class=\"pagination-btn-separator\"></div></td>").appendTo(tr);
}else{
var td=$("<td></td>").appendTo(tr);
$("<a href=\"javascript:void(0)\"></a>").appendTo(td).linkbutton($.extend(_c,{plain:true})).bind("click",eval(_c.handler||function(){
}));
}
}
}
$("<div class=\"pagination-info\"></div>").appendTo(_8);
$("<div style=\"clear:both;\"></div>").appendTo(_8);
};
function _d(_e,_f){
var _10=$.data(_e,"pagination").options;
_11(_e,{pageNumber:_f});
_10.onSelectPage.call(_e,_10.pageNumber,_10.pageSize);
};
function _11(_12,_13){
var _14=$.data(_12,"pagination").options;
var bb=$.data(_12,"pagination").bb;
$.extend(_14,_13||{});
var ps=$(_12).find("select.pagination-page-list");
if(ps.length){
ps.val(_14.pageSize+"");
_14.pageSize=parseInt(ps.val());
}
var _15=Math.ceil(_14.total/_14.pageSize)||1;
if(_14.pageNumber<1){
_14.pageNumber=1;
}
if(_14.pageNumber>_15){
_14.pageNumber=_15;
}
bb.num.val(_14.pageNumber);
bb.after.html(_14.afterPageText.replace(/{pages}/,_15));
var _16=_14.displayMsg;
_16=_16.replace(/{from}/,_14.total==0?0:_14.pageSize*(_14.pageNumber-1)+1);
_16=_16.replace(/{to}/,Math.min(_14.pageSize*(_14.pageNumber),_14.total));
_16=_16.replace(/{total}/,_14.total);
$(_12).find("div.pagination-info").html(_16);
bb.first.add(bb.prev).linkbutton({disabled:(_14.pageNumber==1)});
bb.next.add(bb.last).linkbutton({disabled:(_14.pageNumber==_15)});
_17(_12,_14.loading);
};
function _17(_18,_19){
var _1a=$.data(_18,"pagination").options;
var bb=$.data(_18,"pagination").bb;
_1a.loading=_19;
if(_1a.showRefresh){
if(_1a.loading){
bb.refresh.linkbutton({iconCls:"pagination-loading"});
}else{
bb.refresh.linkbutton({iconCls:"pagination-load"});
}
}
};
$.fn.pagination=function(_1b,_1c){
if(typeof _1b=="string"){
return $.fn.pagination.methods[_1b](this,_1c);
}
_1b=_1b||{};
return this.each(function(){
var _1d;
var _1e=$.data(this,"pagination");
if(_1e){
_1d=$.extend(_1e.options,_1b);
}else{
_1d=$.extend({},$.fn.pagination.defaults,$.fn.pagination.parseOptions(this),_1b);
$.data(this,"pagination",{options:_1d});
}
_1(this);
_11(this);
});
};
$.fn.pagination.methods={options:function(jq){
return $.data(jq[0],"pagination").options;
},loading:function(jq){
return jq.each(function(){
_17(this,true);
});
},loaded:function(jq){
return jq.each(function(){
_17(this,false);
});
},refresh:function(jq,_1f){
return jq.each(function(){
_11(this,_1f);
});
},select:function(jq,_20){
return jq.each(function(){
_d(this,_20);
});
}};
$.fn.pagination.parseOptions=function(_21){
var t=$(_21);
return $.extend({},$.parser.parseOptions(_21,[{total:"number",pageSize:"number",pageNumber:"number"},{loading:"boolean",showPageList:"boolean",showRefresh:"boolean"}]),{pageList:(t.attr("pageList")?eval(t.attr("pageList")):undefined)});
};
$.fn.pagination.defaults={total:1,pageSize:10,pageNumber:1,pageList:[10,20,30,50],loading:false,buttons:null,showPageList:true,showRefresh:true,onSelectPage:function(_22,_23){
},onBeforeRefresh:function(_24,_25){
},onRefresh:function(_26,_27){
},onChangePageSize:function(_28){
},beforePageText:"Page",afterPageText:"of {pages}",displayMsg:"Displaying {from} to {to} of {total} items"};
})(jQuery);

