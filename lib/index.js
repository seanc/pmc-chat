/* global $, SETTINGS */

var settings = $.jStorage.get('settings', {});
$('input[id]').each(function() {
  if (!$.isEmptyObject(settings)) {
    for (var setting in settings) {
      if ($(this).attr('id') === setting) {
        $(this).val(settings[setting]);
      }
    }
    return SETTINGS.setSettings(settings);
  }
  SETTINGS.setSetting($(this).attr('id'), '');
});

$('input[id]').on('keyup change', function(e) {
  var element = $(e.target);
  SETTINGS
    .setSetting(element.attr('id'), element.val())
    .sendSettings({active: true, currentWindow: true}, null);
});

$('form').on('submit', function(e) {
  e.preventDefault();
  $('input[id]').each(function() {
    SETTINGS.setSetting($(this).attr('id'), $(this).val());
  });
  $.jStorage.set('settings', SETTINGS.getSettings());
});
