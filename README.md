# shizuku
javascript ad script

## Caution
Specification changes under development might take place.
Please use from a release that is not the master branch.

## How to carry out the smartphones overlay

```html
<img src="asset/320x50.png" id="ol">
<script>
// To define the element information to be overlay displayed in the shizuku
__shizuku__ = {containerId: 'ol', width: 320, height:50};
</script>
<!-- shizukuの定義後に描画ロジックを呼び出す -->
<script src="../js/overlay.js"></script>
```

See the sample / overlay.html details
