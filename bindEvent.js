
console.log('pressing:', pressing)
$('#mouse').mousedown(function (e) {
  lineTwoEnds.mouseX0 = e.pageX - this.offsetLeft
  lineTwoEnds.mouseY0 = e.pageY - this.offsetTop
  let { mouseX0, mouseY0 } = lineTwoEnds
  connectDot(mouseX0, mouseY0, 'mouseX0', 'mouseY0')
  drawCircle(mouseCtx, mouseX0, mouseY0)
  pressing = true
})

$('#mouse').mousemove(function (e) {
  if (pressing) {
    mouseCtx.clearRect(0, 0, 400, 900)
    mouseCtx.beginPath()
    lineTwoEnds.mouseX1 = e.pageX - this.offsetLeft
    lineTwoEnds.mouseY1 = e.pageY - this.offsetTop

    const { mouseX0, mouseY0, mouseX1, mouseY1 } = lineTwoEnds
    connectDot(mouseX1, mouseY1, 'mouseX1', 'mouseY1')
    drawLine(mouseCtx, mouseX0, mouseY0, mouseX1, mouseY1)
    drawCircle(mouseCtx, mouseX0, mouseY0)
  }
})

$('#mouse').mouseup(function (e) {
  up()
})

$('#mouse').mouseleave(e => {
  up()
})

$('#button').click(e => {
  const result = _
    .chain(histCoordinates)
    .uniqWith(_.isEqual)
    .value()
})