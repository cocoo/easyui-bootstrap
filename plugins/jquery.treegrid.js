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
function _1(a,o){
for(var i=0,_2=a.length;i<_2;i++){
if(a[i]==o){
return i;
}
}
return -1;
};
function _3(a,o){
var _4=_1(a,o);
if(_4!=-1){
a.splice(_4,1);
}
};
function _5(_6){
var _7=$.data(_6,"treegrid").options;
$(_6).datagrid($.extend({},_7,{url:null,loader:function(){
return false;
},onLoadSuccess:function(){
},onResizeColumn:function(_8,_9){
_21(_6);
_7.onResizeColumn.call(_6,_8,_9);
},onSortColumn:function(_a,_b){
_7.sortName=_a;
_7.sortOrder=_b;
if(_7.remoteSort){
_20(_6);
}else{
var _c=$(_6).treegrid("getData");
_39(_6,0,_c);
}
_7.onSortColumn.call(_6,_a,_b);
},onBeforeEdit:function(_d,_e){
if(_7.onBeforeEdit.call(_6,_e)==false){
return false;
}
},onAfterEdit:function(_f,row,_10){
_7.onAfterEdit.call(_6,row,_10);
},onCancelEdit:function(_11,row){
_7.onCancelEdit.call(_6,row);
},onSelect:function(_12){
_7.onSelect.call(_6,_40(_6,_12));
},onUnselect:function(_13){
_7.onUnselect.call(_6,_40(_6,_13));
},onSelectAll:function(){
_7.onSelectAll.call(_6,$.data(_6,"treegrid").data);
},onUnselectAll:function(){
_7.onUnselectAll.call(_6,$.data(_6,"treegrid").data);
},onCheck:function(_14){
_7.onCheck.call(_6,_40(_6,_14));
},onUncheck:function(_15){
_7.onUncheck.call(_6,_40(_6,_15));
},onCheckAll:function(){
_7.onCheckAll.call(_6,$.data(_6,"treegrid").data);
},onUncheckAll:function(){
_7.onUncheckAll.call(_6,$.data(_6,"treegrid").data);
},onClickRow:function(_16){
_7.onClickRow.call(_6,_40(_6,_16));
},onDblClickRow:function(_17){
_7.onDblClickRow.call(_6,_40(_6,_17));
},onClickCell:function(_18,_19){
_7.onClickCell.call(_6,_19,_40(_6,_18));
},onDblClickCell:function(_1a,_1b){
_7.onDblClickCell.call(_6,_1b,_40(_6,_1a));
},onRowContextMenu:function(e,_1c){
_7.onContextMenu.call(_6,e,_40(_6,_1c));
}}));
if(_7.pagination){
var _1d=$(_6).datagrid("getPager");
_1d.pagination({pageNumber:_7.pageNumber,pageSize:_7.pageSize,pageList:_7.pageList,onSelectPage:function(_1e,_1f){
_7.pageNumber=_1e;
_7.pageSize=_1f;
_20(_6);
}});
_7.pageSize=_1d.pagination("options").pageSize;
}
};
function _21(_22,_23){
var _24=$.data(_22,"datagrid").options;
var dc=$.data(_22,"datagrid").dc;
if(!dc.body1.is(":empty")&&(!_24.nowrap||_24.autoRowHeight)){
if(_23!=undefined){
var _25=_26(_22,_23);
for(var i=0;i<_25.length;i++){
_27(_25[i][_24.idField]);
}
}
}
$(_22).datagrid("fixRowHeight",_23);
function _27(_28){
var tr1=_24.finder.getTr(_22,_28,"body",1);
var tr2=_24.finder.getTr(_22,_28,"body",2);
tr1.css("height","");
tr2.css("height","");
var _29=Math.max(tr1.height(),tr2.height());
tr1.css("height",_29);
tr2.css("height",_29);
};
};
function _2a(_2b){
var dc=$.data(_2b,"datagrid").dc;
var _2c=$.data(_2b,"treegrid").options;
if(!_2c.rownumbers){
return;
}
dc.body1.find("div.datagrid-cell-rownumber").each(function(i){
$(this).html(i+1);
});
};
function _2d(_2e){
var dc=$.data(_2e,"datagrid").dc;
var _2f=dc.body1.add(dc.body2).data("events").click[0].handler;
dc.body1.add(dc.body2).bind("mouseover",function(e){
var tt=$(e.target);
var tr=tt.closest("tr.datagrid-row");
if(!tr.length){
return;
}
if(tt.hasClass("tree-hit")){
tt.hasClass("tree-expanded")?tt.addClass("tree-expanded-hover"):tt.addClass("tree-collapsed-hover");
}
e.stopPropagation();
}).bind("mouseout",function(e){
var tt=$(e.target);
var tr=tt.closest("tr.datagrid-row");
if(!tr.length){
return;
}
if(tt.hasClass("tree-hit")){
tt.hasClass("tree-expanded")?tt.removeClass("tree-expanded-hover"):tt.removeClass("tree-collapsed-hover");
}
e.stopPropagation();
}).unbind("click").bind("click",function(e){
var tt=$(e.target);
var tr=tt.closest("tr.datagrid-row");
if(!tr.length){
return;
}
if(tt.hasClass("tree-hit")){
_30(_2e,tr.attr("node-id"));
}else{
_2f(e);
}
e.stopPropagation();
});
};
function _31(_32,_33){
var _34=$.data(_32,"treegrid").options;
var tr1=_34.finder.getTr(_32,_33,"body",1);
var tr2=_34.finder.getTr(_32,_33,"body",2);
var _35=$(_32).datagrid("getColumnFields",true).length+(_34.rownumbers?1:0);
var _36=$(_32).datagrid("getColumnFields",false).length;
_37(tr1,_35);
_37(tr2,_36);
function _37(tr,_38){
$("<tr class=\"treegrid-tr-tree\">"+"<td style=\"border:0px\" colspan=\""+_38+"\">"+"<div></div>"+"</td>"+"</tr>").insertAfter(tr);
};
};
function _39(_3a,_3b,_3c,_3d){
var _3e=$.data(_3a,"treegrid").options;
var dc=$.data(_3a,"datagrid").dc;
_3c=_3e.loadFilter.call(_3a,_3c,_3b);
var _3f=_40(_3a,_3b);
if(_3f){
var _41=_3e.finder.getTr(_3a,_3b,"body",1);
var _42=_3e.finder.getTr(_3a,_3b,"body",2);
var cc1=_41.next("tr.treegrid-tr-tree").children("td").children("div");
var cc2=_42.next("tr.treegrid-tr-tree").children("td").children("div");
}else{
var cc1=dc.body1;
var cc2=dc.body2;
}
if(!_3d){
$.data(_3a,"treegrid").data=[];
cc1.empty();
cc2.empty();
}
if(_3e.view.onBeforeRender){
_3e.view.onBeforeRender.call(_3e.view,_3a,_3b,_3c);
}
_3e.view.render.call(_3e.view,_3a,cc1,true);
_3e.view.render.call(_3e.view,_3a,cc2,false);
if(_3e.showFooter){
_3e.view.renderFooter.call(_3e.view,_3a,dc.footer1,true);
_3e.view.renderFooter.call(_3e.view,_3a,dc.footer2,false);
}
if(_3e.view.onAfterRender){
_3e.view.onAfterRender.call(_3e.view,_3a);
}
_3e.onLoadSuccess.call(_3a,_3f,_3c);
if(!_3b&&_3e.pagination){
var _43=$.data(_3a,"treegrid").total;
var _44=$(_3a).datagrid("getPager");
if(_44.pagination("options").total!=_43){
_44.pagination({total:_43});
}
}
_21(_3a);
_2a(_3a);
$(_3a).treegrid("autoSizeColumn");
};
function _20(_45,_46,_47,_48,_49){
var _4a=$.data(_45,"treegrid").options;
var _4b=$(_45).datagrid("getPanel").find("div.datagrid-body");
if(_47){
_4a.queryParams=_47;
}
var _4c=$.extend({},_4a.queryParams);
if(_4a.pagination){
$.extend(_4c,{page:_4a.pageNumber,rows:_4a.pageSize});
}
if(_4a.sortName){
$.extend(_4c,{sort:_4a.sortName,order:_4a.sortOrder});
}
var row=_40(_45,_46);
if(_4a.onBeforeLoad.call(_45,row,_4c)==false){
return;
}
var _4d=_4b.find("tr[node-id="+_46+"] span.tree-folder");
_4d.addClass("tree-loading");
$(_45).treegrid("loading");
var _4e=_4a.loader.call(_45,_4c,function(_4f){
_4d.removeClass("tree-loading");
$(_45).treegrid("loaded");
_39(_45,_46,_4f,_48);
if(_49){
_49();
}
},function(){
_4d.removeClass("tree-loading");
$(_45).treegrid("loaded");
_4a.onLoadError.apply(_45,arguments);
if(_49){
_49();
}
});
if(_4e==false){
_4d.removeClass("tree-loading");
$(_45).treegrid("loaded");
}
};
function _50(_51){
var _52=_53(_51);
if(_52.length){
return _52[0];
}else{
return null;
}
};
function _53(_54){
return $.data(_54,"treegrid").data;
};
function _55(_56,_57){
var row=_40(_56,_57);
if(row._parentId){
return _40(_56,row._parentId);
}else{
return null;
}
};
function _26(_58,_59){
var _5a=$.data(_58,"treegrid").options;
var _5b=$(_58).datagrid("getPanel").find("div.datagrid-view2 div.datagrid-body");
var _5c=[];
if(_59){
_5d(_59);
}else{
var _5e=_53(_58);
for(var i=0;i<_5e.length;i++){
_5c.push(_5e[i]);
_5d(_5e[i][_5a.idField]);
}
}
function _5d(_5f){
var _60=_40(_58,_5f);
if(_60&&_60.children){
for(var i=0,len=_60.children.length;i<len;i++){
var _61=_60.children[i];
_5c.push(_61);
_5d(_61[_5a.idField]);
}
}
};
return _5c;
};
function _62(_63){
var _64=_65(_63);
if(_64.length){
return _64[0];
}else{
return null;
}
};
function _65(_66){
var _67=[];
var _68=$(_66).datagrid("getPanel");
_68.find("div.datagrid-view2 div.datagrid-body tr.datagrid-row-selected").each(function(){
var id=$(this).attr("node-id");
_67.push(_40(_66,id));
});
return _67;
};
function _69(_6a,_6b){
if(!_6b){
return 0;
}
var _6c=$.data(_6a,"treegrid").options;
var _6d=$(_6a).datagrid("getPanel").children("div.datagrid-view");
var _6e=_6d.find("div.datagrid-body tr[node-id="+_6b+"]").children("td[field="+_6c.treeField+"]");
return _6e.find("span.tree-indent,span.tree-hit").length;
};
function _40(_6f,_70){
var _71=$.data(_6f,"treegrid").options;
var _72=$.data(_6f,"treegrid").data;
var cc=[_72];
while(cc.length){
var c=cc.shift();
for(var i=0;i<c.length;i++){
var _73=c[i];
if(_73[_71.idField]==_70){
return _73;
}else{
if(_73["children"]){
cc.push(_73["children"]);
}
}
}
}
return null;
};
function _74(_75,_76){
var _77=$.data(_75,"treegrid").options;
var row=_40(_75,_76);
var tr=_77.finder.getTr(_75,_76);
var hit=tr.find("span.tree-hit");
if(hit.length==0){
return;
}
if(hit.hasClass("tree-collapsed")){
return;
}
if(_77.onBeforeCollapse.call(_75,row)==false){
return;
}
hit.removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed");
hit.next().removeClass("tree-folder-open");
row.state="closed";
tr=tr.next("tr.treegrid-tr-tree");
var cc=tr.children("td").children("div");
if(_77.animate){
cc.slideUp("normal",function(){
$(_75).treegrid("autoSizeColumn");
_21(_75,_76);
_77.onCollapse.call(_75,row);
});
}else{
cc.hide();
$(_75).treegrid("autoSizeColumn");
_21(_75,_76);
_77.onCollapse.call(_75,row);
}
};
function _78(_79,_7a){
var _7b=$.data(_79,"treegrid").options;
var tr=_7b.finder.getTr(_79,_7a);
var hit=tr.find("span.tree-hit");
var row=_40(_79,_7a);
if(hit.length==0){
return;
}
if(hit.hasClass("tree-expanded")){
return;
}
if(_7b.onBeforeExpand.call(_79,row)==false){
return;
}
hit.removeClass("tree-collapsed tree-collapsed-hover").addClass("tree-expanded");
hit.next().addClass("tree-folder-open");
var _7c=tr.next("tr.treegrid-tr-tree");
if(_7c.length){
var cc=_7c.children("td").children("div");
_7d(cc);
}else{
_31(_79,row[_7b.idField]);
var _7c=tr.next("tr.treegrid-tr-tree");
var cc=_7c.children("td").children("div");
cc.hide();
_20(_79,row[_7b.idField],{id:row[_7b.idField]},true,function(){
if(cc.is(":empty")){
_7c.remove();
}else{
_7d(cc);
}
});
}
function _7d(cc){
row.state="open";
if(_7b.animate){
cc.slideDown("normal",function(){
$(_79).treegrid("autoSizeColumn");
_21(_79,_7a);
_7b.onExpand.call(_79,row);
});
}else{
cc.show();
$(_79).treegrid("autoSizeColumn");
_21(_79,_7a);
_7b.onExpand.call(_79,row);
}
};
};
function _30(_7e,_7f){
var _80=$.data(_7e,"treegrid").options;
var tr=_80.finder.getTr(_7e,_7f);
var hit=tr.find("span.tree-hit");
if(hit.hasClass("tree-expanded")){
_74(_7e,_7f);
}else{
_78(_7e,_7f);
}
};
function _81(_82,_83){
var _84=$.data(_82,"treegrid").options;
var _85=_26(_82,_83);
if(_83){
_85.unshift(_40(_82,_83));
}
for(var i=0;i<_85.length;i++){
_74(_82,_85[i][_84.idField]);
}
};
function _86(_87,_88){
var _89=$.data(_87,"treegrid").options;
var _8a=_26(_87,_88);
if(_88){
_8a.unshift(_40(_87,_88));
}
for(var i=0;i<_8a.length;i++){
_78(_87,_8a[i][_89.idField]);
}
};
function _8b(_8c,_8d){
var _8e=$.data(_8c,"treegrid").options;
var ids=[];
var p=_55(_8c,_8d);
while(p){
var id=p[_8e.idField];
ids.unshift(id);
p=_55(_8c,id);
}
for(var i=0;i<ids.length;i++){
_78(_8c,ids[i]);
}
};
function _8f(_90,_91){
var _92=$.data(_90,"treegrid").options;
if(_91.parent){
var _93=$(_90).datagrid("getPanel").find("div.datagrid-body");
var tr=_93.find("tr[node-id="+_91.parent+"]");
if(tr.next("tr.treegrid-tr-tree").length==0){
_31(_90,_91.parent);
}
var _94=tr.children("td[field="+_92.treeField+"]").children("div.datagrid-cell");
var _95=_94.children("span.tree-icon");
if(_95.hasClass("tree-file")){
_95.removeClass("tree-file").addClass("tree-folder");
var hit=$("<span class=\"tree-hit tree-expanded\"></span>").insertBefore(_95);
if(hit.prev().length){
hit.prev().remove();
}
}
}
_39(_90,_91.parent,_91.data,true);
};
function _96(_97,_98){
var _99=$.data(_97,"treegrid").options;
var tr=_99.finder.getTr(_97,_98);
tr.next("tr.treegrid-tr-tree").remove();
tr.remove();
var _9a=del(_98);
if(_9a){
if(_9a.children.length==0){
tr=_99.finder.getTr(_97,_9a[_99.idField]);
tr.next("tr.treegrid-tr-tree").remove();
var _9b=tr.children("td[field="+_99.treeField+"]").children("div.datagrid-cell");
_9b.find(".tree-icon").removeClass("tree-folder").addClass("tree-file");
_9b.find(".tree-hit").remove();
$("<span class=\"tree-indent\"></span>").prependTo(_9b);
}
}
_2a(_97);
function del(id){
var cc;
var _9c=_55(_97,_98);
if(_9c){
cc=_9c.children;
}else{
cc=$(_97).treegrid("getData");
}
for(var i=0;i<cc.length;i++){
if(cc[i][_99.idField]==id){
cc.splice(i,1);
break;
}
}
return _9c;
};
};
$.fn.treegrid=function(_9d,_9e){
if(typeof _9d=="string"){
var _9f=$.fn.treegrid.methods[_9d];
if(_9f){
return _9f(this,_9e);
}else{
return this.datagrid(_9d,_9e);
}
}
_9d=_9d||{};
return this.each(function(){
var _a0=$.data(this,"treegrid");
if(_a0){
$.extend(_a0.options,_9d);
}else{
$.data(this,"treegrid",{options:$.extend({},$.fn.treegrid.defaults,$.fn.treegrid.parseOptions(this),_9d),data:[]});
}
_5(this);
_20(this);
_2d(this);
});
};
$.fn.treegrid.methods={options:function(jq){
return $.data(jq[0],"treegrid").options;
},resize:function(jq,_a1){
return jq.each(function(){
$(this).datagrid("resize",_a1);
});
},fixRowHeight:function(jq,_a2){
return jq.each(function(){
_21(this,_a2);
});
},loadData:function(jq,_a3){
return jq.each(function(){
_39(this,null,_a3);
});
},reload:function(jq,id){
return jq.each(function(){
if(id){
var _a4=$(this).treegrid("find",id);
if(_a4.children){
_a4.children.splice(0,_a4.children.length);
}
var _a5=$(this).datagrid("getPanel").find("div.datagrid-body");
var tr=_a5.find("tr[node-id="+id+"]");
tr.next("tr.treegrid-tr-tree").remove();
var hit=tr.find("span.tree-hit");
hit.removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed");
_78(this,id);
}else{
_20(this,null,{});
}
});
},reloadFooter:function(jq,_a6){
return jq.each(function(){
var _a7=$.data(this,"treegrid").options;
var dc=$.data(this,"datagrid").dc;
if(_a6){
$.data(this,"treegrid").footer=_a6;
}
if(_a7.showFooter){
_a7.view.renderFooter.call(_a7.view,this,dc.footer1,true);
_a7.view.renderFooter.call(_a7.view,this,dc.footer2,false);
if(_a7.view.onAfterRender){
_a7.view.onAfterRender.call(_a7.view,this);
}
$(this).treegrid("fixRowHeight");
}
});
},loading:function(jq){
return jq.each(function(){
$(this).datagrid("loading");
});
},loaded:function(jq){
return jq.each(function(){
$(this).datagrid("loaded");
});
},getData:function(jq){
return $.data(jq[0],"treegrid").data;
},getFooterRows:function(jq){
return $.data(jq[0],"treegrid").footer;
},getRoot:function(jq){
return _50(jq[0]);
},getRoots:function(jq){
return _53(jq[0]);
},getParent:function(jq,id){
return _55(jq[0],id);
},getChildren:function(jq,id){
return _26(jq[0],id);
},getSelected:function(jq){
return _62(jq[0]);
},getSelections:function(jq){
return _65(jq[0]);
},getLevel:function(jq,id){
return _69(jq[0],id);
},find:function(jq,id){
return _40(jq[0],id);
},isLeaf:function(jq,id){
var _a8=$.data(jq[0],"treegrid").options;
var tr=_a8.finder.getTr(jq[0],id);
var hit=tr.find("span.tree-hit");
return hit.length==0;
},select:function(jq,id){
return jq.each(function(){
$(this).datagrid("selectRow",id);
});
},unselect:function(jq,id){
return jq.each(function(){
$(this).datagrid("unselectRow",id);
});
},collapse:function(jq,id){
return jq.each(function(){
_74(this,id);
});
},expand:function(jq,id){
return jq.each(function(){
_78(this,id);
});
},toggle:function(jq,id){
return jq.each(function(){
_30(this,id);
});
},collapseAll:function(jq,id){
return jq.each(function(){
_81(this,id);
});
},expandAll:function(jq,id){
return jq.each(function(){
_86(this,id);
});
},expandTo:function(jq,id){
return jq.each(function(){
_8b(this,id);
});
},append:function(jq,_a9){
return jq.each(function(){
_8f(this,_a9);
});
},remove:function(jq,id){
return jq.each(function(){
_96(this,id);
});
},refresh:function(jq,id){
return jq.each(function(){
var _aa=$.data(this,"treegrid").options;
_aa.view.refreshRow.call(_aa.view,this,id);
});
},beginEdit:function(jq,id){
return jq.each(function(){
$(this).datagrid("beginEdit",id);
$(this).treegrid("fixRowHeight",id);
});
},endEdit:function(jq,id){
return jq.each(function(){
$(this).datagrid("endEdit",id);
});
},cancelEdit:function(jq,id){
return jq.each(function(){
$(this).datagrid("cancelEdit",id);
});
}};
$.fn.treegrid.parseOptions=function(_ab){
return $.extend({},$.fn.datagrid.parseOptions(_ab),$.parser.parseOptions(_ab,["treeField",{animate:"boolean"}]));
};
var _ac=$.extend({},$.fn.datagrid.defaults.view,{render:function(_ad,_ae,_af){
var _b0=$.data(_ad,"treegrid").options;
var _b1=$(_ad).datagrid("getColumnFields",_af);
var _b2=$.data(_ad,"datagrid").rowIdPrefix;
if(_af){
if(!(_b0.rownumbers||(_b0.frozenColumns&&_b0.frozenColumns.length))){
return;
}
}
var _b3=this;
var _b4=_b5(_af,this.treeLevel,this.treeNodes);
$(_ae).append(_b4.join(""));
function _b5(_b6,_b7,_b8){
var _b9=["<table class=\"datagrid-btable\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>"];
for(var i=0;i<_b8.length;i++){
var row=_b8[i];
if(row.state!="open"&&row.state!="closed"){
row.state="open";
}
var _ba=_b0.rowStyler?_b0.rowStyler.call(_ad,row):"";
var _bb=_ba?"style=\""+_ba+"\"":"";
var _bc=_b2+"-"+(_b6?1:2)+"-"+row[_b0.idField];
_b9.push("<tr id=\""+_bc+"\" class=\"datagrid-row\" node-id="+row[_b0.idField]+" "+_bb+">");
_b9=_b9.concat(_b3.renderRow.call(_b3,_ad,_b1,_b6,_b7,row));
_b9.push("</tr>");
if(row.children&&row.children.length){
var tt=_b5(_b6,_b7+1,row.children);
var v=row.state=="closed"?"none":"block";
_b9.push("<tr class=\"treegrid-tr-tree\"><td style=\"border:0px\" colspan="+(_b1.length+(_b0.rownumbers?1:0))+"><div style=\"display:"+v+"\">");
_b9=_b9.concat(tt);
_b9.push("</div></td></tr>");
}
}
_b9.push("</tbody></table>");
return _b9;
};
},renderFooter:function(_bd,_be,_bf){
var _c0=$.data(_bd,"treegrid").options;
var _c1=$.data(_bd,"treegrid").footer||[];
var _c2=$(_bd).datagrid("getColumnFields",_bf);
var _c3=["<table class=\"datagrid-ftable\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>"];
for(var i=0;i<_c1.length;i++){
var row=_c1[i];
row[_c0.idField]=row[_c0.idField]||("foot-row-id"+i);
_c3.push("<tr class=\"datagrid-row\" node-id="+row[_c0.idField]+">");
_c3.push(this.renderRow.call(this,_bd,_c2,_bf,0,row));
_c3.push("</tr>");
}
_c3.push("</tbody></table>");
$(_be).html(_c3.join(""));
},renderRow:function(_c4,_c5,_c6,_c7,row){
var _c8=$.data(_c4,"treegrid").options;
var cc=[];
if(_c6&&_c8.rownumbers){
cc.push("<td class=\"datagrid-td-rownumber\"><div class=\"datagrid-cell-rownumber\">0</div></td>");
}
for(var i=0;i<_c5.length;i++){
var _c9=_c5[i];
var col=$(_c4).datagrid("getColumnOption",_c9);
if(col){
var _ca=col.styler?(col.styler(row[_c9],row)||""):"";
var _cb=col.hidden?"style=\"display:none;"+_ca+"\"":(_ca?"style=\""+_ca+"\"":"");
cc.push("<td field=\""+_c9+"\" "+_cb+">");
if(col.checkbox){
var _cb="";
}else{
var _cb="";
_cb+="text-align:"+(col.align||"left")+";";
if(!_c8.nowrap){
_cb+="white-space:normal;height:auto;";
}else{
if(_c8.autoRowHeight){
_cb+="height:auto;";
}
}
}
cc.push("<div style=\""+_cb+"\" ");
if(col.checkbox){
cc.push("class=\"datagrid-cell-check ");
}else{
cc.push("class=\"datagrid-cell "+col.cellClass);
}
cc.push("\">");
if(col.checkbox){
if(row.checked){
cc.push("<input type=\"checkbox\" checked=\"checked\"");
}else{
cc.push("<input type=\"checkbox\"");
}
cc.push(" name=\""+_c9+"\" value=\""+(row[_c9]!=undefined?row[_c9]:"")+"\"/>");
}else{
var val=null;
if(col.formatter){
val=col.formatter(row[_c9],row);
}else{
val=row[_c9];
}
if(_c9==_c8.treeField){
for(var j=0;j<_c7;j++){
cc.push("<span class=\"tree-indent\"></span>");
}
if(row.state=="closed"){
cc.push("<span class=\"tree-hit tree-collapsed\"></span>");
cc.push("<span class=\"tree-icon tree-folder "+(row.iconCls?row.iconCls:"")+"\"></span>");
}else{
if(row.children&&row.children.length){
cc.push("<span class=\"tree-hit tree-expanded\"></span>");
cc.push("<span class=\"tree-icon tree-folder tree-folder-open "+(row.iconCls?row.iconCls:"")+"\"></span>");
}else{
cc.push("<span class=\"tree-indent\"></span>");
cc.push("<span class=\"tree-icon tree-file "+(row.iconCls?row.iconCls:"")+"\"></span>");
}
}
cc.push("<span class=\"tree-title\">"+val+"</span>");
}else{
cc.push(val);
}
}
cc.push("</div>");
cc.push("</td>");
}
}
return cc.join("");
},refreshRow:function(_cc,id){
var row=$(_cc).treegrid("find",id);
var _cd=$.data(_cc,"treegrid").options;
var _ce=_cd.rowStyler?_cd.rowStyler.call(_cc,row):"";
var _cf=_ce?_ce:"";
var tr=_cd.finder.getTr(_cc,id);
tr.attr("style",_cf);
tr.children("td").each(function(){
var _d0=$(this).find("div.datagrid-cell");
var _d1=$(this).attr("field");
var col=$(_cc).datagrid("getColumnOption",_d1);
if(col){
var _d2=col.styler?(col.styler(row[_d1],row)||""):"";
var _d3=col.hidden?"display:none;"+_d2:(_d2?_d2:"");
$(this).attr("style",_d3);
var val=null;
if(col.formatter){
val=col.formatter(row[_d1],row);
}else{
val=row[_d1];
}
if(_d1==_cd.treeField){
_d0.children("span.tree-title").html(val);
var cls="tree-icon";
var _d4=_d0.children("span.tree-icon");
if(_d4.hasClass("tree-folder")){
cls+=" tree-folder";
}
if(_d4.hasClass("tree-folder-open")){
cls+=" tree-folder-open";
}
if(_d4.hasClass("tree-file")){
cls+=" tree-file";
}
if(row.iconCls){
cls+=" "+row.iconCls;
}
_d4.attr("class",cls);
}else{
_d0.html(val);
}
}
});
$(_cc).treegrid("fixRowHeight",id);
},onBeforeRender:function(_d5,_d6,_d7){
if(!_d7){
return false;
}
var _d8=$.data(_d5,"treegrid").options;
if(_d7.length==undefined){
if(_d7.footer){
$.data(_d5,"treegrid").footer=_d7.footer;
}
if(_d7.total){
$.data(_d5,"treegrid").total=_d7.total;
}
_d7=this.transfer(_d5,_d6,_d7.rows);
}else{
function _d9(_da,_db){
for(var i=0;i<_da.length;i++){
var row=_da[i];
row._parentId=_db;
if(row.children&&row.children.length){
_d9(row.children,row[_d8.idField]);
}
}
};
_d9(_d7,_d6);
}
var _dc=_40(_d5,_d6);
if(_dc){
if(_dc.children){
_dc.children=_dc.children.concat(_d7);
}else{
_dc.children=_d7;
}
}else{
$.data(_d5,"treegrid").data=$.data(_d5,"treegrid").data.concat(_d7);
}
if(!_d8.remoteSort){
this.sort(_d5,_d7);
}
this.treeNodes=_d7;
this.treeLevel=$(_d5).treegrid("getLevel",_d6);
},sort:function(_dd,_de){
var _df=$.data(_dd,"treegrid").options;
var opt=$(_dd).treegrid("getColumnOption",_df.sortName);
if(opt){
var _e0=opt.sorter||function(a,b){
return (a>b?1:-1);
};
_e1(_de);
}
function _e1(_e2){
_e2.sort(function(r1,r2){
return _e0(r1[_df.sortName],r2[_df.sortName])*(_df.sortOrder=="asc"?1:-1);
});
for(var i=0;i<_e2.length;i++){
var _e3=_e2[i].children;
if(_e3&&_e3.length){
_e1(_e3);
}
}
};
},transfer:function(_e4,_e5,_e6){
var _e7=$.data(_e4,"treegrid").options;
var _e8=[];
for(var i=0;i<_e6.length;i++){
_e8.push(_e6[i]);
}
var _e9=[];
for(var i=0;i<_e8.length;i++){
var row=_e8[i];
if(!_e5){
if(!row._parentId){
_e9.push(row);
_3(_e8,row);
i--;
}
}else{
if(row._parentId==_e5){
_e9.push(row);
_3(_e8,row);
i--;
}
}
}
var _ea=[];
for(var i=0;i<_e9.length;i++){
_ea.push(_e9[i]);
}
while(_ea.length){
var _eb=_ea.shift();
for(var i=0;i<_e8.length;i++){
var row=_e8[i];
if(row._parentId==_eb[_e7.idField]){
if(_eb.children){
_eb.children.push(row);
}else{
_eb.children=[row];
}
_ea.push(row);
_3(_e8,row);
i--;
}
}
}
return _e9;
}});
$.fn.treegrid.defaults=$.extend({},$.fn.datagrid.defaults,{treeField:null,animate:false,singleSelect:true,view:_ac,loader:function(_ec,_ed,_ee){
var _ef=$(this).treegrid("options");
if(!_ef.url){
return false;
}
$.ajax({type:_ef.method,url:_ef.url,data:_ec,dataType:"json",success:function(_f0){
_ed(_f0);
},error:function(){
_ee.apply(this,arguments);
}});
},loadFilter:function(_f1,_f2){
return _f1;
},finder:{getTr:function(_f3,id,_f4,_f5){
_f4=_f4||"body";
_f5=_f5||0;
var dc=$.data(_f3,"datagrid").dc;
if(_f5==0){
var _f6=$.data(_f3,"treegrid").options;
var tr1=_f6.finder.getTr(_f3,id,_f4,1);
var tr2=_f6.finder.getTr(_f3,id,_f4,2);
return tr1.add(tr2);
}else{
if(_f4=="body"){
var tr=$("#"+$.data(_f3,"datagrid").rowIdPrefix+"-"+_f5+"-"+id);
if(!tr.length){
tr=(_f5==1?dc.body1:dc.body2).find("tr[node-id="+id+"]");
}
return tr;
}else{
if(_f4=="footer"){
return (_f5==1?dc.footer1:dc.footer2).find("tr[node-id="+id+"]");
}else{
if(_f4=="selected"){
return (_f5==1?dc.body1:dc.body2).find("tr.datagrid-row-selected");
}else{
if(_f4=="last"){
return (_f5==1?dc.body1:dc.body2).find("tr:last[node-id]");
}else{
if(_f4=="allbody"){
return (_f5==1?dc.body1:dc.body2).find("tr[node-id]");
}else{
if(_f4=="allfooter"){
return (_f5==1?dc.footer1:dc.footer2).find("tr[node-id]");
}
}
}
}
}
}
}
},getRow:function(_f7,id){
return $(_f7).treegrid("find",id);
}},onBeforeLoad:function(row,_f8){
},onLoadSuccess:function(row,_f9){
},onLoadError:function(){
},onBeforeCollapse:function(row){
},onCollapse:function(row){
},onBeforeExpand:function(row){
},onExpand:function(row){
},onClickRow:function(row){
},onDblClickRow:function(row){
},onClickCell:function(_fa,row){
},onDblClickCell:function(_fb,row){
},onContextMenu:function(e,row){
},onBeforeEdit:function(row){
},onAfterEdit:function(row,_fc){
},onCancelEdit:function(row){
}});
})(jQuery);

