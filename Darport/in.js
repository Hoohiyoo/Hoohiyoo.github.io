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

const timeline = gsap.timeline({
    scrollTrigger: {
        trigger: text,
        start: 'top 100%',
        end: 'bottom 60%',
        scrub: true
    }
});

// MEMISAHKAN TEXT MENJADI SATU_SATU
    const chars = text.textContent.split('');

// MEMBANGUN TEXT YANG TELAH DIPECAH DENGAN SPAN
    text.innerHTML = chars
    .map(char => `<span>${char}</span>`).join('');

// UNTUK FADE TEXT YANG TELAH DIPECAH MENJADI SATU_SATU
    timeline.from(text.querySelectorAll('span'), {
    'will-change' : 'opacity',
    opacity: .1,
    stagger: 0.05
});

// SETUP STYLE MY_SKILL
const skill = document.querySelectorAll('.skill-style');
    skill.forEach(title => {
        const chars = title.querySelectorAll('.char');
        const charsTotal = chars.length;
        gsap.fromTo(chars, {
            'will-change': 'transform', 
            y: position => {
                const factor = position < Math.ceil(charsTotal/2) ? position : Math.ceil(charsTotal/2) - Math.abs(Math.floor(charsTotal/2) - position) - 1
                return (charsTotal/2-factor+6)*130
            }
        }, 
        {
            ease: 'elastic.out(.4)',
            y: 0,
            stagger: {
                amount: 0.1,
                from: 'center'
            },
            scrollTrigger: {
                trigger: title,
                start: 'top 100%',
                end: 'bottom 10%',
                scrub: true
        }
    })
})