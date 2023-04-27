import { preloadImages } from './utils'

const grid = document.querySelector('.grid')
const gridItems = [...grid.querySelectorAll('.grid-img')]

preloadImages('.img div').then( _ => {

	// Smooth scrolling initialization (using Lenis https://github.com/studio-freight/lenis)
    document.body.classList.remove('loading')
    const lenis = new Lenis({
        lerp: 0.1,
        smooth: true
    })

    const scrollFn = () => {
        lenis.raf()
        requestAnimationFrame(scrollFn)
    }

    requestAnimationFrame(scrollFn)

    let winsize;
    const calcWindowSize = () => {
        winsize = {width: window.innerWidth, height: window.innerHeight}
    }
    calcWindowSize()
    window.addEventListener('resize', calcWindowSize)

    gridItems.forEach(item => {
        
        gsap.timeline()
        .set(grid, {
            perspective: 1000,
            perspectiveOrigin: `50% ${winsize.height/2 + lenis.scroll}px`
        })
        .to(item, {
            ease: 'none',
            startAt: {rotationX: 70, scale: 0.7},
            scale: 1,
            rotationX: -70,
            scrollTrigger: {
                trigger: item,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
                onUpdate: self => gsap.set(grid, {
                    perspectiveOrigin: () => `50% ${winsize.height/2 + lenis.scroll}px`
                })
            }
        })

    })
})