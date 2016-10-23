# shizuku
javascript ad script

## Caution
Specification changes under development might take place.
Please use from a release that is not the master branch.

## How to carry out the smartphones overlay

```html
<!-- define overlay target element -->
<img src="asset/320x50.png" id="ol">
<!-- load shizuku js -->
<script src="../js/shizuku_core.js"></script>
<script>
  // shizuku calld
  __shizuku__.Init({smartPhoneOverlay: {targetElementId: 'ol', width: 320, height:50}});
  __shizuku__.SmartPhoneOverlay();
</script>
```

See the sample / overlay.html details
