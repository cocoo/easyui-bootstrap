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
var _3=$.data(_2,"propertygrid").options;
$(_2).datagrid($.extend({},_3,{cls:"propertygrid",view:(_3.showGroup?_4:undefined),onClickRow:function(_5,_6){
if(_3.editIndex!=_5&&_6.editor){
var _7=$(this).datagrid("getColumnOption","value");
_7.editor=_6.editor;
_8(_3.editIndex);
$(this).datagrid("beginEdit",_5);
$(this).datagrid("getEditors",_5)[0].target.focus();
_3.editIndex=_5;
}
_3.onClickRow.call(_2,_5,_6);
},onLoadSuccess:function(_9){
$(_2).datagrid("getPanel").find("div.datagrid-group").css("border","0");
_3.onLoadSuccess.call(_2,_9);
}}));
$(_2).datagrid("getPanel").find("div.datagrid-body").unbind(".propertygrid").bind("mousedown.propertygrid",function(e){
e.stopPropagation();
});
$(document).unbind(".propertygrid").bind("mousedown.propertygrid",function(){
_8(_3.editIndex);
_3.editIndex=undefined;
});
function _8(_a){
if(_a==undefined){
return;
}
var t=$(_2);
t.datagrid("getEditors",_a)[0].target.blur();
if(t.datagrid("validateRow",_a)){
t.datagrid("endEdit",_a);
}else{
t.datagrid("cancelEdit",_a);
}
};
};
$.fn.propertygrid=function(_b,_c){
if(typeof _b=="string"){
var _d=$.fn.propertygrid.methods[_b];
if(_d){
return _d(this,_c);
}else{
return this.datagrid(_b,_c);
}
}
_b=_b||{};
return this.each(function(){
var _e=$.data(this,"propertygrid");
if(_e){
$.extend(_e.options,_b);
}else{
$.data(this,"propertygrid",{options:$.extend({},$.fn.propertygrid.defaults,$.fn.propertygrid.parseOptions(this),_b)});
}
_1(this);
});
};
$.fn.propertygrid.methods={};
$.fn.propertygrid.parseOptions=function(_f){
var t=$(_f);
return $.extend({},$.fn.datagrid.parseOptions(_f),$.parser.parseOptions(_f,[{showGroup:"boolean"}]));
};
var _4=$.extend({},$.fn.datagrid.defaults.view,{render:function(_10,_11,_12){
var _13=$.data(_10,"datagrid");
var _14=_13.options;
var _15=_13.data.rows;
var _16=$(_10).datagrid("getColumnFields",_12);
var _17=[];
var _18=0;
var _19=this.groups;
for(var i=0;i<_19.length;i++){
var _1a=_19[i];
_17.push("<div class=\"datagrid-group\" group-index="+i+" style=\"height:25px;overflow:hidden;border-bottom:1px solid #ccc;\">");
_17.push("<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\" style=\"height:100%\"><tbody>");
_17.push("<tr>");
_17.push("<td style=\"border:0;\">");
if(!_12){
_17.push("<span style=\"color:#666;font-weight:bold;\">");
_17.push(_14.groupFormatter.call(_10,_1a.fvalue,_1a.rows));
_17.push("</span>");
}
_17.push("</td>");
_17.push("</tr>");
_17.push("</tbody></table>");
_17.push("</div>");
_17.push("<table class=\"datagrid-btable\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>");
for(var j=0;j<_1a.rows.length;j++){
var cls=(_18%2&&_14.striped)?"class=\"datagrid-row datagrid-row-alt\"":"class=\"datagrid-row\"";
var _1b=_14.rowStyler?_14.rowStyler.call(_10,_18,_1a.rows[j]):"";
var _1c=_1b?"style=\""+_1b+"\"":"";
var _1d=_13.rowIdPrefix+"-"+(_12?1:2)+"-"+_18;
_17.push("<tr id=\""+_1d+"\" datagrid-row-index=\""+_18+"\" "+cls+" "+_1c+">");
_17.push(this.renderRow.call(this,_10,_16,_12,_18,_1a.rows[j]));
_17.push("</tr>");
_18++;
}
_17.push("</tbody></table>");
}
$(_11).html(_17.join(""));
},onAfterRender:function(_1e){
var _1f=$.data(_1e,"datagrid").options;
var dc=$.data(_1e,"datagrid").dc;
var _20=dc.view;
var _21=dc.view1;
var _22=dc.view2;
$.fn.datagrid.defaults.view.onAfterRender.call(this,_1e);
if(_1f.rownumbers||_1f.frozenColumns.length){
var _23=_21.find("div.datagrid-group");
}else{
var _23=_22.find("div.datagrid-group");
}
$("<td style=\"border:0\"><div class=\"datagrid-row-expander datagrid-row-collapse\" style=\"width:25px;height:16px;cursor:pointer\"></div></td>").insertBefore(_23.find("td"));
_20.find("div.datagrid-group").each(function(){
var _24=$(this).attr("group-index");
$(this).find("div.datagrid-row-expander").bind("click",{groupIndex:_24},function(e){
if($(this).hasClass("datagrid-row-collapse")){
$(_1e).datagrid("collapseGroup",e.data.groupIndex);
}else{
$(_1e).datagrid("expandGroup",e.data.groupIndex);
}
});
});
},onBeforeRender:function(_25,_26){
var _27=$.data(_25,"datagrid").options;
var _28=[];
for(var i=0;i<_26.length;i++){
var row=_26[i];
var _29=_2a(row[_27.groupField]);
if(!_29){
_29={fvalue:row[_27.groupField],rows:[row],startRow:i};
_28.push(_29);
}else{
_29.rows.push(row);
}
}
function _2a(_2b){
for(var i=0;i<_28.length;i++){
var _2c=_28[i];
if(_2c.fvalue==_2b){
return _2c;
}
}
return null;
};
this.groups=_28;
var _2d=[];
for(var i=0;i<_28.length;i++){
var _29=_28[i];
for(var j=0;j<_29.rows.length;j++){
_2d.push(_29.rows[j]);
}
}
$.data(_25,"datagrid").data.rows=_2d;
}});
$.extend($.fn.datagrid.methods,{expandGroup:function(jq,_2e){
return jq.each(function(){
var _2f=$.data(this,"datagrid").dc.view;
if(_2e!=undefined){
var _30=_2f.find("div.datagrid-group[group-index=\""+_2e+"\"]");
}else{
var _30=_2f.find("div.datagrid-group");
}
var _31=_30.find("div.datagrid-row-expander");
if(_31.hasClass("datagrid-row-expand")){
_31.removeClass("datagrid-row-expand").addClass("datagrid-row-collapse");
_30.next("table").show();
}
$(this).datagrid("fixRowHeight");
});
},collapseGroup:function(jq,_32){
return jq.each(function(){
var _33=$.data(this,"datagrid").dc.view;
if(_32!=undefined){
var _34=_33.find("div.datagrid-group[group-index=\""+_32+"\"]");
}else{
var _34=_33.find("div.datagrid-group");
}
var _35=_34.find("div.datagrid-row-expander");
if(_35.hasClass("datagrid-row-collapse")){
_35.removeClass("datagrid-row-collapse").addClass("datagrid-row-expand");
_34.next("table").hide();
}
$(this).datagrid("fixRowHeight");
});
}});
$.fn.propertygrid.defaults=$.extend({},$.fn.datagrid.defaults,{singleSelect:true,remoteSort:false,fitColumns:true,loadMsg:"",frozenColumns:[[{field:"f",width:16,resizable:false}]],columns:[[{field:"name",title:"Name",width:100,sortable:true},{field:"value",title:"Value",width:100,resizable:false}]],showGroup:false,groupField:"group",groupFormatter:function(_36,_37){
return _36;
}});
})(jQuery);

