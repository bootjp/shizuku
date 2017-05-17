/* shizuku v0.0.1 https://github.com/bootjp/shizuku (c) bootjp https://bootjp.me/ | */
var __shizuku__ = (function() {
  if (typeof window.__shizuku__ !== 'undefined') {
    return window.__shizuku__;
  }

  var __shizuku__ = {
    property: {
      smartphoneOverlay: {
        targetElementId: null,
        width: 0,
        height: 0,
        timer: null,
        animationTimer: null,
        registerEvent: false
      },
      initCalled: false
    },

    init: (function(config) {
      if (typeof config !== 'undefined') {
        for (var property in config) {
          __shizuku__.property[property] = config[property];
        }
        this.property.initCalled = true;
      }
    }),

    smartphoneOverlay: (function() {
      if (!__shizuku__.property.initCalled) {
        return;
      }
      var container = document.getElementById(__shizuku__.property.smartphoneOverlay.targetElementId);

      clearTimeout(__shizuku__.property.smartphoneOverlay.timer);
      __shizuku__.setStyle(container, {
        display: 'none',
        opacity: 0
      });

      __shizuku__.property.smartphoneOverlay.timer = setTimeout(function() {
        var scrollWidth = (document.documentElement.scrollWidth || document.body.scrollWidth);
        var windowShort = Math.min(window.innerWidth, window.innerHeight);
        var windowMargin = (window.innerWidth / scrollWidth);
        var expandWidth = Math.min(scrollWidth * windowMargin, windowShort);
        var zoomScale = (expandWidth / __shizuku__.property.smartphoneOverlay.width);
        var transform = 'scale(' + zoomScale + ', ' + zoomScale + ')';
        var transformOrigin = '0 0';
        __shizuku__.setStyle(container, {
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
        __shizuku__.setStyle(container, {
          left: ((window.innerWidth / 2) - (containerRect.width / 2) + window.scrollX) + 'px',
          top: (window.scrollY + window.innerHeight - containerRect.height) + 'px'
        });
        var opacity = 0;
        clearInterval(__shizuku__.property.smartphoneOverlay.animationTimer);
        __shizuku__.property.smartphoneOverlay.animationTimer = setInterval(function() {
          __shizuku__.setStyle(container, {
            opacity: ((++opacity) / 100),
            filter: 'alpha(opacity=' + opacity + ')'
          });

          if (opacity === 100) {
            clearInterval(__shizuku__.property.smartphoneOverlay.animationTimer);
          }
        }, 10);
      }, 300);

      if (!__shizuku__.property.smartphoneOverlay.registerEvent) {
        __shizuku__.property.smartphoneOverlay.registerEvent = true;
        __shizuku__.eventRegister([
          'DOMContentLoaded',
          'scroll',
          'touchmove',
          'resize'
        ], this.smartphoneOverlay);
      }
    }),

    eventRegister: (function(events, target) {
      for (var event in events) {
        window.addEventListener(events[event], target);
      }
    }),

    setStyle: (function(element, style) {
      for (var property in style) {
        element.style[property] = style[property];
      }
    })
  };

  return __shizuku__;
})();
