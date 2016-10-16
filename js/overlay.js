/* shizuku v0.0.0 | (c) bootjp | https://github.com/bootjp/shizuku/blob/master/LICENSE */
(function() {
  if (typeof window.__shizuku__ === 'undefined') {
    return;
  }

  var container = document.getElementById(__shizuku__.containerId);
  var timer = null;
  var animationTimer = null;
  if (container === null) {
    console.log('does not container');

    return false;
  }

  var setStyle = function(element, style) {
    for (var property in style) {
      element.style[property] = style[property];
    }
  };

  var overlay = function() {
    clearTimeout(timer);
    setStyle(container, {
      display: 'none',
      opacity: 0
    });
    timer = setTimeout(function() {
      var scrollWidth = (document.documentElement.scrollWidth || document.body.scrollWidth);
      var windowShort = Math.min(window.innerWidth, window.innerHeight);
      var windowMargin = window.innerWidth / scrollWidth;
      var expandWidth = Math.min(scrollWidth * windowMargin, windowShort);
      var zoomScale = (expandWidth / __shizuku__.width);
      var transform = 'scale(' + zoomScale + ', ' + zoomScale + ')';
      var transformOrigin = '0 0';
      setStyle(container, {
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
      setStyle(container, {
        left: ((window.innerWidth / 2) - (containerRect.width / 2) + window.scrollX) + 'px',
        top: (window.scrollY + window.innerHeight - containerRect.height) + 'px'
      });
      var opacity = 0;
      clearInterval(animationTimer);
      animationTimer = window.setInterval(function() {
        setStyle(container, {
          opacity: ((++opacity) / 100),
          filter: 'alpha(opacity=' + opacity + ')'
        });

        if (opacity === 100) {
          window.clearInterval(animationTimer);
        }
      }, 10);
    }, 300);
  };

  window.addEventListener('DOMContentLoaded', overlay);
  window.addEventListener('scroll', overlay);
  window.addEventListener('touchmove', overlay);
  window.addEventListener('resize', overlay);
}());
