window.addEventListener('load', function () { // makes it so only runs after everything is loaded
    const canvas = document.getElementById('canvas1')
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight


    ctx.fillStyle = 'green'
    // ctx.strokeStyle = 'gold'
    // ctx.lineWidth = 10
    ctx.lineCap = 'round'
    ctx.shadowColor = 'rgba(0,0,0,0.7)'
    ctx.shadowOffsetX = 10
    ctx.shadowOffsetY = 5
    ctx.shadowBlue = 10

    // effect settings
    let size = canvas.width < canvas.height ? canvas.width * 0.3 : canvas.height * 0.3
    const branches = 2
    const maxLevel = 4 // set to 3 if it takes too long to render

    let sides = 5
    let scale = 0.5
    let spread = 0.5
    //let color = 'hsl(226,100%,50%)' // hsl: Hue 0 - 360, Saturation , Lightness
    let color = 'hsl(' + Math.random() * 360 + ',100%,50%)'
    let lineWidth = Math.floor(Math.random() * 20 + 10)

    // controls
    const randomizeButton = document.getElementById('randomizeButton')
    const slider_spread = document.getElementById('spread')
    const label_spread = document.querySelector('[for="spread"]')
    slider_spread.addEventListener('change', function (e) {
        //console.log(e.target.value)
        spread = e.target.value
        drawFractal()
    })

    function drawBranch(level) {
        if (level > maxLevel) return // when return runs, function immediately stops executing its code
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(size, 0)
        ctx.stroke()
        for (let i = 0; i < branches; i++) {
            ctx.save()
            ctx.translate(size - (size / branches) * i, 0)
            ctx.rotate(spread)
            ctx.scale(scale, scale)
            drawBranch(level + 1)
            ctx.restore()


            // drawBranch() if you call function within itself you create an endless loop and some older browsers might freeze 

            ctx.save()
            ctx.translate(size - (size / branches) * i, 0)
            ctx.rotate(-spread)
            ctx.scale(scale, scale)
            drawBranch(level + 1)


            ctx.restore()
        }

    }





    function drawFractal() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.save()
        ctx.lineWidth = lineWidth
        ctx.strokeStyle = color
        ctx.translate(canvas.width / 2, canvas.height / 2)

        for (let i = 0; i < sides; i++) {
            ctx.rotate((Math.PI * 2) / sides)
            drawBranch(0)
        }
        ctx.restore()

    }

    //restores the most recent saved canvas state

    drawFractal()


    function randomizeFractal() {
        sides = Math.floor(Math.random() * 7 + 2)
        scale = Math.random() * 0.2 + 0.4
        spread = Math.random() * 2.0 + 0.1
        color = 'hsl(' + Math.random() * 360 + ', 100%, 50%)'
        //color = 'hsl(255, 100%, 50%)'
        lineWidth = Math.floor(Math.random() * 20 + 10)


    }

    randomizeButton.addEventListener('click', function () {
        randomizeFractal()
        drawFractal()

    })


})

/*
 // effect settings
 let size = 200
 let sides = 8
 let maxLevel = 7
 let scale = 0.5
 let spread = 0.7
 let branches = 2
 let color = 'hsl(226,100%,50%)'
 // let color = 'hsl(' + Math.random() * 360 + ',100%,50%)'
 */