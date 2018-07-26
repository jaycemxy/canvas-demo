# canvas-demo
### 设备检测
一般来说，如果是触屏设备，它的touch事件在没有定义的情况下是null，非触屏设备在没有定义的情况下是undefined，利用这一点可以先进行一个设备检测，再决定调用 mouse 事件或者touch事件。
```
if (document.body.ontouchstart !== undefined) {
    // 触屏设备
}else{
    // 非触屏设备 
}
```

### 从触屏设备和非触屏设备获取视口宽度（document也就是viewport）
触屏设备：
```
canvas.ontouchstart = function (aaa) {
    var x = aaa.touches[0].clientX
    var y = aaa.touches[0].clientY
}
```

非触屏设备：
```
canvas.onmousedown = function (aaa) {
      var x = aaa.clientX
      var y = aaa.clientY
}
```

### 清屏
原理：再画一张一模一样大的覆盖之前的画儿
```
clear.onclick = function () {
  context.clearRect(0, 0, yyy.width, yyy.height);
}
```

### 下载画好的图片（toDataURL）
```
download.onclick = function () {
  var url = yyy.toDataURL("image/png")
  var a = document.createElement('a')
  document.body.appendChild(a)
  a.href = url
  a.dowload = '我的画儿'
  a.target = '_blank'
  a.click()
}
```