import {Swiper, Pagination, Navigation, FreeMode} from 'swiper'

class Main {
    constructor() {
        this.transparentClass = 'transparent'

        this.slides = document.querySelectorAll('.slides-container')
        this.btnPrev = document.querySelector('.brief-list-container .button-prev-container .button'),
        this.btnNext = document.querySelector('.brief-list-container .button-next-container .button')

        this.pointLeft = null
        this.pointRight = null

        this.slideLeft = null
        this.slideRight = null

        const swiper = new Swiper(document.querySelector('.slides-wrapper'), {
            modules: [Navigation, FreeMode], // FreeMode
            slidesPerView: 'auto',
            // freeMode: true,
            freeMode: {
                enabled: true,
                sticky: false,
                momentumBounce: true, momentumBounceRatio: 1,
                momentum: true,
                momentumRatio: 1,
                momentumVelocityRatio: 1,
                minimumVelocity: 0.02
            },
            // spaceBetween: 120,
            navigation: { prevEl: this.btnPrev, nextEl: this.btnNext}
        });

        console.log(swiper);

        swiper.on('setTranslate', this.handleSliding.bind(this))
        swiper.on('setTransition', (swiper, dur) => {
            if (0 === dur) return

            requestAnimationFrame(this.makeRaFCb(null, dur, this.handleSliding.bind(this), this.makeRaFCb))
        })

        window.addEventListener('resize', () => {
            // TODO: before setSliderState, make sure that swiper translation/transition isn't running
            this.setSliderState(20)
        })
    }

    makeRaFCb(timeInitial, dur, cb, makeRaFCb) {
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
        this.setInitialSlides()
        this.setSlidesState()
    }

    handleSliding() { // swiper, translate
        // console.log('initBriefList, swiper setTranslate cb, translate:', translate);
        if (this.isBehindLeft(this.leftPoint, this.leftSlide.querySelector(`.${briefClass}`))) {
            // console.log('initBriefList, swiper setTranslate cb, leftSlide is behind, leftSlide:', leftSlide);
            if (!this.leftSlide.classList.contains(transparentClass)) this.leftSlide.classList.add(transparentClass)
            if (this.leftSlide.nextElementSibling && this.isBehindLeft(this.leftPoint, this.leftSlide.nextElementSibling.querySelector(`.${briefClass}`))) this.leftSlide = this.leftSlide.nextElementSibling
        } else {
            // console.log('initBriefList, swiper setTranslate cb, leftSlide isnt behind, leftSlide:', leftSlide);
            if (this.leftSlide.classList.contains(transparentClass)) this.leftSlide.classList.remove(transparentClass)
            this.leftSlide = this.leftSlide.previousElementSibling || this.leftSlide
        }

        if (this.isBehindRight(this.rightPoint, this.rightSlide.querySelector(`.${briefClass}`))) {
            // console.log('initBriefList, swiper setTranslate cb, rightSlide is behind, rightSlide:', rightSlide);
            if (!this.rightSlide.classList.contains(transparentClass)) this.rightSlide.classList.add(transparentClass)
            if (this.rightSlide.previousElementSibling && this.isBehindRight(this.rightPoint, this.rightSlide.previousElementSibling.querySelector(`.${briefClass}`))) this.rightSlide = this.rightSlide.previousElementSibling
        } else {
            // console.log('initBriefList, swiper setTranslate cb, rightSlide isnt behind, rightSlide:', rightSlide);
            if (this.rightSlide.classList.contains(transparentClass)) this.rightSlide.classList.remove(transparentClass)
            this.rightSlide = this.rightSlide.nextElementSibling || this.rightSlide
        }
    }

    setSlidesState() {
        for (const slide of slides) {
            if (this.isBehindLeft(leftPoint, slide.querySelector(`.${briefClass}`))) {
                // if (null === leftSlide) leftSlide = slide
                slide.classList.add('transparent')
            } else if (this.isBehindRight(rightPoint, slide.querySelector(`.${briefClass}`))) {
                // if (null === rightSlide) rightSlide = slide
                slide.classList.add('transparent')
            } else {
                slide.classList.remove('transparent')
            }
        }
    }

    setInitialSlides() {
        this.slideLeft = this.getClosest(this.pointLeft, slides, true)
        this.slideRight = this.getClosest(this.pointRight, slides)
    }

    setPoints(offset) {
        this.pointLeft = this.btnPrev.getBoundingClientRect().right - offset
        this.pointRight = this.btnNext.getBoundingClientRect().left + offset
    }
}

window.addEventListener('load', () => {
    const main = new Main()
})
