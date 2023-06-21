/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "devicerecognition/model/models",
    // "com/minol/util/framework/ui5/common/web/classes/Translation",
    // "sap/m/Button", 
    // "sap/m/Dialog",
    //  "sap/m/Text"
],
    function (UIComponent, Device, models){ //Translation, Button, Dialog, Text) {
        "use strict";

        return UIComponent.extend("devicerecognition.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                //Calling the selection screen
                //jQuery.sap.registerModulePath("Selection_Screen", "../ZPROPSELECT");

                // set i18n model
                // var i18nModel = UtilTranslation.readI18n(this,
                //     "devicerecognition/webapp/i18n/i18n.properties","devicerecognition"); 
                //  com.minol.util.framework.ui5.common.web.classes.Formatter.setDeviceModel(this);

                // enable routing
                this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");
            }
        });
    }
);