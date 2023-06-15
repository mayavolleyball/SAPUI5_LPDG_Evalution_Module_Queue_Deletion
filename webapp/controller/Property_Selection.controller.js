sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/comp/library",
    "sap/ui/model/type/String",
    "sap/m/ColumnListItem",
    "sap/m/Label",
    "sap/m/SearchField",
    "sap/m/Token",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/ui/table/Column",
    "sap/m/Column",
    "sap/m/Text",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (e, t, i, s, l, n, o, a, r, u, d, p, g, m, JSONModel) {
        "use strict";
    var tt;
        return e.extend("devicerecognition.controller.Property_Selection", {
            onInit: function () {

                //this.oModel = this.getOwnerComponent().getModel();
                this.oModel = this.getOwnerComponent().getModel("Z_MARABR_LG_SRV");
                this.byId("tplnrInput").setValue("");
                //console.log(this.oModel);
                //var oModel = this.getOwnerComponent().getModel("indexModel");
                //var sURL = "http://mind38ci.minol.org:8017/sap/opu/odata/sap/Z_MARABR_LG_SRV/";
                // var oModel = new sap.ui.model.odata.v2.ODataModel(sURL);
                //console.log(oModel);
                // this.getView().setModel(oModel,"indexModel");
            },
            onAfterRendering:function(){
                this.byId("tplnrInput").setValue("");
            },
            onFilterBarSearch: function () {
                var e = [];
                // if(tt>0)
                // {
                // var t = tt;
                // var funLoc = this._oVHD.setFilterBar().setFilterGroupItems()[0].setControl().setValue(t);
                // console.log(funLoc);
                // }
                // else
                // {
                var t = this._oVHD.getFilterBar().getFilterGroupItems()[0].getControl().getValue();
                // }
                var i = this._oVHD.getFilterBar().getFilterGroupItems()[3].getControl().getValue();
                var s = this._oVHD.getFilterBar().getFilterGroupItems()[4].getControl().getValue();
                var l = this._oVHD.getFilterBar().getFilterGroupItems()[2].getControl().getValue();
                var n = this._oVHD.getFilterBar().getFilterGroupItems()[1].getControl().getValue();
                var o = this._oVHD.getFilterBar().getFilterGroupItems()[5].getControl().getValue();
                if (t) {
                    e.push(new sap.ui.model.Filter("tplnr", "EQ", t))
                }
                if (i) {
                    e.push(new sap.ui.model.Filter("postCode1", "EQ", i))
                }
                if (s) {
                    e.push(new sap.ui.model.Filter("city1", "EQ", s))
                }
                if (l) {
                    e.push(new sap.ui.model.Filter("houseNum1", "EQ", l))
                }
                if (n) {
                    e.push(new sap.ui.model.Filter("street", "EQ", n))
                }
                if (o) {
                    e.push(new sap.ui.model.Filter("objnr", "EQ", o))
                }
                this.oModel.read("/SH01Set", {
                    filters: e, success: jQuery.proxy(function (e) {
                        //debugger; 
                        var t = new sap.ui.model.json.JSONModel(e);
                        t.setSizeLimit(e.results.length);
                        this._oVHD.getTable().setModel(t)
                    }, this),
                    error: jQuery.proxy(function (e) {
                        //debugger;
                        MessageToast.show("Oops! Property doesn't exist.");
                    }, this)
                })
            },
            onSearch: function (e) {
                var myValue = this.byId("tplnrInput").getValue();
                // tt = myValue;
                // console.log(tt);
                const oTextModel = new JSONModel({
                    propNum: myValue,
                });
                this.getView().setModel(oTextModel, "textModel");
                this._oBasicSearchField = new n;
                if (!this.pDialog) {
                    this.pDialog = new sap.ui.xmlfragment("devicerecognition.view.Selection", this);
                    this.getView().addDependent(this.pDialog);
                    this.pDialog.addStyleClass("sapUiSizeCompact")
                } this._oVHD = this.pDialog;
                var t = this.pDialog.getFilterBar();
                t.setFilterBarExpanded(false);
                this.pDialog.getTableAsync().then(function (e) {
                    if (e.bindRows) {
                        e.removeAllColumns();
                        e.bindAggregation("rows", {
                            path: "/results", events: {
                                dataReceived: function () { 
                                    this.pDialog.update()
                                }
                            }
                        });
                        var t = this.getOwnerComponent().getModel("i18n").getResourceBundle();
                        e.addColumn(new d({ label: t.getText("FunLoc"), template: "tplnr" }));
                        e.addColumn(new d({ label: t.getText("Name1"), template: "name1" }));
                        e.addColumn(new d({ label: t.getText("Name2"), template: "name2" }));
                        e.addColumn(new d({ label: t.getText("Plz"), template: "postCode1" }));
                        e.addColumn(new d({ label: t.getText("Ort"), template: "city1" }));
                        e.addColumn(new d({ label: t.getText("Street"), template: "street" }));
                        e.addColumn(new d({ label: t.getText("HsNum"), template: "houseNum1" }))
                    }
                    if (e.bindItems) {
                        e.removeAllColumns();
                        e.bindAggregation("items", {
                            path: "/results",
                            template: new s({
                                cells: [new l({ text: "{tplnr}" }),
                                new l({ text: "{name1}" }), new l({ text: "{name2}" }),
                                new l({ text: "{postCode1}" }), new l({ text: "{city1}" }),
                                new l({ text: "{street}" }), new l({ text: "{houseNum1}" })]
                            }),
                            events: { dataReceived: function () { this.pDialog.update() } }
                        });
                        var t = this.getOwnerComponent().getModel("i18n").getResourceBundle();
                        e.addColumn(new p({ header: new l({ text: t.getText("FunLoc") }) }));
                        e.addColumn(new p({ header: new l({ text: t.getText("Name1") }) }));
                        e.addColumn(new p({ header: new l({ text: t.getText("Name2") }) }));
                        e.addColumn(new p({ header: new l({ text: t.getText("Plz") }) }));
                        e.addColumn(new p({ header: new l({ text: t.getText("Ort") }) }));
                        e.addColumn(new p({ header: new l({ text: t.getText("Street") }) }));
                        e.addColumn(new p({ header: new l({ text: t.getText("HsNum") }) }))
                    }
                    this.pDialog.update()
                }.bind(this)); this._bDialogInitialized = true;
                this.pDialog.open()
                this.onFilterBarSearch();
            }, 
            onValueHelpOkPress: function (e) {
                var t = this;
                var i = this._oVHD.getTable().getModel().getData().results;
                var s = this._oVHD.getTable().getSelectedIndex();
                var l = i[s].tplnr;
                var n = new sap.ui.model.Filter("tplnr", "EQ", l);
                this.oModel.read("/PERIO_READSet", {
                    filters: [n], success: jQuery.proxy(function (e) {
                        var oRouter = this.getOwnerComponent().getRouter();
                        oRouter.navTo("propertyDelete", { Tplnr: l })
                        // t.byId("searchBtn").setVisible(false);
                        // t.byId("tplnrTxt").setText(l);
                        // t.byId("tplnrTxt").setVisible(true);
                        // t.byId("AcPeriodLbl").setVisible(true);
                        // t.byId("AcPeriod").setVisible(true);
                        //t.byId("backBtn").setVisible(true);
                        this._oVHD.close()
                    }, this),
                    error: jQuery.proxy(function (e) {
                        debugger;
                        var t = JSON.parse(e.responseText).error.message.value;
                        sap.m.MessageToast.show(t); this._oVHD.close()
                    }, this)
                })
            },
            handleCloseMsg: function (e) {
                e.getSource().setVisible(false);
            },
            onValueHelpCancelPress: function () {
                this._oVHD.close();
            },
            // onBack: function () {
            //     this.byId("tplnrInput").setVisible(true);
            //     this.byId("searchBtn").setVisible(true);
            //     // this.byId("tplnrTxt").setText();
            //     // this.byId("tplnrTxt").setVisible(false);
            //     // this.byId("AcPeriodLbl").setVisible(false);
            //     // this.byId("AcPeriod").setVisible(false);
            //     this.byId("backBtn").setVisible(false)
            // },
            onContinue: function () {
                var e = this.byId("tplnrInput").getValue();
                var t = sap.ui.core.UIComponent.getRouterFor(this);
                t.navTo("propertyDelete", { Tplnr: e })
            }
            // onEditContinue: function () {
            //     var e = this.byId("tplnrTxt").getText();
            //     var t = sap.ui.core.UIComponent.getRouterFor(this);
            //     t.navTo("ObjectInfo", { Tplnr: e })
            // }
        })
    });

        //# sourceMappingURL=SelectionScreen.controller.js.map

    //         onPressNavigationForward: function(oEvent)
    //         {
    //             var oArgs, oView;
    //             var that = this;
    //             oArgs = oEvent.getParameter("arguments");
    //              console.log(oArgs.Tplnr);
    //             // @ts-ignore
    //            // var inputValue = this.getView().byId("myInput").getValue();
    //             //console.log(inputValue);
    //             // var loRouter = sap.ui.core.UIComponent.getRouterFor(this);
    //             // loRouter.navTo("propertyDelete", {
    //             //     Tplnr: inputValue
    //             // });
    //         },
    //         onInputCheck: function(){
    //             // @ts-ignore
    //             var inputValue = this.getView().byId("myInput").getValue();
    //             // @ts-ignore
    //             //console.log(inputValue);
    //         }
    //     });
    // });

    