var waitpls = {
  on: function(text) {
    var c = document.querySelector('.waitpls');

    c.className = c.className + ' active';
    c.querySelector('.container p').innerHTML = text ? text : 'Waitpls';
  },

  off: function(text, delay) {
    var c = document.querySelector('.waitpls');
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
      c.className = c.className.replace(/\bactive\b/,'');
    }
  },
}