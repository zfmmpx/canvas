
// import main from './main.js'
// console.log('main:', main)
const drawLine = (ctx, mouseX0, mouseY0, mouseX1, mouseY1) => {
  ctx.beginPath()
  ctx.moveTo(mouseX0, mouseY0)
  ctx.lineTo(mouseX1, mouseY1)
  ctx.strokeStyle = '#E9E9E9'
  ctx.lineWidth = 2
  ctx.stroke()
}

// 鼠标点下去时候,线两端的圆圈
const drawCircle = (main, ctx, x, y) => {
  ctx.beginPath()
  ctx.arc(x, y, 3, 0, Math.PI * 2)
  ctx.strokeStyle = '#0070CC'
  ctx.lineWidth = 3
  ctx.stroke()
  ctx.fillStyle = '#E9E9E9'
  ctx.fill()

  // // 演示用
  // ctx.beginPath()
  // ctx.arc(x, y, 30, 0, Math.PI * 2)
  // ctx.strokeStyle = 'blue'
  // ctx.stroke()
}

// 点下去起点的圆
const drawCircleStart = (main, ctx, x, y) => {
  ctx.beginPath()
  ctx.arc(x, y, 4, 0, Math.PI * 2)
  ctx.strokeStyle = '#E9E9E9'
  ctx.lineWidth = 4
  ctx.stroke()
  ctx.fillStyle = '#0070CC'
  ctx.fill()
}


const connectDot = (main, dotX, dotY, nameX, nameY) => {
  const { lineTwoEnds: { mouseX0, mouseY0 } } = main
  const { histCoordinates } = main
  if (histCoordinates.length) {
    let radiusFromHists = histCoordinates.map(v =>
      Math.sqrt(Math.pow(v.x - dotX, 2) + Math.pow(v.y - dotY, 2)),
    )
    radiusFromHists.map((v2, v2Index) => {
      if (v2 < 30) {
        lineTwoEnds[nameX] = histCoordinates[v2Index].x
        lineTwoEnds[nameY] = histCoordinates[v2Index].y
      }
    })
  }
}

const up = main => {
  const { pressing } = main
  if (pressing) {
    mouseCtx.clearRect(0, 0, 400, 900)
    let { mouseX1: mouseX1orig, mouseY1: mouseY1orig } = lineTwoEnds
    if (!_.isNil(mouseX1orig)) {
      let { mouseX0, mouseY0, mouseX1, mouseY1 } = lineTwoEnds
      drawLine(ctx, mouseX0, mouseY0, mouseX1, mouseY1)
      drawCircle(ctx, mouseX0, mouseY0)
      drawCircle(ctx, mouseX1, mouseY1)

    }
    let { mouseX0, mouseY0, mouseX1, mouseY1 } = lineTwoEnds
    if (!_.isNil(mouseX0) && !_.isNil(mouseX1)) {
      // push到历史坐标
      histCoordinates.push({ x: mouseX0, y: mouseY0 })
      histCoordinates.push({ x: mouseX1, y: mouseY1 })
    }
  }
  pressing = false
  lineTwoEnds = {
    mouseX0: null,
    mouseY0: null,
    mouseX1: null,
    mouseY1: null,
  }
}

const methods = {
  drawLine,
  drawCircle,
  drawCircleStart,
  connectDot,
  up
}

export default methods