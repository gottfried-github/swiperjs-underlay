import {Swiper, Pagination, Navigation, FreeMode} from 'swiper'

class Main {
    constructor() {
        this.initSlider()
    }

    initSlider() {
        const btnPrev = document.querySelector('.brief-list-container .button-prev-container .button'),
        btnNext = document.querySelector('.brief-list-container .button-next-container .button')

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
            navigation: { prevEl: btnPrev, nextEl: btnNext}
        });

        console.log(swiper);
    }
}

window.addEventListener('load', () => {
    const main = new Main()
})
