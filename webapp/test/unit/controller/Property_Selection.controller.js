/*global QUnit*/

sap.ui.define([
	"device_recognition/controller/Property_Selection.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Property_Selection Controller");

	QUnit.test("I should test the Property_Selection controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
