/*!
 * Pls - A js library for handling ajax overlays and response messages
 *
 * Version:  0.3.3
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

// TODO: Cache class and id names (e.g waitlps, active, pls-overlay)
// TODO: Possibly add support for logging data to the screen (helpful for mobile debugging)

window.pls = (function () {
  function Pls (els) {
    for(var i = 0; i < els.length; i++ ) {
      this[i] = els[i];
    }
    this.length = els.length;
  };

  var pls = function (selector) {
    var els;
    if (typeof selector === 'string') {
      els = document.querySelectorAll(selector);
    } else if (selector.length) {
      els = selector;
    } else {
      els = [selector];
    }
    return new Pls(els);
  };

  Pls.prototype.forEach = function (callback) {
    var results = [];
    for (var i = 0; i < this.length; i++) {
      results.push(callback.call(this, this[i], i));
    }
    return results;
  };

  Pls.prototype.wait = function (opts) {
    if (typeof opts !== "undefined") {
      this.forEach(function(self) {
        var wait_elm = findChild(self.children)

        // set options
        self.pls = {};
        self.pls.text    = opts.text || 'Please Wait...';
        self.pls.delay   = opts.delay || null;
        self.pls.success = opts.success || 'Success';
        self.pls.error   = opts.error || 'Something went wrong';

        if (!self.querySelector('.main')) {
          self.pls.main = opts.main || null;
        }

        if (wait_elm === undefined) {
          // if the overlay hasn't been applied yet clone overlay template
          var overlay = document.getElementById('pls-overlay').cloneNode(true);

          // remove the id from the overlay so we don't end up with multiple of the same id
          overlay.removeAttribute('id');
          overlay.querySelector('.pls-text').innerHTML = self.pls.text;

          // append the overlay to the parent container
          self.appendChild(overlay);

          // TODO: find a better way to handle assigning wait_elm. Not a fan of the double loop
          // now re-run the findChild function
          wait_elm = findChild(self.children)
        }

        var cls = self.pls.main ? ' main active' : ' active';
        wait_elm.className = wait_elm.className + cls;

      });
    }
  };

  Pls.prototype.send = function (state) {
    for (var i = 0, len = this.length; i < len; i ++) {
      var self = this[i];
      var wait_elm = findChild(self.children)

      if (self.pls.delay) {
        if (state === 'error' || state === 'err' || state === 'e') {
          self.querySelector('.waitpls p').innerHTML = self.pls.error
        } else {
          self.querySelector('.waitpls p').innerHTML = this[i].pls.success
        }

        delay(self.pls.delay, function() {
          _complete(wait_elm)
        });
      } else {
        _complete(wait_elm)
      }
    }

    function _complete(e) {
      e.className = e.className.replace(/\b active\b/,'');
    }
  }

  Pls.prototype.message = function (opts) {
    if (typeof opts !== "undefined") {
      this.forEach(function(element) {
        var node = document.createElement('p');
        var textnode = document.createTextNode(opts.text);

        var cls = opts.type !== 'error' ? 'pls-message success' : 'pls-message error';

        node.className = cls;
        node.appendChild(textnode);
        element.appendChild(node);

        if (opts.delay) {
          delay(opts.delay, function() {
            element.removeChild(node)
          });
        }
      });
    } else {
      console.error('Pls pass in some options.')
    }
  }

  Pls.prototype.clearMessages = function(type) {
    this.forEach(function(element) {
      var children = [];

      if (type) {
        // if the type option is specified, reset the children array
        var cls = type === 'success' ? 'success' : 'error';
        children = element.getElementsByClassName(cls);
      } else {
        // if no type, stuff all pls-messages into the array
        element.getElementsByClassName('pls-message');
      }

      if (children.length) {
        // reverse loop so we don't have to worry about removing the items from children
        for (var i = children.length; i--;) {
          element.removeChild(children[i]);
        }
      }
    });
  }

  // utility functions
  function findChild(chd) {
    for (n = 0, l = chd.length; n < l; n ++) {
      if (chd[n].className.match(/\bwaitpls\b/)) {
        return chd[n]
      }
    }
  }

  function delay(time, callback) {
    setTimeout(function() {
      callback();
    }, time);
  }

  return pls;
}());
