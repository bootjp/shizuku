/* shizuku v0.0.1 https://github.com/bootjp/shizuku (c) bootjp https://bootjp.me/ | */
var Shizuku = (function() {
  var self;

  var Shizuku = function(config) {
    self = this;
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
    var container = document.getElementById(self.config.smartphoneOverlay.targetElementId);

    // clear last dom change event and animation
    clearTimeout(self.config.smartphoneOverlay.timer);
    clearInterval(self.config.smartphoneOverlay.animationTimer);

    self.setStyle(container, {
      display: 'none',
      opacity: 0
    });

    self.config.smartphoneOverlay.timer = setTimeout(function() {
      var scrollWidth = (document.documentElement.scrollWidth || document.body.scrollWidth);
      var windowShort = Math.min(window.innerWidth, window.innerHeight);
      var windowMargin = (window.innerWidth / scrollWidth);
      var expandWidth = Math.min(scrollWidth * windowMargin, windowShort);
      var zoomScale = (expandWidth / self.config.smartphoneOverlay.width);
      var transform = 'scale(' + zoomScale + ', ' + zoomScale + ')';
      var transformOrigin = '0 0';
      self.setStyle(container, {
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
      self.setStyle(container, {
        left: ((window.innerWidth / 2) - (containerRect.width / 2) + window.scrollX) + 'px',
        top: (window.scrollY + window.innerHeight - containerRect.height) + 'px'
      });

      var opacity = 0;
      // last animation event clear.
      self.config.smartphoneOverlay.animationTimer = setInterval(function() {
        self.setStyle(container, {
          opacity: ((++opacity) / 100),
          filter: 'alpha(opacity=' + opacity + ')'
        });

        if (opacity === 100) {
          clearInterval(self.config.smartphoneOverlay.animationTimer);
        }
      }, 10);
    }, 300);

    if (!self.config.smartphoneOverlay.registerEvent) {
      self.config.smartphoneOverlay.registerEvent = true;
      self.eventRegister([
        'DOMContentLoaded',
        'scroll',
        'touchmove',
        'resize'
      ], this.smartphoneOverlayEffect);
    }
  };

  return Shizuku;
})();
