var waitpls = {
  var: cls      = '.waitpls',
  var: waited   = ' js-has-waited',

  on: function(text, parent) {
    var element = document.querySelector('.waitpls.main');

    if (parent) {
      findParent(parent, element, function(p) {
        element = p;
      });
    }

    element.querySelector('.container p').innerHTML = text ? text : 'Waitpls';
    element.className = element.className + ' active';
  },

  off: function(text, parent, delay) {
    var element = document.querySelector('.waitpls.main');

    if (parent) {
      findParent(parent, null, function(p) {
        element = p;
      });
    }

    if (text) {
      element.querySelector('.container p').innerHTML = text;
    }

    if (delay) {
      setTimeout(function() {
        _complete();
      }, delay);
    } else {
      _complete();
    }

    function _complete() {
      element.className = element.className.replace(/\b active\b/,'');
    }
  },

  step: function(text, parent) {
    var element = document.querySelector('.waitpls.main');

    if (parent) {
      findParent(parent, null, function(p) {
        element = p;
      });
    }

    if (text) {
      element.querySelector('.container p').innerHTML = text;
    } else {
      console.warn('pls only use this if you wish to update the text')
    }
  }
}



function findParent(parent, context, callback) {
  for(var i = 0, len = parent.length; i < len; i ++) {
    if (parent[i].className.indexOf(waited) < 0) {
      var html = context.outerHTML;

      parent[i].insertAdjacentHTML('beforeend', html);
      context = parent[i].querySelector(cls);
      context.className = context.className.replace(/\b main\b/,'');
      parent[i].className = parent[i].className + waited;
    }

    return callback(parent[i].querySelector(cls));
  }
}