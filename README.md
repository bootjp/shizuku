# shizuku
javascript ad script


## overlay 使用方法

```html
<img src="asset/320x50.png" id="ol">
<script>
// shizukuにオーバレイ表示させる要素情報を定義する
__shizuku__ = {containerId: 'ol', width: 320, height:50};
</script>
<!-- shizukuの定義後に描画ロジックを呼び出す -->
<script src="../js/overlay.js"></script>
```

詳細は sample/overlay.html を参照
