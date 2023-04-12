//SCRIPT UNTUK SCROLL LEBIH SMOOTH MENGGUNAKAN LENIS FRAMEWORK
const lenis = new Lenis()
const scrollFn = (time) => {
    lenis.raf(time)
    requestAnimationFrame(scrollFn)
};

requestAnimationFrame(scrollFn)


//SETUP UNTUK SCROLL ANIMATION
const content   = document.querySelector('.content')
const text      = document.querySelector('.text-1')
const textCon   = document.querySelectorAll('.content .text-1')

const timeline = gsap.timeline({
    scrollTrigger: {
        trigger: text,
        start: 'top 100%',
        end: 'bottom 60%',
        scrub: true,
        markers: true
    }
});

// Split text into individual characters
    const chars = text.textContent.split('');

// Rebuild text with each character wrapped in a span element
    text.innerHTML = chars
    .map(char => `<span>${char}</span>`).join('');

// Untuk rotate konten dan text

textCon.forEach((t) =>{
    gsap.from(t, {
        transformOrigin: '0% 50%',
        rotate : 3,
        scrollTrigger: {
            trigger: t,
            start: 'top 100%',
            end: 'bottom 20%',
            scrub: true
        },
    })
})

// Fade in each character
    timeline.from(text.querySelectorAll('span'), {
    opacity: .1,
    stagger: 0.05
});