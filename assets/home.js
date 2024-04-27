document.addEventListener('DOMContentLoaded', () => {
    // Auto-associate collapsible content and its controller
    for (const controller of document.querySelectorAll('[aria-controls][aria-expanded][data-auto-associate]')) {
        const controlled = document.getElementById(controller.getAttribute('aria-controls'))
        if (!controlled || !controlled.classList.contains('transition')) {
            continue
        }
        controller.addEventListener('click', () => {
            const isCurrentlyActive = controller.getAttribute('aria-expanded') == 'true'
            if (isCurrentlyActive) {
                controller.setAttribute('aria-expanded', 'false')
                controlled.dataset.expanded = false
                controlled.classList.remove('in')
                controlled.classList.add('out', 'animating')
            } else {
                controller.setAttribute('aria-expanded', 'true')
                controlled.dataset.expanded = true
                controlled.classList.remove('out')
                controlled.classList.add('in', 'animating')
            }
        })
        controlled.addEventListener('animationend', () => {
            controlled.classList.remove('animating')
        })

        // init
        if (controller.getAttribute('aria-expanded') != 'true') {
            controller.setAttribute('aria-expanded', 'false')
            controlled.classList.add('out')
            controlled.classList.remove('animating', 'in')
            controlled.dataset.expanded = false
        }
    }

    // Switch card-tabs accordions
    document.querySelectorAll('.card.stacked.transition').forEach((card, index) => {
        if (index == 0) {
            card.parentElement.style.zIndex = 'calc(var(--l) + 1)'
        } else if (index == 1) {
            card.parentElement.style.zIndex = 'var(--l)'
        }

        card.addEventListener('animationend', () => {
            card.classList.remove('animating', 'up', 'down')
        })

        card.addEventListener('animationiteration', () => {
            if (card.classList.contains('up')) {
                card.parentElement.style.zIndex = 'calc(var(--l) + 1)'
            } else if (card.parentElement.style.zIndex.startsWith('calc')) {
                card.parentElement.style.zIndex = 'var(--l)'
            } else {
                card.parentElement.style.zIndex = ''
            }
        })
    })
    const cardTabButtons = document.querySelectorAll('#fun-fact-tabs > button')
    function handleTabButtonClick(event) {
        const { currentTarget: target } = event
        const { group } = target.dataset
        const targetCardId = target.getAttribute('aria-controls')
        const targetCard = document.getElementById(targetCardId)

        const allButtons = cardTabButtons
        allButtons.forEach(button => {
            button.setAttribute('aria-expanded', 'false')
        })
        target.setAttribute('aria-expanded', 'true')

        const otherCards = document.querySelectorAll(`.stacked[data-group="${group}"]:not(#${targetCardId})`)
        targetCard.classList.add('up', 'animating')
        otherCards.forEach(e => e.classList.add('down', 'animating'))
    }
    cardTabButtons.forEach(button => {
        button.addEventListener('click', handleTabButtonClick)
    })

    /* Fancy long press avatar */
    const avatarWidget = document.getElementById('avatar-widget')
    const avatarCircle = /** @type SVGCircleElement */ avatarWidget.querySelector('#avatar-circle circle')
    const handleAvatarAnimStart = () => {
        if (avatarWidget.classList.contains('animating') || avatarWidget.classList.contains('animated')) {
            console.log("animation skipped");
            return
        }

        /* start anim */
        console.log("animation start");
        avatarWidget.classList.add('animating')
        const totalTime = 5000;
        const updateTime = 500;
        const totalLength = parseFloat(avatarCircle.getAttribute('stroke-dasharray'));
        const progressInterval = setInterval(() => {
            let offset = avatarCircle.style.strokeDashoffset || totalLength
            // Firefox automatically convert pixel value integer to string '<number>px'
            if (offset.endsWith?.('px')) {
                offset = parseFloat(offset.slice(0, -2))
            }
            const newOffset = offset - totalLength / (totalTime / updateTime)
            avatarCircle.style.strokeDashoffset = newOffset
            console.log("animation update", offset, newOffset);
            if (newOffset <= 0) {
                console.log("animation end, dispatching MyAnimationEnd");
                avatarWidget.dispatchEvent(new CustomEvent('MyAnimationEnd'))
                clearInterval(progressInterval)
                avatarCircle.style.transitionDuration = '1s'
                avatarCircle.style.strokeDashoffset = -totalLength
            }
        }, updateTime);

        /* configure anim finish listener */
        const handleAvatarAnimEnd = () => {
            handleAvatarAnimAbort()
            avatarWidget.classList.add('animated')
            console.log("animation ended");

            const glassesTempl = document.getElementById('avatar-glasses')
            const glasses = glassesTempl.content.firstElementChild.cloneNode(true)
            const avatarBox = avatarWidget.getBoundingClientRect()
            avatarWidget.appendChild(glasses)
            glasses.animate([
                {
                    // transform: 'translate(-100%, 0)',
                    top: `-${avatarBox.top / avatarBox.height * 100}%`,
                },
                {
                    // transform: 'translate(0, 0)',
                    top: '26.5%',
                },
            ], 8000)
        }

        /* configure abort anim listener */
        const handleAvatarAnimAbort = (e) => {
            if (e) {
                console.log("animation abort due to", e.type)
                clearInterval(progressInterval)
                avatarCircle.style.strokeDashoffset = totalLength
            }
            avatarWidget.removeEventListener('MyAnimationEnd', handleAvatarAnimEnd)
            document.removeEventListener('mouseup', handleAvatarAnimAbort)
            avatarWidget.classList.remove('animating')
        }

        let _ = ['mouseup', 'touchend', 'touchcancel'].forEach((eventName) => {
            document.addEventListener(eventName, handleAvatarAnimAbort)
        })
        avatarWidget.addEventListener('MyAnimationEnd', handleAvatarAnimEnd)
    }
    let _ = ['mousedown', 'touchstart'].forEach((eventName) => {
        avatarWidget.addEventListener(eventName, handleAvatarAnimStart)
    })

    /* Pub image collapse on mobile */
    const pubImgList = Array.from(document.getElementsByClassName('pub-img-wrapper'))
    const pubImgBtnList = pubImgList.map(e => e.getElementsByClassName('pub-img-collapser')[0])
    function togglePubImg(index, value) {
        const btn = pubImgBtnList[index]
        const pubImgWrapper = pubImgList[index]
        if (value == undefined) {
            value = btn.getAttribute('aria-expanded') != 'true' // the inverse of current
        }
        btn.setAttribute('aria-expanded', value.toString())
        pubImgWrapper.classList.toggle('expanded', value)
    }
    function togglePubImgCollapseOther(index, value) {
        const btn = pubImgBtnList[index]
        if (value == undefined) {
            value = btn.getAttribute('aria-expanded') != 'true' // the inverse of current
        }
        if (value) {
            // if from collapse (false) to expanded (true)
            const topBefore = pubImgList[index].getBoundingClientRect().top
            for (let i = 0; i < pubImgList.length; i++) {
                if (i == index)
                    togglePubImg(i, true)
                else
                    togglePubImg(i, false)
            }
            const topAfter = pubImgList[index].getBoundingClientRect().top
            window.scrollBy(0, topAfter - topBefore)
        } else {
            // if from expanded (true) to collapse (false)
            togglePubImg(index, false)
        }
    }
    pubImgBtnList.forEach((btn, index) => {
        btn.addEventListener('click', () => togglePubImgCollapseOther(index))
    })

    // language switch: clickaway
    const languageSwitchButton = document.getElementById('language-switch-button')
    document.addEventListener('click', e => {
        if (!e.target.closest('#language-switch') && languageSwitchButton.getAttribute('aria-expanded') == 'true') {
            languageSwitchButton.click()
        }
    })

    // Dark mode switch: update icon
    const darkModeIcon = document.querySelector('#dark-mode-toggle>svg')
    window.addEventListener('onColorSchemeChange', e => {
        console.log(e)
        const colorScheme = e.detail;
        if (colorScheme == 'dark') {
            darkModeIcon.classList.replace('sun', 'moon')
        } else {
            darkModeIcon.classList.replace('moon', 'sun')
        }
    })
    const currentScheme = document.documentElement.dataset.scheme
    if (currentScheme == 'light')
        darkModeIcon.classList.add('sun')
    else if (currentScheme == 'dark')
        darkModeIcon.classList.add('moon')
})