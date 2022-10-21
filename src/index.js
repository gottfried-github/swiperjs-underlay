import {Swiper, Pagination, Navigation, FreeMode} from 'swiper'

class Main {
    constructor() {
        this.transparentClass = 'transparent'

        this.slides = document.querySelectorAll('.slides-container .slide')
        this.btnPrev = document.querySelector('.swiper-container .button-prev-container .button')
        this.btnNext = document.querySelector('.swiper-container .button-next-container .button')

        this.pointLeft = null
        this.pointRight = null

        this.slideLeft = null
        this.slideRight = null

        this.setSliderState(20)
        window.addEventListener('resize', () => {
            // TODO: before setSliderState, make sure that swiper translation/transition isn't running
            this.setSliderState(20)
        })

        this.initSwiper()
    }

    initSwiper() {
        const swiper = new Swiper(document.querySelector('.slides-wrapper'), {
            modules: [Navigation, FreeMode],
            slidesPerView: 'auto',
            freeMode: {
                enabled: true,
                sticky: false,
                momentumBounce: true, momentumBounceRatio: 1,
                momentum: true,
                momentumRatio: 1,
                momentumVelocityRatio: 1,
                minimumVelocity: 0.02
            },
            navigation: { prevEl: this.btnPrev, nextEl: this.btnNext}
        });

        swiper.on('setTranslate', this._handleSliding.bind(this))
        swiper.on('setTransition', (swiper, dur) => {
            if (0 === dur) return

            requestAnimationFrame(this._makeRaFCb(null, dur, this._handleSliding.bind(this), this._makeRaFCb.bind(this)))
        })

        console.log(swiper);
    }

    _makeRaFCb(timeInitial, dur, cb, makeRaFCb) {
        return (time) => {
            if (null === timeInitial) timeInitial = time
            if (dur < time - timeInitial) {
                // console.log('rAfCb, more time has passed than the given duration - dur, time - timeInitial:', dur, time - timeInitial);
                return
            }

            cb()
            requestAnimationFrame(makeRaFCb(timeInitial, dur, cb, makeRaFCb))
        }
    }

    setSliderState(offset) {
        this.setPoints(offset)
        this._setInitialSlides()
        this._setSlidesState()
    }

    _handleSliding() {
        if (this._isBehindLeft(this.pointLeft, this.slideLeft)) {
            if (!this.slideLeft.classList.contains(this.transparentClass)) this.slideLeft.classList.add(this.transparentClass)
            if (this.slideLeft.nextElementSibling && this._isBehindLeft(this.pointLeft, this.slideLeft.nextElementSibling)) this.slideLeft = this.slideLeft.nextElementSibling
        } else {
            if (this.slideLeft.classList.contains(this.transparentClass)) this.slideLeft.classList.remove(this.transparentClass)
            this.slideLeft = this.slideLeft.previousElementSibling || this.slideLeft
        }

        if (this._isBehindRight(this.pointRight, this.slideRight)) {
            if (!this.slideRight.classList.contains(this.transparentClass)) this.slideRight.classList.add(this.transparentClass)
            if (this.slideRight.previousElementSibling && this._isBehindRight(this.pointRight, this.slideRight.previousElementSibling)) this.slideRight = this.slideRight.previousElementSibling
        } else {
            if (this.slideRight.classList.contains(this.transparentClass)) this.slideRight.classList.remove(this.transparentClass)
            this.slideRight = this.slideRight.nextElementSibling || this.slideRight
        }
    }

    // private, because depends on pointLeft/pointRight being set
    _setSlidesState() {
        for (const slide of this.slides) {
            if (this._isBehindLeft(this.pointLeft, slide)) {
                slide.classList.add(this.transparentClass)
            } else if (this._isBehindRight(this.pointRight, slide)) {
                slide.classList.add(this.transparentClass)
            } else {
                slide.classList.remove(this.transparentClass)
            }
        }
    }

    // private, because depends on pointLeft/pointRight being set
    _setInitialSlides() {
        this.slideLeft = this._getClosest(this.pointLeft, this.slides, true)
        this.slideRight = this._getClosest(this.pointRight, this.slides)
    }

    setPoints(offset) {
        this.pointLeft = this.btnPrev.getBoundingClientRect().right - offset
        this.pointRight = this.btnNext.getBoundingClientRect().left + offset
    }

    _getClosest(point, slides, left) {
        let [prevD, prevEl] = [null, null]

        for (const slide of slides) {
            const d = Math.abs(point - left ? slide.getBoundingClientRect().left : slide.getBoundingClientRect().right)
            if (null === prevD || d < prevD) { prevD = d; prevEl = slide; continue }
            return prevEl
        }
    }

    _isBehindLeft(point, el) {
        return el.getBoundingClientRect().left < point
    }

    _isBehindRight(point, el) {
        return el.getBoundingClientRect().right > point
    }
}

window.addEventListener('load', () => {
    const main = new Main()
})
