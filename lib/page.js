/* global chrome, $ */

var settingMap = {
  backgroundColor: {
    selectors: ['.messageList'],
    props: ['background-color']
  },
  // dialogTextColor: {
  //   selectors: [''],
  //   props: ['color']
  // },
  inputBoxColor: {
    selectors: ['#chatBottom #text'],
    props: ['color']
  },
  modernMessageBackground: {
    selectors: ['#chat[data-theme="modern"] .textContainer'],
    props: ['background-color']
  },
  modernOwnMessageBackground: {
    selectors: ['#chat[data-theme="modern"] .own-message .textContainer'],
    props: ['background-color']
  },
  textColor: {
    selectors: ['#chat'],
    props: ['color']
  }
};

var generateCSS = function(settings, map) {
  var css = '';

  for (var key in map) {
    if (map.hasOwnProperty(key)) {
      var setting = map[key];
      /* eslint-disable no-loop-func */
      setting.selectors.forEach(function(selector) {
        css += selector + '{';
        setting.props.forEach(function(prop) {
          css += prop + ':' + settings[key] + ' !important;';
        });
        css += '}';
      });
    }
  }

  return css;
};

var displayCSS = function(css) {
  var styleSheet = $('<style id="pmc-chat"></style>').html(css);
  $('head').append(styleSheet);
};

(function($, displayCSS, generateCSS) {
  var settings = $.jStorage.get('settings', {});
  if (!$.isEmptyObject(settings)) {
    var css = generateCSS(settings, settingMap);
    return displayCSS(css);
  }
  console.log('Settings not loaded');
})($, displayCSS, generateCSS);

chrome.runtime.onMessage.addListener(function(req) {
  var css = generateCSS(req, settingMap);
  displayCSS(css);
  $.jStorage.set('settings', req);
});
