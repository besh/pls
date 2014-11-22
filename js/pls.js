/*!
 * Pls - A js library for handling ajax overlays and response messages
 *
 * Version:  0.1
 * Released:
 * Home:   https://github.com/hankthewhale/pls
 * Author:   Dave Beshero (http://daveb.me)
 * License:  MIT,GPL
 *
 * Copyright (c) 2014, Dave Beshero
 *
 * Dual licensed under the MIT or GPL licenses.
 * http://opensource.org/licenses/MIT OR http://www.gnu.org/licenses/gpl-2.0.html
 */

window.pls = (function () {
  function Pls (els) {
    for(var i = 0; i < els.length; i++ ) {
      this[i] = els[i];
    }
    this.length = els.length;
  }

  Pls.prototype.wait = function (opts) {
    if (typeof opts !== "undefined") {

      for (var i = 0, len = this.length; i < len; i ++) {
        var self = this[i];
        console.log(self)
        self.pls = {};
        self.pls.text    = opts.text || 'Please Wait...';
        self.pls.delay   = opts.delay || null;
        self.pls.success = opts.success || 'Success';
        self.pls.error   = opts.error || 'Something went wrong';

        if (!self.querySelector('.main')) {
          self.pls.main = opts.main || null;
        }

        if (!self.querySelector('.waitpls')) {
          var node = document.getElementById('pls-overlay').cloneNode(true);

          node.removeAttribute('id');
          self.appendChild(node);
        }

        var wait_elm = self.querySelector('.waitpls')
        var cls = self.pls.main ? ' active main' : ' active';
        wait_elm.className = wait_elm.className + cls;
      }
    }
  };

  Pls.prototype.send = function (state) {
    for (var i = 0, len = this.length; i < len; i ++) {
      var self = this[i];

      if (self.pls.delay) {
        if (state === 'error' || state === 'err' || state === 'e') {
          self.querySelector('.waitpls p').innerHTML = self.pls.error
        } else {
          self.querySelector('.waitpls p').innerHTML = this[i].pls.success
        }

        setTimeout(function() {
          _complete(self.querySelector('.waitpls'));
        }, self.pls.delay);
      } else {
        _complete(self.querySelector('.waitpls'))
      }
    }

    function _complete(e) {

      e.className = e.className.replace(/\b active\b/,'');
    }
  }

  var pls = function (selector) {
    var els;
    if (typeof selector === "string") {
      els = document.querySelectorAll(selector);
    } else if (selector.length) {
      els = selector;
    } else {
      els = [selector];
    }
    return new Pls(els);
  };

  return pls;
}());
