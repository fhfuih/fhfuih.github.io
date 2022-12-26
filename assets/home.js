document.addEventListener('DOMContentLoaded', () => {
    /* Email collapse */
    /** @type HTMLButtonElement */
    const mailButtonEl = document.getElementById('email-button')
    /** @type HTMLSpanElement */
    const emailEl = document.getElementById('email')

    mailButtonEl.addEventListener('click', () => {
        const isCurrentlyActive = mailButtonEl.getAttribute('aria-expanded') == 'true'
        if (isCurrentlyActive) {
            mailButtonEl.setAttribute('aria-expanded', 'false')
            emailEl.classList.remove('in')
            emailEl.classList.add('out', 'animating')
        } else {
            mailButtonEl.setAttribute('aria-expanded', 'true')
            emailEl.classList.remove('out')
            emailEl.classList.add('in', 'animating')
        }
    })

    emailEl.addEventListener('animationend', () => {
        emailEl.classList.remove('animating')
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
})