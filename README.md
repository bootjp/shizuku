# shizuku
javascript ad script

## Caution
Specification changes under development might take place.
Please use from a release that is not the master branch.

## sample page

### overlay sample page

* https://bootjp.github.io/shizuku/sample/overlay.html


## How to carry out the smartphones overlay

```html
<!-- define overlay target element -->
<img src="asset/320x50.png" id="ol">
<!-- load shizuku js -->
<script src="../js/shizuku_core.js"></script>
<script>
  // shizuku calld
  (new Shizuku({smartphoneOverlay: {targetElementId: 'ol', width: 320, height:50}}).smartphoneOverlayEffect());
</script>
```

See the sample / overlay.html details
