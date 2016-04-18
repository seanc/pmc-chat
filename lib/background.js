/* global chrome */

chrome.extension.onMessage.addListener(function(req, sender, res) {
  chrome.runtime.onConnect.addListener(function(port) {
    port.sendMessage(req);
  });
});

chrome.runtime.onConnect.addListener(function(port){
  port.postMessage({greeting:"hello"});
});
