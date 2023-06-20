sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Core",
    "sap/ui/layout/HorizontalLayout",
    "sap/ui/layout/VerticalLayout",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/Label",
    "sap/m/library",
    "sap/m/MessageToast",
    "sap/m/Text",
    "sap/m/TextArea",

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Core, HorizontalLayout, VerticalLayout, Dialog, Button, Label, mobileLibrary, MessageToast, Text, TextArea, jQuery) {
        "use strict";

        // shortcut for sap.m.ButtonType

        // @ts-ignore
        var ButtonType = mobileLibrary.ButtonType;

        // shortcut for sap.m.DialogType

        // @ts-ignore
        var DialogType = mobileLibrary.DialogType;

        var oModelJSON = new sap.ui.model.json.JSONModel();

        var propertyValue;
        return Controller.extend("devicerecognition.controller.Auswahl_Loschen", {
            onInit: function () {
                // @ts-ignore
                var loRouter = sap.ui.core.UIComponent.getRouterFor(this);
                loRouter.getRoute("propertiesDelete").attachMatched(this._onRouteMatched, this);
            },
            _onRouteMatched: function (oEvent) {
                var oArgs, oView;
                var that = this;
                oArgs = oEvent.getParameter("arguments");
                oView = this.getView();


                oView.bindElement({
                    path: "/lgSet(" + oArgs.Tplnr + ")",
                    events: {
                        // @ts-ignore
                        dataRequested: function (oEvent) {
                            oView.setBusy(true);
                        },
                        // @ts-ignore
                        // @ts-ignore
                        dataReceived: function (oEvent) {
                            oView.setBusy(false);
                        }
                    }
                });
                // @ts-ignore
                propertyValue = oArgs.Tplnr;
                // @ts-ignore
                this.getView().byId("ALPropTxtId").setText(propertyValue);
                //console.log("propertyValue: " + propertyValue);
                var oModel = this.getOwnerComponent().getModel();
                var propertyNumber = propertyValue;
                // @ts-ignore
                oModel.read("/lgSet" + "('" + propertyNumber + "')", {
                    urlParameters: {
                        "$expand": ["suggestions,messages,pictures,bewqueue"],
                    },
                    // @ts-ignore
                    success: function (data, response) {
                        oModelJSON.setData(data.bewqueue.results);
                        that.getView().setModel(oModelJSON, "myAlias");
                        // alert("Success");
                    },
                    error: function (response) {
                        console.log("Error Occured:" + response);
                        alert("Error");
                    }
                });
            },
            onSelectionClearance: function () {
                var that = this;
                // @ts-ignore
                var selectedItems = this.getView().byId("ALTableId").getSelectedItems();
                var len = selectedItems.length;
                if (len == 0) {
                    MessageToast.show("No Selections made. Please try again! ");
                }
                else {
                    // @ts-ignore
                    if (!this.oApproveDialog) {
                        // @ts-ignore
                        this.oApproveDialog = new Dialog({
                            type: "Message",
                            title: "Confirmation",
                            content: new Text({ text: 'Are you sure to delete selected stocks?' }),
                            beginButton: new Button({
                                text: "Yes",
                                press: function () {
                                    that.OnDeleteItems();
                                    MessageToast.show("Successfully deleted the selected stocks!");
                                    this.oApproveDialog.close();
                                }.bind(this)
                            }),
                            endButton: new Button({
                                text: "Cancel",
                                press: function () {
                                    this.oApproveDialog.close();
                                }.bind(this)
                            })
                        });
                    }

                    // @ts-ignore
                    this.oApproveDialog.open();
                }
            },

            // @ts-ignore
            OnDeleteItems: function (oEvent) {
                var oModel = this.getOwnerComponent().getModel();
                // @ts-ignore
                var selectedItems = this.getView().byId("ALTableId").getSelectedItems();
                //var oEntry = selectedItems.getBindingContext();
                //console.log(selectedItems);
                //console.log(oEntry);
                var selectedItemsValue = [];
                var obj = {};
                //suggestions,messages,pictures,bewqueue"
                obj.suggestions = [];
                obj.pictures = [];
                // obj.bewtype = [];
                obj.messages = [
                    {
                        type: "",
                        id: "",
                        number: "000",
                        message: "",
                        messagev1: "",
                        messagev2: "",
                        messagev3: "",
                        messagev4: ""
                    }
                ];
                for (var i = 0; i < selectedItems.length; i++) {
                    var contextSelected = selectedItems[i].getBindingContext("myAlias");
                    selectedItemsValue.push({
                        zznutzeinheit: contextSelected.getProperty("zznutzeinheit"),
                        zzgernr: contextSelected.getProperty("zzgernr"),
                        point: contextSelected.getProperty("point"),
                        gueltigbis: contextSelected.getProperty("gueltigbis"),
                        gueltigab: contextSelected.getProperty("gueltigab")
                    });
                }
                //console.log(selectedItemsValue);
                obj.bewqueue = selectedItemsValue;
                obj.tplnr = propertyValue;
                // @ts-ignore
                var oModelJSON = new sap.ui.model.json.JSONModel();
                // @ts-ignore
                var that = this;
                // @ts-ignore
                oModel.create("/lgSet", obj, {
                    // @ts-ignore
                    success: function (data, response) {
                        //MessageToast.show("Data successfully posted");

                        //console.log();
                    },
                    // @ts-ignore
                    error: function (error) {
                        MessageToast.show("Error Occured when posting the data");
                    }
                });
            },
            // @ts-ignore
            onBack: function () {
                // @ts-ignore
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("propertyDelete", {
                    Tplnr: propertyValue
                });

            }
        });
    });
