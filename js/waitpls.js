var waitpls = {
  var: cls      = '.waitpls',
  var: waited   = ' js-has-waited',
  var: overlays = [],

  on: function(text, parent) {
    var c = document.querySelector('.waitpls.main');

    if (parent) {
      for(var i = 0, len = parent.length; i < len; i ++) {
        if (parent[i].className.indexOf(waited) < 0) {
          var html = c.outerHTML;

          parent[i].insertAdjacentHTML('beforeend', html);
          c = parent[i].querySelector(cls);
          c.className = c.className.replace(/\b main\b/,'');
          parent[i].className = parent[i].className + waited;
        }
        c = parent[i].querySelector(cls)
      }
    }

    overlays.push(c);
    c.querySelector('.container p').innerHTML = text ? text : 'Waitpls';
    c.className = c.className + ' active';
  },

  off: function(text, delay) {
    var c = overlays.shift();

    if (text) {
      c.querySelector('.container p').innerHTML = text;
    }

    if (delay) {
      setTimeout(function() {
        _complete();
      }, delay);
    } else {
      _complete();
    }

    function _complete() {
      console.log(c)
      _remove(c)
    }

    function _remove(elm) {

      elm.className = elm.className.replace(/\b active\b/,'');
    }
  },
}