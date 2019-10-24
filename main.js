import methods from './methods.js'
console.log('methods:', methods)
const canvas = document.getElementById('test')
const mouseCanvas = document.getElementById('mouse')

// if (!canvas.getContext) return
const ctx = canvas.getContext('2d')
const mouseCtx = mouseCanvas.getContext('2d')
let main = {}
// 背景
const img = new Image()
img.src = './road.jpg'
img.onload = () => {
	ctx.drawImage(img, 0, 0, 400, 900)

	// 图片画完画别的
	// ----------------------变量-------------------------
	main = {
		// 是否按住左键
		pressing: false,
		// 按住左键划线时候,线的头尾坐标
		lineTwoEnds: {
			mouseX0: null,
			mouseY0: null,
			mouseX1: null,
			mouseY1: null,
		},
		// 画完一条线后, 两端的坐标数组
		histCoordinates: [],
		ctx
	}

	// ----------------------methods------------------------- 
	const {
		drawLine,
		drawCircle,
		drawCircleStart,
		connectDot,
		up,
	} = methods


	// ----------------------事件绑定-------------------------   
	$('#mouse').mousedown(function (e) {
		main = {
			...main,
			lineTwoEnds: {
				...main.lineTwoEnds,
				mouseX0: e.pageX - this.offsetLeft,
				mouseY0: e.pageY - this.offsetTop
			}
		}
		let { mouseX0, mouseY0 } = lineTwoEnds
		connectDot(main, mouseX0, mouseY0, 'mouseX0', 'mouseY0')
		drawCircle(main, mouseCtx, mouseX0, mouseY0)
		main = {
			...main,
			pressing: true
		}
	})

	$('#mouse').mousemove(function (e) {
		const { pressing, lineTwoEnds } = main
		if (pressing) {
			mouseCtx.clearRect(0, 0, 400, 900)
			mouseCtx.beginPath()
			lineTwoEnds.mouseX1 = e.pageX - this.offsetLeft
			lineTwoEnds.mouseY1 = e.pageY - this.offsetTop

			const { mouseX0, mouseY0, mouseX1, mouseY1 } = lineTwoEnds
			connectDot(main, mouseX1, mouseY1, 'mouseX1', 'mouseY1')
			drawLine(main, mouseCtx, mouseX0, mouseY0, mouseX1, mouseY1)
			drawCircle(main, mouseCtx, mouseX0, mouseY0)
		}
	})

	$('#mouse').mouseup(function (e) {
		up(main)
	})

	$('#mouse').mouseleave(e => {
		up(main)
	})

	$('#button').click(e => {
		const result = _
			.chain(histCoordinates)
			.uniqWith(_.isEqual)
			.value()
	})

}

export default main
