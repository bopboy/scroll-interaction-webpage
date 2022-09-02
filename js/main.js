(() => {
    let yOffset = 0
    let prevScrollHeight = 0
    let currentScene = 0
    let enterNewScene = false

    const sceneInfo = [
        {
            // 0
            type: 'sticky',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-0'),
                messageA: document.querySelector('#scroll-section-0 .main-message.a'),
                messageB: document.querySelector('#scroll-section-0 .main-message.b'),
                messageC: document.querySelector('#scroll-section-0 .main-message.c'),
                messageD: document.querySelector('#scroll-section-0 .main-message.d'),
                canvas: document.querySelector('#video-canvas-0'),
                context: document.querySelector('#video-canvas-0').getContext('2d'),
                videoImages: []
            },
            values: {
                videoImageCount: 300,
                imageSequence: [0, 299],
                canvas_opacity: [1, 0, { start: 0.9, end: 1 }],
                messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
                messageB_opacity_in: [0, 1, { start: 0.3, end: 0.4 }],
                messageC_opacity_in: [0, 1, { start: 0.5, end: 0.6 }],
                messageD_opacity_in: [0, 1, { start: 0.7, end: 0.8 }],
                messageA_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],
                messageB_translateY_in: [20, 0, { start: 0.3, end: 0.4 }],
                messageC_translateY_in: [20, 0, { start: 0.5, end: 0.6 }],
                messageD_translateY_in: [20, 0, { start: 0.7, end: 0.8 }],
                messageA_opacity_out: [1, 0, { start: 0.25, end: 0.3 }],
                messageB_opacity_out: [1, 0, { start: 0.45, end: 0.5 }],
                messageC_opacity_out: [1, 0, { start: 0.65, end: 0.7 }],
                messageD_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
                messageA_translateY_out: [0, -20, { start: 0.25, end: 0.3 }],
                messageB_translateY_out: [0, -20, { start: 0.45, end: 0.5 }],
                messageC_translateY_out: [0, -20, { start: 0.65, end: 0.7 }],
                messageD_translateY_out: [0, -20, { start: 0.85, end: 0.9 }],
            }
        },
        {
            // 1
            type: 'normal',
            // heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-1'),
            }
        },
        {
            // 2
            type: 'sticky',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-2'),
                messageA: document.querySelector('#scroll-section-2 .a'),
                messageB: document.querySelector('#scroll-section-2 .b'),
                messageC: document.querySelector('#scroll-section-2 .c'),
                pinB: document.querySelector('#scroll-section-2 .b .pin'),
                pinC: document.querySelector('#scroll-section-2 .c .pin'),
                canvas: document.querySelector('#video-canvas-1'),
                context: document.querySelector('#video-canvas-1').getContext('2d'),
                videoImages: []
            },
            values: {
                videoImageCount: 960,
                imageSequence: [0, 959],
                canvas_opacity_in: [0, 1, { start: 0, end: 0.1 }],
                canvas_opacity_out: [1, 0, { start: 0.95, end: 1 }],
                messageA_translateY_in: [20, 0, { start: 0.15, end: 0.2 }],
                messageB_translateY_in: [20, 0, { start: 0.15, end: 0.2 }],
                messageC_translateY_in: [20, 0, { start: 0.15, end: 0.2 }],
                messageA_opacity_in: [0, 1, { start: 0.15, end: 0.2 }],
                messageB_opacity_in: [0, 1, { start: 0.5, end: 0.55 }],
                messageC_opacity_in: [0, 1, { start: 0.72, end: 0.77 }],
                messageA_translateY_out: [0, -20, { start: 0.3, end: 0.35 }],
                messageB_translateY_out: [0, -20, { start: 0.58, end: 0.63 }],
                messageC_translateY_out: [0, -20, { start: 0.85, end: 0.9 }],
                messageA_opacity_out: [1, 0, { start: 0.3, end: 0.35 }],
                messageB_opacity_out: [1, 0, { start: 0.58, end: 0.63 }],
                messageC_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
                pinB_scaleY: [0.5, 1, { start: 0.5, end: 0.55 }],
                pinC_scaleY: [0.5, 1, { start: 0.72, end: 0.77 }],
                pinB_opacity_in: [0, 1, { start: 0.5, end: 0.55 }],
                pinC_opacity_in: [0, 1, { start: 0.72, end: 0.77 }],
                pinB_opacity_out: [1, 0, { start: 0.58, end: 0.63 }],
                pinC_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
            }
        },
        {
            // 3
            type: 'sticky',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-3'),
                canvasCaption: document.querySelector('.canvas-caption'),
                canvas: document.querySelector('.image-blend-canvas'),
                context: document.querySelector('.image-blend-canvas').getContext('2d'),
                imagesPath: ['./images/blend-image-1.jpg', './images/blend-image-2.jpg'],
                images: []
            },
            values: {
                rect1X: [0, 0, { start: 0, end: 0 }],
                rect2X: [0, 0, { start: 0, end: 0 }],
                imageBlendY: [0, 0, { start: 0, end: 0 }],
                rectStartY: 0,
            }
        },
    ]
    function setCanvasImage() {
        let imgElem
        for (let i = 0; i < sceneInfo[0].values.videoImageCount; i++) {
            imgElem = new Image()
            imgElem.src = `./video/001/IMG_${6726 + i}.JPG`
            sceneInfo[0].objs.videoImages.push(imgElem)
        }
        let imgElem2
        for (let i = 0; i < sceneInfo[2].values.videoImageCount; i++) {
            imgElem2 = new Image()
            imgElem2.src = `./video/002/IMG_${7027 + i}.JPG`
            sceneInfo[2].objs.videoImages.push(imgElem2)
        }
        let imgElem3
        for (let i = 0; i < sceneInfo[3].objs.imagesPath.length; i++) {
            imgElem3 = new Image()
            imgElem3.src = sceneInfo[3].objs.imagesPath[i]
            sceneInfo[3].objs.images.push(imgElem3)
        }

    }
    setCanvasImage()

    function setLayout() {
        for (let i = 0; i < sceneInfo.length; i++) {
            if (sceneInfo[i].type === 'sticky') {
                sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight
            } else if (sceneInfo[i].type === 'normal') {
                sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight
            }
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`
        }
        yOffset = window.pageYOffset
        let totalScrollHeight = 0
        for (let i = 0; i < sceneInfo.length; i++) {
            totalScrollHeight += sceneInfo[i].scrollHeight
            if (totalScrollHeight >= yOffset) {
                currentScene = i
                break
            }
        }
        document.body.setAttribute('id', `show-scene-${currentScene}`)

        const heightRatio = window.innerHeight / 1080
        sceneInfo[0].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`
        sceneInfo[2].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`
    }
    function calcValues(values, currentYOffset) {
        let rv
        const scrollHeight = sceneInfo[currentScene].scrollHeight
        const scrollRatio = currentYOffset / scrollHeight

        if (values.length === 3) {
            const partScrollStart = values[2].start * scrollHeight
            const partScrollEnd = values[2].end * scrollHeight
            const partScrollHeight = partScrollEnd - partScrollStart

            if (currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd) {
                rv = (currentYOffset - partScrollStart) / partScrollHeight * (values[1] - values[0]) + values[0];
            } else if (currentYOffset < partScrollEnd) {
                rv = values[0]
            } else if (currentYOffset > partScrollEnd) {
                rv = values[1]
            }
        } else {
            rv = scrollRatio * (values[1] - values[0]) + values[0]
        }
        return rv
    }
    function playAnimation() {
        const objs = sceneInfo[currentScene].objs
        const values = sceneInfo[currentScene].values
        const currentYOffset = yOffset - prevScrollHeight
        const scrollHeight = sceneInfo[currentScene].scrollHeight
        const scrollRatio = currentYOffset / scrollHeight

        switch (currentScene) {
            case 0:
                let sequence = Math.round(calcValues(values.imageSequence, currentYOffset))
                objs.context.drawImage(objs.videoImages[sequence], 0, 0)
                objs.canvas.style.opacity = calcValues(values.canvas_opacity, currentYOffset)

                if (scrollRatio <= 0.22) {
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset)
                    objs.messageA.style.transform = `translateY(${calcValues(values.messageA_translateY_in, currentYOffset)}%)`
                } else {
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset)
                    objs.messageA.style.transform = `translateY(${calcValues(values.messageA_translateY_out, currentYOffset)}%)`
                }
                if (scrollRatio <= 0.42) {
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset)
                    objs.messageB.style.transform = `transform3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%)`
                } else {
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset)
                    objs.messageB.style.transform = `translateY(${calcValues(values.messageB_translateY_out, currentYOffset)}%)`
                }
                if (scrollRatio <= 0.62) {
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset)
                    objs.messageC.style.transform = `transform3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%)`
                } else {
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset)
                    objs.messageC.style.transform = `translateY(${calcValues(values.messageC_translateY_out, currentYOffset)}%)`
                }
                if (scrollRatio <= 0.82) {
                    objs.messageD.style.opacity = calcValues(values.messageD_opacity_in, currentYOffset)
                    objs.messageD.style.transform = `transform3d(0, ${calcValues(values.messageD_translateY_in, currentYOffset)}%)`
                } else {
                    objs.messageD.style.opacity = calcValues(values.messageD_opacity_out, currentYOffset)
                    objs.messageD.style.transform = `translateY(${calcValues(values.messageD_translateY_out, currentYOffset)}%)`
                }
                break
            case 1:
                break
            case 2:
                let sequence2 = Math.round(calcValues(values.imageSequence, currentYOffset))
                objs.context.drawImage(objs.videoImages[sequence2], 0, 0)

                if (scrollRatio <= 0.5) {
                    objs.canvas.style.opacity = calcValues(values.canvas_opacity_in, currentYOffset)
                } else {
                    objs.canvas.style.opacity = calcValues(values.canvas_opacity_out, currentYOffset)
                }
                if (scrollRatio <= 0.32) {
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset)
                    objs.messageA.style.transform = `transform3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%)`
                } else {
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset)
                    objs.messageA.style.transform = `translateY(${calcValues(values.messageA_translateY_out, currentYOffset)}%)`
                }
                if (scrollRatio <= 0.67) {
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset)
                    objs.messageB.style.transform = `transform3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%)`
                    objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`
                } else {
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset)
                    objs.messageB.style.transform = `translateY(${calcValues(values.messageB_translateY_out, currentYOffset)}%)`
                    objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`
                }
                if (scrollRatio <= 0.93) {
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset)
                    objs.messageC.style.transform = `transform3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%)`
                    objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`
                } else {
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset)
                    objs.messageC.style.transform = `translateY(${calcValues(values.messageC_translateY_out, currentYOffset)}%)`
                    objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`
                }
                if (scrollRatio > 0.9) {
                    const objs = sceneInfo[3].objs
                    const values = sceneInfo[3].values
                    const widthRatio = window.innerWidth / objs.canvas.width
                    const heightRatio = window.innerHeight / objs.canvas.height
                    let canvasScaleRatio

                    if (widthRatio <= heightRatio) {
                        canvasScaleRatio = heightRatio
                    } else {
                        canvasScaleRatio = widthRatio
                    }
                    objs.canvas.style.transform = `scale(${canvasScaleRatio})`
                    objs.context.fillStyle = 'white'
                    objs.context.drawImage(objs.images[0], 0, 0)

                    const recalculatedInnerWidth = document.body.offsetWidth / canvasScaleRatio
                    const recalculatedInnerHeight = window.innerHeight / canvasScaleRatio

                    const whiteRectWidth = recalculatedInnerWidth * 0.15
                    values.rect1X[0] = (objs.canvas.width - recalculatedInnerWidth) / 2
                    values.rect1X[1] = values.rect1X[0] - whiteRectWidth
                    values.rect2X[0] = values.rect1X[0] + recalculatedInnerWidth - whiteRectWidth
                    values.rect2X[1] = values.rect2X[0] + whiteRectWidth

                    objs.context.fillRect(parseInt(values.rect1X[0]), 0, parseInt(whiteRectWidth), objs.canvas.height)
                    objs.context.fillRect(parseInt(values.rect2X[0]), 0, parseInt(whiteRectWidth), objs.canvas.height)
                }
                break
            case 3:
                let step = 0
                const widthRatio = window.innerWidth / objs.canvas.width
                const heightRatio = window.innerHeight / objs.canvas.height
                let canvasScaleRatio

                if (widthRatio <= heightRatio) {
                    canvasScaleRatio = heightRatio
                } else {
                    canvasScaleRatio = widthRatio
                }
                objs.canvas.style.transform = `scale(${canvasScaleRatio})`
                objs.context.fillStyle = 'white'
                objs.context.drawImage(objs.images[0], 0, 0)

                const recalculatedInnerWidth = document.body.offsetWidth / canvasScaleRatio
                const recalculatedInnerHeight = window.innerHeight / canvasScaleRatio

                if (!values.rectStartY) {
                    // values.rectStartY = objs.canvas.getBoundingClientRect().top
                    values.rectStartY = objs.canvas.offsetTop + (objs.canvas.height - objs.canvas.height * canvasScaleRatio) / 2
                    values.rect1X[2].start = (window.innerHeight / 2) / scrollHeight
                    values.rect2X[2].start = (window.innerHeight / 2) / scrollHeight
                    values.rect1X[2].end = values.rectStartY / scrollHeight
                    values.rect2X[2].end = values.rectStartY / scrollHeight
                }

                const whiteRectWidth = recalculatedInnerWidth * 0.15
                values.rect1X[0] = (objs.canvas.width - recalculatedInnerWidth) / 2
                values.rect1X[1] = values.rect1X[0] - whiteRectWidth
                values.rect2X[0] = values.rect1X[0] + recalculatedInnerWidth - whiteRectWidth
                values.rect2X[1] = values.rect2X[0] + whiteRectWidth

                objs.context.fillRect(parseInt(calcValues(values.rect1X, currentYOffset)), 0, parseInt(whiteRectWidth), objs.canvas.height)
                objs.context.fillRect(parseInt(calcValues(values.rect2X, currentYOffset)), 0, parseInt(whiteRectWidth), objs.canvas.height)

                if (scrollRatio < values.rect1X[2].end) {
                    step = 1
                    // console.log('캔버스 닿기 전')
                    objs.canvas.classList.remove('sticky')
                } else {
                    step = 2
                    // console.log('캔버스 닿기 후')
                    objs.context.drawImage(objs.images[1], 0, 200)
                    objs.canvas.classList.add('sticky')
                    objs.canvas.style.top = `${-(objs.canvas.height - objs.canvas.height * canvasScaleRatio) / 2}px`
                }

                break
        }
    }
    function scrollLoop() {
        enterNewScene = false
        prevScrollHeight = 0
        for (let i = 0; i < currentScene; i++) {
            prevScrollHeight += sceneInfo[i].scrollHeight
        }
        if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
            enterNewScene = true
            currentScene++
            document.body.setAttribute('id', `show-scene-${currentScene}`)
        }
        if (yOffset < prevScrollHeight) {
            enterNewScene = true
            if (currentScene === 0) return
            currentScene--
            document.body.setAttribute('id', `show-scene-${currentScene}`)
        }
        if (enterNewScene) return
        playAnimation()
    }
    window.addEventListener('scroll', () => {
        yOffset = window.pageYOffset
        scrollLoop()
    })
    // window.addEventListener('DOMContentLoaded', setLayout)
    window.addEventListener('load', () => {
        setLayout()
        sceneInfo[0].objs.context.drawImage(sceneInfo[0].objs.videoImages[0], 0, 0)
    })
    window.addEventListener('resize', setLayout)
    setLayout()
})()