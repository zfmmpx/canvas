const c = [3, 67].sort((a, b) => {
	console.log('a:', a)
	console.log('b:', b)
	return a - b
})

console.log('c:', c)