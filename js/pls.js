/*!
 * Pls - A js library for handling ajax overlays and response messages
 *
 * Version:  0.3.5.3
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

  var settings = {
    // class and id names
    n_overlay: 'pls-overlay',
    n_wait:    'pls-wait',
    n_message: 'pls-message',
    n_success: 'success',
    n_error:   'error'
  };

  // easier to type
  var s = settings;

  Pls.prototype.forEach = function (callback) {
    var results = [];
    for (var i = 0; i < this.length; i++) {
      results.push(callback.call(this, this[i], i));
    }
    return results;
  };

  Pls.prototype.wait = function (opts) {
    if (typeof opts !== 'undefined') {
      this.forEach(function(self) {

        // set options
        self.pls = {};
        self.pls.text    = opts.text || 'Please Wait...';
        self.pls.success = opts.success || 'Success';
        self.pls.error   = opts.error || 'Something went wrong';
        self.pls.delay   = opts.delay || null;

        if (opts.main) {
          if (!self.querySelector('.main')) {
            self.pls.main = opts.main;
          }
        }

        var obj      = self.pls;
        var wait_elm = findChild(self.children)

        if (wait_elm === undefined) {
          // if the overlay hasn't been applied yet clone overlay template
          var overlay = document.getElementById(s.n_overlay).cloneNode(true);

          // remove the id from the overlay so we don't end up with multiple of the same id
          overlay.removeAttribute('id');
          overlay.style.display = 'block';

          // append the overlay to the parent container
          self.appendChild(overlay);

          // now re-run the findChild function
          wait_elm = findChild(self.children)
        }

        wait_elm.querySelector('.pls-text').innerHTML = obj.text;
        var cls = obj.main ? ' main active' : ' active';

        // give a little delay so the active class triggers the aninmation the first time
        delay(1, function() {
          wait_elm.className = wait_elm.className + cls;
        });
      });
    }
  };

  Pls.prototype.send = function (state) {
    for (var i = 0, len = this.length; i < len; i ++) {
      var self     = this[i];
      var wait_elm = findChild(self.children)
      var obj      = self.pls;

      if (obj.delay) {
        self.querySelector('.' + s.n_wait + ' ' + 'p').innerHTML = state === s.n_error ? obj.error : obj.success;


        var spinner  = self.querySelector('.spinner');
        var spin_cls = ' ' + state;
        spinner.className = spinner.className + spin_cls;

        delay(obj.delay, function() {
          spinner.className = spinner.className.replace(spin_cls,'');
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
    if (typeof opts !== 'undefined') {
      this.forEach(function(element) {
        var node     = document.createElement('p');
        var textnode = document.createTextNode(opts.text);
        var cls      = opts.type !== s.n_error ? s.n_message + ' ' + s.n_success : s.n_message + ' ' + s.n_error ;

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
        var cls = type === s.n_success ? s.n_success : s.n_error;
        children = element.getElementsByClassName(cls);
      } else {
        // if no type, stuff all pls-messages into the array
        children = element.getElementsByClassName(s.n_message);
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
    for (i = 0, l = chd.length; i < l; i ++) {
      if (chd[i].className.match(s.n_wait)) {
        return chd[i]
      }
    }
  }

  // TODO: is it silly to have a shared function for setTimeout? a callback that does a callback.
  function delay(time, callback) {
    setTimeout(function() {
      callback();
    }, time);
  }

  return pls;
}());
