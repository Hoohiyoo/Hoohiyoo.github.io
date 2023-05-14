const openCtrl = document.querySelector('.action--menu')
const closeCtrl = document.querySelector('.action--close')
const mainLinks = document.querySelectorAll('.mainmenu > a.mainmenu__item')
const items = document.querySelectorAll('.menu__item')
const mainMenuItems = document.querySelectorAll('.mainmenu__item')
const smoothScrolls = document.querySelectorAll('.smooth-scroll')

let scrollPosition = 0 ;
	//Disable scroll
function disableScroll() {
    scrollPosition = window.pageYOffset;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.width = '100%';
}

function enableScroll() {
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, scrollPosition);
}


const lenis = new Lenis({
    lerp: 0.1,
    smooth: true
})

const scrollFn = () => {
    lenis.raf()
    requestAnimationFrame(scrollFn)
}

requestAnimationFrame(scrollFn)

openCtrl.addEventListener('click', () => animate('open'));
closeCtrl.addEventListener('click', () => animate('close'));
mainMenuItems.forEach(item => {
    // Lakukan sesuatu dengan setiap elemen
    item.addEventListener('click', () => animate('close'));
});



function animate(action) {

    const isMenuOpen = action === 'open';

    if(isMenuOpen){
        disableScroll();
    }else{
        enableScroll();
    }

    items.forEach((el) => {
        const innerEl = el.querySelector('.menu__item-inner');
        const config = {};
        const configInner = {};
        const direction = 'bt'; // Hanya menggunakan direction === 'bt'

    if (direction === 'bt') {
        config.y = '101%';
        configInner.y ='-101%';
        configInner.x = '0%';
    }

    if (isMenuOpen) {
        gsap.set(el, config);
        gsap.set(innerEl, configInner);
        gsap.to([el, innerEl], {
            duration: 1,
            ease: 'quint.out',
            y: '0%',
            x:'0%',
            onComplete : () => {
                innerEl.style.pointerEvents = isMenuOpen ? 'auto' : 'none';
            }
        });
    } else {
        gsap.to(el, {
            duration: 0.6,
            ease: 'quart.inOut',
            x:config.x || 0,
            y: config.y || 0
        });
        gsap.to(innerEl, {
            duration: 0.6,
            ease: 'quart.inOut',
            x:configInner.x || 0,
            y: configInner.y || 0
        });
        }
    })

    gsap.to(mainLinks, {
        duration: isMenuOpen ? 0.9 : 0.2,
        ease: isMenuOpen ? 'quint.out' : 'quart.inOut',
        startAt: isMenuOpen ? { y: '50%', opacity: 0 } : null,
        y: isMenuOpen ? '0%' : '50%',
        opacity: isMenuOpen ? 1 : 0,
        stagger: isMenuOpen ? 0.1 : -0.1,
    
    });


    gsap.to(closeCtrl, {
        duration : 0.6,
        ease: action === 'open' ? 'Quint.easeOut' : 'Quart.easeInOut',
        startAt: action === 'open' ? { rotation: 0 } : null,
        opacity: action === 'open' ? 1 : 0,
        rotation: action === 'open' ? 180 : 270,
        onComplete : () => {
            closeCtrl.style.pointerEvents = action === 'open' ? 'auto' : 'none';
        }
    });

    gsap.to(openCtrl,  {
        duration : action === 'open' ? 0.6 : 0.3,
        delay: action === 'open' ? 0 : 0.3,
        ease: action === 'open' ? 'Quint.easeOut' : 'Quad.easeOut',
        opacity: action === 'open' ? 0 : 1,
        onComplete : () => {
            openCtrl.style.pointerEvents = action === 'open' ? 'none' : 'auto';
        }
    });

}

smoothScrolls.forEach(link => {
    link.addEventListener('click' , event => {
        event.preventDefault()

        const targetId = link.getAttribute('href')
        const targetElement = document.querySelector(targetId)

        gsap.to(window , {
            duration : 0.9,
            delay : 0.5,
            scrollTo : {
                y : targetElement,
                offsetY:100
            },
            ease : "power2.out"
        })
    })
})

