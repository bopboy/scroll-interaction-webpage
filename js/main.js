(() => {
    let yOffset = 0
    let prevScrollHeight = 0
    let currentScene = 0

    const sceneInfo = [
        {
            // 0
            type: 'sticky',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-0'),
                messageA: document.querySelector('#scroll-section-0 .main-message.a'),
                messageA: document.querySelector('#scroll-section-0 .main-message.b'),
                messageA: document.querySelector('#scroll-section-0 .main-message.c'),
                messageA: document.querySelector('#scroll-section-0 .main-message.d'),
            },
            values: {
                messageA_opacity: [0, 1]
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
        return currentYOffset
    }
    function playAnimation() {
        const objs = sceneInfo[currentScene].objs
        const values = sceneInfo[currentScene].values
        const currentYOffset = yOffset - prevScrollHeight
        // console.log(currentScene, currentYOffset)

        switch (currentScene) {
            case 0:
                // console.log('0 play')
                let messageA_opacity_0 = values.messageA_opacity[0]
                let messageA_opacity_1 = values.messageA_opacity[1]
                console.log(calcValues(values.messageA_opacity, currentYOffset))
                break
            case 1:
                // console.log('1 play')
                break
            case 2:
                // console.log('2 play')
                break
            case 3:
                // console.log('3 play')
                break
        }
    }
    function scrollLoop() {
        prevScrollHeight = 0
        for (let i = 0; i < currentScene; i++) {
            prevScrollHeight += sceneInfo[i].scrollHeight
        }
        if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
            currentScene++
            document.body.setAttribute('id', `show-scene-${currentScene}`)
        }
        if (yOffset < prevScrollHeight) {
            if (currentScene === 0) return
            currentScene--
            document.body.setAttribute('id', `show-scene-${currentScene}`)
        }
        // document.body.setAttribute('id', `show-scene-${currentScene}`)
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