sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/comp/library","sap/ui/model/type/String","sap/m/ColumnListItem","sap/m/Label","sap/m/SearchField","sap/m/Token","sap/ui/model/Filter","sap/ui/model/FilterOperator","sap/ui/model/odata/v2/ODataModel","sap/ui/table/Column","sap/m/Column","sap/m/Text","sap/ui/core/Fragment","sap/ui/model/json/JSONModel"],function(e,t,n,o,a,l,i,r,s,u,p,d,g,m,h){"use strict";return e.extend("devicerecognition.controller.Property_Selection",{onInit:function(){var e=this.getOwnerComponent().getModel("Z_MARABR_LG_SRV");this.oModel=this.getOwnerComponent().getModel("Z_MARABR_LG_SRV")},onAfterRendering:function(){},onFilterBarSearch:function(){var e=[];var t=this._oVHD.getFilterBar().getFilterGroupItems()[0].getControl().getValue();var n=this._oVHD.getFilterBar().getFilterGroupItems()[3].getControl().getValue();var o=this._oVHD.getFilterBar().getFilterGroupItems()[4].getControl().getValue();var a=this._oVHD.getFilterBar().getFilterGroupItems()[2].getControl().getValue();var l=this._oVHD.getFilterBar().getFilterGroupItems()[1].getControl().getValue();var i=this._oVHD.getFilterBar().getFilterGroupItems()[5].getControl().getValue();if(t){e.push(new sap.ui.model.Filter("tplnr","EQ",t))}if(n){e.push(new sap.ui.model.Filter("postCode1","EQ",n))}if(o){e.push(new sap.ui.model.Filter("city1","EQ",o))}if(a){e.push(new sap.ui.model.Filter("houseNum1","EQ",a))}if(l){e.push(new sap.ui.model.Filter("street","EQ",l))}if(i){e.push(new sap.ui.model.Filter("objnr","EQ",i))}this.oModel.read("/SH01Set",{filters:e,success:jQuery.proxy(function(e){debugger;var t=new sap.ui.model.json.JSONModel(e);t.setSizeLimit(e.results.length);this._oVHD.getTable().setModel(t)},this),error:jQuery.proxy(function(e){debugger},this)})},onSearch:function(e){var t=this.byId("PSTplnrInput").getValue();const n=new h({propNum:t});this.getView().setModel(n,"textModel");this._oBasicSearchField=new l;if(!this.pDialog){this.pDialog=new sap.ui.xmlfragment("devicerecognition.view.Selection",this);this.getView().addDependent(this.pDialog);this.pDialog.addStyleClass("sapUiSizeCompact")}this._oVHD=this.pDialog;var i=this.pDialog.getFilterBar();i.setFilterBarExpanded(false);this.pDialog.getTableAsync().then(function(e){if(e.bindRows){e.removeAllColumns();e.bindAggregation("rows",{path:"/results",events:{dataReceived:function(){this.pDialog.update()}}});var t=this.getOwnerComponent().getModel("i18n").getResourceBundle();e.addColumn(new p({label:t.getText("FunLoc"),template:"tplnr"}));e.addColumn(new p({label:t.getText("Name1"),template:"name1"}));e.addColumn(new p({label:t.getText("Name2"),template:"name2"}));e.addColumn(new p({label:t.getText("Plz"),template:"postCode1"}));e.addColumn(new p({label:t.getText("Ort"),template:"city1"}));e.addColumn(new p({label:t.getText("Street"),template:"street"}));e.addColumn(new p({label:t.getText("HsNum"),template:"houseNum1"}))}if(e.bindItems){e.removeAllColumns();e.bindAggregation("items",{path:"/results",template:new o({cells:[new a({text:"{tplnr}"}),new a({text:"{name1}"}),new a({text:"{name2}"}),new a({text:"{postCode1}"}),new a({text:"{city1}"}),new a({text:"{street}"}),new a({text:"{houseNum1}"})]}),events:{dataReceived:function(){this.pDialog.update()}}});var t=this.getOwnerComponent().getModel("i18n").getResourceBundle();e.addColumn(new d({header:new a({text:t.getText("FunLoc")})}));e.addColumn(new d({header:new a({text:t.getText("Name1")})}));e.addColumn(new d({header:new a({text:t.getText("Name2")})}));e.addColumn(new d({header:new a({text:t.getText("Plz")})}));e.addColumn(new d({header:new a({text:t.getText("Ort")})}));e.addColumn(new d({header:new a({text:t.getText("Street")})}));e.addColumn(new d({header:new a({text:t.getText("HsNum")})}))}this.pDialog.update()}.bind(this));this._bDialogInitialized=true;var r=new sap.ui.model.json.JSONModel([]);this._oVHD.getTable().setModel(r);var s=this.byId("PSTplnrInput").getValue();var u=s?true:false;var i=this.pDialog.getFilterBar();i.setFilterBarExpanded(u);this._oVHD.getFilterBar().getFilterGroupItems()[0].getControl().setValue(s);this.pDialog.open()},onchangeTplnr:function(e){var t=e.getParameter("value");if(t){var n=new RegExp("^\\d*$");if(!n.test(t)){e.getSource().setValue(t.substr(0,t.length-1))}}},onSubmitTplnr:function(){this.onContinue()},onValueHelpOkPress:function(e){var t=this;var n=this._oVHD.getTable().getModel().getData().results;var o=this._oVHD.getTable().getSelectedIndex();var a=n[o].tplnr;var l=this.getOwnerComponent().getRouter();l.navTo("propertyDelete",{Tplnr:a})},handleCloseMsg:function(e){e.getSource().setVisible(false)},onValueHelpCancelPress:function(){this._oVHD.close()},onContinue:function(){var e=this.byId("PSTplnrInput").getValue();if(e===""){sap.m.MessageToast.show("please enter a valid property number");return}if(e){var t=sap.ui.core.UIComponent.getRouterFor(this);t.navTo("propertyDelete",{Tplnr:e})}}})});
//# sourceMappingURL=Property_Selection.controller.js.map