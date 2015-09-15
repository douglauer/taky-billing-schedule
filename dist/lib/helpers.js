// Generated by IcedCoffeeScript 1.7.1-b
(function() {
  var HumanTime, helpers, human_interval, log, _,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  log = function(x) {
    try {
      return console.log(x);
    } catch (_error) {}
  };

  _ = require('lodash');

  HumanTime = require('custom-human-time');

  human_interval = require('human-interval');

  module.exports = helpers = {
    time: function() {
      return Math.round(new Date().getTime() / 1000);
    },
    type: function(obj) {
      if (obj === 'undefined' || obj === null) {
        return false;
      }
      return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
    },
    to_seconds: function(str) {
      var k, replace, v;
      replace = {
        yr: 'year',
        mo: 'month',
        wk: 'week',
        sec: 'second'
      };
      for (k in replace) {
        v = replace[k];
        if (str.indexOf(k) > -1 && !(str.indexOf(v) > -1)) {
          str = str.split(k).join(v);
        }
      }
      str = str.trim();
      try {
        return Math.round(human_interval(str) / 1000);
      } catch (_error) {
        throw new Error('Time description "' + str + '" could not be parsed');
      }
    },
    to_human: function(secs) {
      var count, i, label, labels, results, singular, str, times, _i, _len;
      secs = +secs;
      times = [secs / 60 / 60 / 24 / 365, secs / 60 / 60 / 24 / 30, secs / 60 / 60 / 24, secs / 60 / 60, secs / 60, secs];
      labels = ['year', 'month', 'day', 'hour', 'minute', 'second'];
      results = {};
      i = 0;
      for (_i = 0, _len = labels.length; _i < _len; _i++) {
        label = labels[_i];
        results[label] = times[i];
        ++i;
      }
      for (label in results) {
        count = results[label];
        if (count >= 1) {
          if (count === 1) {
            singular = true;
          } else {
            singular = false;
            if (count.toString().indexOf('.') > -1) {
              count = count.toFixed(1);
            } else {
              count = count;
            }
          }
          return str = [count, label + (!singular ? 's' : '')].join(' ');
        }
      }
      throw new Error('Failed to convert seconds to human format');
    },
    to_dollars: function(str) {
      var num;
      num = this.clean_number(str);
      return (num / 100).toFixed(2);
    },
    to_cents: function(str) {
      var num;
      num = this.clean_number(str);
      return num * 100;
    },
    clean_number: function(str) {
      var allowed, clean;
      if (typeof str !== 'string') {
        str = str.toString();
      }
      allowed = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].concat(['.']).join('').split('');
      clean = _.compact(_.map(str.split(''), function(item) {
        if (__indexOf.call(allowed, item) >= 0) {
          return item;
        }
      }));
      clean = clean.join('');
      return parseFloat(clean);
    }
  };

}).call(this);
