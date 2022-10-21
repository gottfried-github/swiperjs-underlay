# Swiperjs-underlay
## Demo
See [demo](https://gottfried-github.github.io/swiperjs-underlay/dist/index.html)

## Description
Make slides transparent when they intersect with buttons. For use with [Swiper.js](https://swiperjs.com/)

## Implementation
1. On each frame, only check immediate siblings of currently underlaid slides
2. Use rAf for animation

## TODO
1. generalize to uses with various Swiper.js options 
2. generalize to using custom effects on the slides