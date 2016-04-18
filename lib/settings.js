/* global chrome */

/* eslint-disable no-unused-vars */
var SETTINGS = new (function() {
  /* eslint-enable no-unused-vars */
  this.settings = {};

  this.setSetting = function(setting, value) {
    this.settings[setting] = value;
    return this;
  };

  this.setSettings = function(settings) {
    this.settings = settings;
    return this;
  };

  this.getSettings = function() {
    return this.settings;
  };

  this.sendSettings = function(client, cb) {
    var self = this;
    chrome.tabs.query(client, function(tabs) {
      var tab = tabs[0].id;
      chrome.tabs.sendMessage(tab, self.settings, cb);
    });
    return this;
  };
})();
