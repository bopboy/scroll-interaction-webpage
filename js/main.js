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
            },
            values: {
                messageA_opacity: [0, 1, { start: 0.1, end: 0.2 }],
                messageB_opacity: [0, 1, { start: 0.3, end: 0.4 }],
            }
        },
        {
            // 1
            type: 'normal',
            heightNum: 5,
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
            }
        },
        {
            // 3
            type: 'sticky',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-3'),
            }
        },
    ]
    function setLayout() {
        for (let i = 0; i < sceneInfo.length; i++) {
            sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight
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
                rv = (currentYOffset - partScrollStart) / partScrollHeight * (values[1] - values[0])
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

        switch (currentScene) {
            case 0:
                let message_opacity_in = calcValues(values.messageA_opacity, currentYOffset)
                console.log(message_opacity_in)
                objs.messageA.style.opacity = message_opacity_in
                break
            case 1:
                break
            case 2:
                break
            case 3:
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
    window.addEventListener('load', setLayout)
    window.addEventListener('resize', setLayout)
    setLayout()
})()