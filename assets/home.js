document.addEventListener('DOMContentLoaded', () => {
    for (const e of document.getElementsByClassName('transition')) {
        if (!e.classList.contains('in'))
            e.classList.add('out')
    }

    for (const controller of document.querySelectorAll('[aria-controls][aria-expanded]')) {
        const controlled = document.getElementById(controller.getAttribute('aria-controls'))
        if (!controlled || !controlled.classList.contains('transition')) {
            continue
        }
        controller.addEventListener('click', () => {
            const isCurrentlyActive = controller.getAttribute('aria-expanded') == 'true'
            if (isCurrentlyActive) {
                controller.setAttribute('aria-expanded', 'false')
                controlled.classList.remove('in')
                controlled.classList.add('out', 'animating')
            } else {
                controller.setAttribute('aria-expanded', 'true')
                controlled.classList.remove('out')
                controlled.classList.add('in', 'animating')
            }
        })
        controlled.addEventListener('animationend', () => {
            controlled.classList.remove('animating')
        })
    }

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

    const languageSwitchButton = document.getElementById('language-switch-button')
    document.addEventListener('click', e => {
        if (!e.target.closest('#language-switch') && languageSwitchButton.getAttribute('aria-expanded') == 'true') {
            languageSwitchButton.click()
        }
    })
})