/* shizuku v0.0.1 https://github.com/bootjp/shizuku (c) bootjp https://bootjp.me/ | */
var Shizuku = (function() {
  var _shizuku;

  var Shizuku = function(config) {
    _shizuku = this;
    if (typeof this.config !== 'undefined') {
      // defined
      return new Shizuku(config);
    }

    // config default value.
    this.config = {
      smartphoneOverlay: {
        targetElementId: null,
        width: 0,
        height: 0,
        timer: null,
        animationTimer: null,
        registerEvent: false
      }
    };

    if (typeof config !== 'undefined') {
      for (var property in config) {
        this.config[property] = config[property];
      }
    }
  };

  Shizuku.prototype.setStyle = function(element, style) {
    for (var property in style) {
      element.style[property] = style[property];
    }
  };

  Shizuku.prototype.eventRegister = function(events, target) {
    for (var event in events) {
      window.addEventListener(events[event], target, false);
    }
  };

  Shizuku.prototype.smartphoneOverlayEffect = function() {
    var container = document.getElementById(_shizuku.config.smartphoneOverlay.targetElementId);

    // clear last dom change event and animation
    clearTimeout(_shizuku.config.smartphoneOverlay.timer);
    clearInterval(_shizuku.config.smartphoneOverlay.animationTimer);

    _shizuku.setStyle(container, {
      display: 'none',
      opacity: 0
    });

    _shizuku.config.smartphoneOverlay.timer = setTimeout(function() {
      var scrollWidth = (document.documentElement.scrollWidth || document.body.scrollWidth);
      var windowShort = Math.min(window.innerWidth, window.innerHeight);
      var windowMargin = (window.innerWidth / scrollWidth);
      var expandWidth = Math.min(scrollWidth * windowMargin, windowShort);
      var zoomScale = (expandWidth / _shizuku.config.smartphoneOverlay.width);
      var transform = 'scale(' + zoomScale + ', ' + zoomScale + ')';
      var transformOrigin = '0 0';
      _shizuku.setStyle(container, {
        display: 'block',
        position: 'absolute',
        transform: transform,
        webkitTransform: transform,
        MozTransform: transform,
        transformOrigin: transformOrigin,
        webkitTransformOrigin: transformOrigin,
        MozTransformOrigin: transformOrigin,
        zIndex: 0x7FFFFFFF
      });
      var containerRect = container.getBoundingClientRect();
      _shizuku.setStyle(container, {
        left: ((window.innerWidth / 2) - (containerRect.width / 2) + window.scrollX) + 'px',
        top: (window.scrollY + window.innerHeight - containerRect.height) + 'px'
      });

      var opacity = 0;
      // last animation event clear.
      _shizuku.config.smartphoneOverlay.animationTimer = setInterval(function() {
        _shizuku.setStyle(container, {
          opacity: ((++opacity) / 100),
          filter: 'alpha(opacity=' + opacity + ')'
        });

        if (opacity === 100) {
          clearInterval(_shizuku.config.smartphoneOverlay.animationTimer);
        }
      }, 10);
    }, 300);

    if (!_shizuku.config.smartphoneOverlay.registerEvent) {
      _shizuku.config.smartphoneOverlay.registerEvent = true;
      _shizuku.eventRegister([
        'DOMContentLoaded',
        'scroll',
        'touchmove',
        'resize'
      ], this.smartphoneOverlayEffect);
    }
  };

  return Shizuku;
})();
