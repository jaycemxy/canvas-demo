var yyy = document.getElementById('xxx');
var context = yyy.getContext('2d');
var lineWidth = 5
autoSetCanvasSize(yyy)

listenToUser(yyy)


var eraserEnabled = false
palette.onclick = function() {
  eraserEnabled = false
  palette.classList.add('active')
  pen.classList.remove('active')
  eraser.classList.remove('active')
}
pen.onclick = function () {
  eraserEnabled = false
  pen.classList.add('active')
  eraser.classList.remove('active')
  palette.classList.remove('active')
}
eraser.onclick = function () {
  eraserEnabled = true
  eraser.classList.add('active')
  pen.classList.remove('active')
  palette.classList.remove('active')
}
clear.onclick = function () {
  context.clearRect(0, 0, yyy.width, yyy.height);
}

download.onclick = function () {
  var url = yyy.toDataURL("image/png") // https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement/toDataURL
  var a = document.createElement('a') // 下面有 bug，暂时不知道咋解决
  document.body.appendChild(a)
  a.href = url
  a.dowload = '我的画儿'
  a.target = '_blank'
  a.click()
}

pink.onclick = function () {
  context.fillStyle = 'pink'
  context.strokeStyle = 'pink'
  pink.classList.add('active')
  orange.classList.remove('active')
  purple.classList.remove('active')
}
orange.onclick = function () {
  context.fillStyle = 'orange'
  context.strokeStyle = 'orange'
  pink.classList.remove('active')
  orange.classList.add('active')
  purple.classList.remove('active')
}
purple.onclick = function () {
  context.fillStyle = 'purple'
  context.strokeStyle = 'purple'
  pink.classList.remove('active')
  orange.classList.remove('active')
  purple.classList.add('active')
}

thin.onclick = function () {
  lineWidth = 3
  thin.classList.add('active')
  normal.classList.remove('active')
  thick.classList.remove('active')
}

normal.onclick = function () {
  lineWidth = 5
  normal.classList.add('active')
  thin.classList.remove('active')
  thick.classList.remove('active')
}

thick.onclick = function () {
  lineWidth = 10
  thick.classList.add('active')
  thin.classList.remove('active')
  normal.classList.remove('active')
}


/*********/
function autoSetCanvasSize(canvas) {
  setCanvasSize()

  window.onresize = function () {
    setCanvasSize()
  }


  function setCanvasSize() {
    var pageWidth = document.documentElement.clientWidth;
    var pageHeight = document.documentElement.clientHeight;

    canvas.width = pageWidth
    canvas.height = pageHeight
  }
}


function drawCircle(x, y, radius) {
  context.beginPath()
  context.arc(x, y, radius, 0, Math.PI * 2);
  context.fill()
}

function drawLine(x1, y1, x2, y2) {
  context.beginPath()
  context.moveTo(x1, y1) //起点
  context.lineWidth = lineWidth
  context.lineTo(x2, y2) //终点
  context.stroke()
  context.closePath()
}



function listenToUser(canvas) {

  var using = false
  var lastPoint = {
    x: undefined,
    y: undefined
  }
  //特性检测
  if (document.body.ontouchstart !== undefined) {
    //触屏设备
    canvas.ontouchstart = function (aaa) {
      var x = aaa.touches[0].clientX
      var y = aaa.touches[0].clientY
      using = true
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        lastPoint = {
          "x": x,
          "y": y
        }
      }
    }
    canvas.ontouchmove = function (aaa) {
      var x = aaa.touches[0].clientX
      var y = aaa.touches[0].clientY

      if (!using) {
        return
      }

      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        var newPoint = {
          "x": x,
          "y": y
        }
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }
    }
    canvas.ontouchend = function () {
      using = false
    }
  } else {
    //非触屏设备
    canvas.onmousedown = function (aaa) {
      var x = aaa.clientX
      var y = aaa.clientY
      using = true
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        lastPoint = {
          "x": x,
          "y": y
        }
      }
    }

    canvas.onmousemove = function (aaa) {
      var x = aaa.clientX
      var y = aaa.clientY

      if (!using) {
        return
      }

      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        var newPoint = {
          "x": x,
          "y": y
        }
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }
    }

    canvas.onmouseup = function (aaa) {
      using = false
    }
  }
}