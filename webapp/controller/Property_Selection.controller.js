sap.ui.define(["sap/ui/core/mvc/Controller", "sap/ui/comp/library", "sap/ui/model/type/String", "sap/m/ColumnListItem", "sap/m/Label", "sap/m/SearchField", "sap/m/Token", "sap/ui/model/Filter", "sap/ui/model/FilterOperator", "sap/ui/model/odata/v2/ODataModel", "sap/ui/table/Column", "sap/m/Column", "sap/m/Text", "sap/ui/core/Fragment",
"sap/ui/model/json/JSONModel"], function(e, t, i, s, l, n, r, o, a, u, d, p, g, h, JSONModel) {
    "use strict";
    //var tt;
        return e.extend("devicerecognition.controller.Property_Selection", {
            onInit: function () {
                this.oModel = this.getOwnerComponent().getModel("Z_MARABR_LG_SRV");
                // this.byId("tplnrInput").setValue("");
            },
            onAfterRendering:function(){
                // this.byId("tplnrInput").setValue("");
            },
            onFilterBarSearch: function() {
                var e = [];
                var t = this._oVHD.getFilterBar().getFilterGroupItems()[0].getControl().getValue();
                var i = this._oVHD.getFilterBar().getFilterGroupItems()[3].getControl().getValue();
                var s = this._oVHD.getFilterBar().getFilterGroupItems()[4].getControl().getValue();
                var l = this._oVHD.getFilterBar().getFilterGroupItems()[2].getControl().getValue();
                var n = this._oVHD.getFilterBar().getFilterGroupItems()[1].getControl().getValue();
                var r = this._oVHD.getFilterBar().getFilterGroupItems()[5].getControl().getValue();
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
                if (r) {
                    e.push(new sap.ui.model.Filter("objnr", "EQ", r))
                }
                this.oModel.read("/SH01Set", {
                    filters: e,
                    success: jQuery.proxy(function(e) {
                        debugger;
                        var t = new sap.ui.model.json.JSONModel(e);
                        t.setSizeLimit(e.results.length);
                        this._oVHD.getTable().setModel(t)
                    }, this),
                    error: jQuery.proxy(function(e) {
                        debugger
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
                }
                this._oVHD = this.pDialog;
                var t = this.pDialog.getFilterBar();
                t.setFilterBarExpanded(false);
                this.pDialog.getTableAsync().then(function(e) {
                    if (e.bindRows) {
                        e.removeAllColumns();
                        e.bindAggregation("rows", {
                            path: "/results",
                            events: {
                                dataReceived: function() {
                                    this.pDialog.update()
                                }
                            }
                        });
                        var t = this.getOwnerComponent().getModel("i18n").getResourceBundle();
                        e.addColumn(new d({
                            label: t.getText("FunLoc"),
                            template: "tplnr"
                        }));
                        e.addColumn(new d({
                            label: t.getText("Name1"),
                            template: "name1"
                        }));
                        e.addColumn(new d({
                            label: t.getText("Name2"),
                            template: "name2"
                        }));
                        e.addColumn(new d({
                            label: t.getText("Plz"),
                            template: "postCode1"
                        }));
                        e.addColumn(new d({
                            label: t.getText("Ort"),
                            template: "city1"
                        }));
                        e.addColumn(new d({
                            label: t.getText("Street"),
                            template: "street"
                        }));
                        e.addColumn(new d({
                            label: t.getText("HsNum"),
                            template: "houseNum1"
                        }))
                    }
                    if (e.bindItems) {
                        e.removeAllColumns();
                        e.bindAggregation("items", {
                            path: "/results",
                            template: new s({
                                cells: [new l({
                                    text: "{tplnr}"
                                }), new l({
                                    text: "{name1}"
                                }), new l({
                                    text: "{name2}"
                                }), new l({
                                    text: "{postCode1}"
                                }), new l({
                                    text: "{city1}"
                                }), new l({
                                    text: "{street}"
                                }), new l({
                                    text: "{houseNum1}"
                                })]
                            }),
                            events: {
                                dataReceived: function() {
                                    this.pDialog.update()
                                }
                            }
                        });
                        var t = this.getOwnerComponent().getModel("i18n").getResourceBundle();
                        e.addColumn(new p({
                            header: new l({
                                text: t.getText("FunLoc")
                            })
                        }));
                        e.addColumn(new p({
                            header: new l({
                                text: t.getText("Name1")
                            })
                        }));
                        e.addColumn(new p({
                            header: new l({
                                text: t.getText("Name2")
                            })
                        }));
                        e.addColumn(new p({
                            header: new l({
                                text: t.getText("Plz")
                            })
                        }));
                        e.addColumn(new p({
                            header: new l({
                                text: t.getText("Ort")
                            })
                        }));
                        e.addColumn(new p({
                            header: new l({
                                text: t.getText("Street")
                            })
                        }));
                        e.addColumn(new p({
                            header: new l({
                                text: t.getText("HsNum")
                            })
                        }))
                    }
                    this.pDialog.update()
                }.bind(this));
                this._bDialogInitialized = true;
                var i = new sap.ui.model.json.JSONModel([]);
                this._oVHD.getTable().setModel(i);
                var r = this.byId("tplnrInput").getValue();
                var o = r ? true : false;
                var t = this.pDialog.getFilterBar();
                t.setFilterBarExpanded(o);
                this._oVHD.getFilterBar().getFilterGroupItems()[0].getControl().setValue(r);
                this.pDialog.open()
                //this.onFilterBarSearch();
            }, 
            onchangeTplnr: function(e) {
                var t = e.getParameter("value");
                if (t) {
                    var i = new RegExp("^\\d*$");
                    if (!i.test(t)) {
                        e.getSource().setValue(t.substr(0, t.length - 1))
                    }
                }
            },
            onSubmitTplnr: function() {
                this.onContinue()
            },
            // PerioRead: function(e) {
            //     var t = this;
            //     var i = new sap.ui.model.Filter("tplnr", "EQ", e);
            //     this.oModel.read("/PERIO_READSet", {
            //         filters: [i],
            //         success: jQuery.proxy(function(i) {
            //             var oRouter = this.getOwnerComponent().getRouter();
            //             oRouter.navTo("propertyDelete", { Tplnr: i });
                        // t.byId("tplnrInput").setVisible(false);
                        // t.byId("searchBtn").setVisible(false);
                        //t.byId("tplnrTxt").setText(e);
                        // t.byId("tplnrTxt").setVisible(true);
                        // t.byId("AcPeriodLbl").setVisible(true);
                        // t.byId("AcPeriod").setVisible(true);
                        // t.byId("EditContinueBtn").setVisible(true);
                        // t.byId("backBtn").setVisible(true);
                        // var s = new sap.ui.model.json.JSONModel(i);
                        // this.byId("AcPeriod").setModel(s);
                        // this.byId("AcPeriod").bindAggregation("items", {
                        //     path: "/results",
                        //     template: new sap.ui.core.Item({
                        //         key: "{perio}",
                        //         text: "{gueltigabeff} - {gueltigbiseff} | {perio}"
                        //     })
                        // });
                        // var l = i.results.filter(function(e) {
                        //     if (e.kzpakt === true) {
                        //         return e
                        //     }
                        // });
                        // if (l.length > 0) {
                        //     this.byId("AcPeriod").setSelectedKey(l[0].perio)
                        // }
            //             if (this._oVHD) {
            //                 this._oVHD.close()
            //             }
            //        }, this),
            //         error: jQuery.proxy(function(e) {
            //             debugger;
            //             var t = JSON.parse(e.responseText).error.message.value;
            //             sap.m.MessageToast.show(t);
            //             if (this._oVHD) {
            //                 this._oVHD.close()
            //             }
            //         }, this)
            //     })
            // },
        
            // PerioRead: function(e) {
            //     var t = this;
            //     var i = new sap.ui.model.Filter("tplnr", "EQ", e);
            //     this.oModel.read("/PERIO_READSet", {
            //         filters: [i],
            //         success: jQuery.proxy(function(i) {
            //             var oRouter = this.getOwnerComponent().getRouter();
            //             oRouter.navTo("propertyDelete", { Tplnr: i })
            //             // t.byId("tplnrInput").setVisible(false);
            //             // t.byId("searchBtn").setVisible(false);
            //             // t.byId("tplnrInput").setText(e);
            //             // t.byId("tplnrInput").setVisible(true);
            //             // t.byId("AcPeriodLbl").setVisible(true);
            //             // t.byId("AcPeriod").setVisible(true);
            //             // t.byId("EditContinueBtn").setVisible(true);
            //             // t.byId("backBtn").setVisible(true);
            //             // var s = new sap.ui.model.json.JSONModel(i);
            //             // this.byId("AcPeriod").setModel(s);
            //             // this.byId("AcPeriod").bindAggregation("items", {
            //             //     path: "/results",
            //             //     template: new sap.ui.core.Item({
            //             //         key: "{perio}",
            //             //         text: "{gueltigabeff} - {gueltigbiseff} | {perio}"
            //             //     })
            //             // });
            //             // if (this._oVHD) {
            //             //     this._oVHD.close()
            //             // }
            //         }, this),   
            //         error: jQuery.proxy(function(e) {
            //             debugger;
            //             var t = JSON.parse(e.responseText).error.message.value;
            //             sap.m.MessageToast.show(t);
            //             if (this._oVHD) {
            //                 this._oVHD.close()
            //             }
            //         }, this)
            //     })
            // },
            onValueHelpOkPress: function(e) {
                var t = this;
                var i = this._oVHD.getTable().getModel().getData().results;
                var s = this._oVHD.getTable().getSelectedIndex();
                var l = i[s].tplnr;
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("propertyDelete", { Tplnr: l })
                //this.PerioRead(l)
            },
            handleCloseMsg: function(e) {
                e.getSource().setVisible(false)
            },
            onValueHelpCancelPress: function() {
                this._oVHD.close()
            },
            // onBack: function () {
            //     this.byId("tplnrInput").setVisible(true);
            //     this.byId("searchBtn").setVisible(true);
            //     // this.byId("tplnrInput").setText();
            //     // this.byId("tplnrInput").setVisible(false);
            //     // this.byId("AcPeriodLbl").setVisible(false);
            //     // this.byId("AcPeriod").setVisible(false);
            //     this.byId("backBtn").setVisible(false)
            // },
            onContinue: function() {
                // var i = this.byId("tplnrInput").getValue();
                // var len= i.length;
                // if (len) {
                //     var e = this.byId("tplnrInput").getText();
                //     var t = sap.ui.core.UIComponent.getRouterFor(this);
                //     t.navTo("propertyDelete", { Tplnr: e })
                // }
                // else if (i === "") {
                //         sap.m.MessageToast.show("please enter a valid property number");
                //         return
                //     }
                // else {
                //         this.PerioRead(i)
                //     }
                var propNum=this.byId("tplnrInput").getValue();
                if (propNum === "") {
                    sap.m.MessageToast.show("please enter a valid property number");
                    return
                } 
                    if (propNum) {
                        //this.PerioRead(propNum);
                        var t = sap.ui.core.UIComponent.getRouterFor(this);
                        t.navTo("propertyDelete", {
                            Tplnr: propNum
                        })
                    }
                },
            //},
            // onEditContinue: function () {
            //     var e = this.byId("tplnrInput").getText();
            //     var t = sap.ui.core.UIComponent.getRouterFor(this);
            //     t.navTo("ObjectInfo", { Tplnr: e })
            // }
        })
    });

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

    