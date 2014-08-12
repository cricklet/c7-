define(function (require) {
  var Piano = require('piano');
  var _     = require('lib/underscore');

  var GAIN_VAL = 0.2;

  var KEYS = ['z', 's', 'x', 'd', 'c', 'v', 'g', 'b', 'h', 'n'];
  var MIDI_ROOT = 60;

  var Music = function () {
    var master = new webkitAudioContext();
    var masterGain = master.createGain();
    masterGain.gain.value = GAIN_VAL;
    masterGain.connect(master.destination);

    var toggleMute = function () {
      if (masterGain.gain.value != 0) {
        masterGain.gain.value = 0;
      } else {
        masterGain.gain.value = GAIN_VAL;
      }
    }

    var piano = new Piano(master, masterGain);

    $(document).keypress(function (e) {
      var key = String.fromCharCode(e.keyCode).toLowerCase();
      if (key == 'm') {
        toggleMute();
      }

      if (KEYS.indexOf(key) != -1) {
        var midi = _.indexOf(KEYS, key) + MIDI_ROOT;
        piano.noteDown(midi);
      }
    });

    $(document).keyup(function (e) {
      var key = String.fromCharCode(e.keyCode).toLowerCase();

      if (KEYS.indexOf(key) != -1) {
        var midi = _.indexOf(KEYS, key) + MIDI_ROOT;
        piano.noteUp(midi);
      }
    });
  }

  return Music;
});
