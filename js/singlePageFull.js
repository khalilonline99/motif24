// pulse b2b
// Shopify plus
// Bigcommerce
// DTC

window.onload = function () {
  const svgAll = document.querySelectorAll(".scribbles_lines svg");
  const svgPaths = document.querySelectorAll(".scribbles_lines svg path");
  var seoTween = new TimelineMax({ repeat: -1 });
  const firstVisit = localStorage.getItem('visited');
  const tlPreloader = gsap.timeline();

  // Function to randomly change 20% of the paths to orange
  function randomizePathColors(paths, percentage) {
    const totalPaths = paths.length;
    const numOrangePaths = Math.ceil((percentage / 100) * totalPaths);
    const orangePaths = new Set();

    while (orangePaths.size < numOrangePaths) {
      const randomIndex = Math.floor(Math.random() * totalPaths);
      orangePaths.add(randomIndex);
    }

    paths.forEach((path, index) => {
      if (orangePaths.has(index)) {
        path.style.stroke = 'orange';
      } else {
        path.style.stroke = 'white';
      }
    });
  }

  // Apply the random stroke color change
  randomizePathColors(svgPaths, 20); // Change 20% of paths to orange

  seoTween
    .to(svgAll[0], 0.1, { autoAlpha: 1 })
    .to(svgAll[0], 0.1, { autoAlpha: 0 })
    .to(svgAll[3], 0.1, { autoAlpha: 1 })
    .to(svgAll[3], 0.1, { autoAlpha: 0 })
    .to(svgAll[2], 0.1, { autoAlpha: 1 })
    .to(svgAll[2], 0.1, { autoAlpha: 0 })
    .to(svgAll[1], 0.1, { autoAlpha: 1 })
    .to(svgAll[1], 0.1, { autoAlpha: 0 })
    .to(svgAll[6], 0.1, { autoAlpha: 1 })
    .to(svgAll[6], 0.1, { autoAlpha: 0 })
    .to(svgAll[5], 0.1, { autoAlpha: 1 })
    .to(svgAll[5], 0.1, { autoAlpha: 0 })
    .to(svgAll[4], 0.1, { autoAlpha: 1 })
    .to(svgAll[4], 0.1, { autoAlpha: 0 })
    .to(svgAll[7], 0.1, { autoAlpha: 1 })
    .to(svgAll[7], 0.1, { autoAlpha: 0 })
    .to(svgAll[0], 0.1, { autoAlpha: 1 })
    .to(svgAll[0], 0.1, { autoAlpha: 0 })
    .to(svgAll[3], 0.1, { autoAlpha: 1 })
    .to(svgAll[3], 0.1, { autoAlpha: 0 });

  if (firstVisit == null) {
    document.querySelector(".initial-loading-text").style.display = "block";
    document.querySelector(".initial-loading-text").style.opacity = 1;

    let typeSplit = new SplitType('[animate]', {
      types: 'lines, words, chars',
      tagName: 'span'
    });

    tlPreloader
      .to("body", { overflow: "hidden" })
      .from('[animate] .word', {
        y: '100%',
        opacity: 0,  
        duration: 1,
        ease: 'sine.out',
        stagger: 0.3,
        color: '#ffffff',
      })
      .to(".initial-loading-text", { opacity: 0, duration: 1, ease: "Power3.easeOut" })
      .to(".scribbles_lines svg", { opacity: 0, duration: 1, ease: "Power3.easeOut" }, "<")
      .to(".preloader", { duration: 1, height: "0vh", ease: "Power3.easeOut" }, "-=0.5")
      .set(".initial-loading-text", { display: 'none' })
      .set(".scribbles_lines svg", { display: 'none' })
      .to(".preloader", { display: "none" })
      .to("body", { overflow: "auto", onComplete: loadPageAnimations });

    localStorage.setItem('visited', 1);

  } else {
    document.querySelector('.loading-percentage-container').style.display = 'flex';
    gsap.to('.loading-number', {
      textContent: 100,
      autoAlpha: 1,
      opacity: 1,
      duration: 3,
      ease: "power1.in",
      snap: { textContent: 1 },
      stagger: { each: 1.0 },
      onComplete: () => {
        gsap.to('.loading-number, .loading-percentage', { opacity: 0, duration: 0.1 });
        seoTween.pause();
        var elementToRemove = document.querySelector('.loader_scribble__container');
        if (elementToRemove) {
          elementToRemove.style.display = 'none';
          elementToRemove.parentNode.removeChild(elementToRemove);
        }
      }
    });

    tlPreloader
      .to("body", { overflow: "hidden" })
      .set(".initial-loading-text", { display: 'none', opacity: 0 })
      .to(".preloader .text-container", { duration: 0, opacity: 1, ease: "Power3.easeOut" })
      .from(".preloader .text-container h1", { duration: 1.5, delay: 0.2, y: 200, skewY: 10, stagger: 0.4, ease: "Power3.easeOut" })
      .to(".preloader .text-container h1", { duration: 1.6, y: 200, skewY: -20, stagger: 0.2, ease: "Power3.easeOut" })
      .to(".preloader", { duration: 1, height: "0vh", ease: "Power3.easeOut" })
      .to(".scribbles_lines svg", { display: 'none', opacity: 0 })
      .to(".preloader", { display: "none" })
      .to("body", { overflow: "auto", onComplete: loadPageAnimations });
  }


  // --------Preloader Animation ENDS Here

    function loadPageAnimations() {

    //	-----LENIS start
const lenis = new Lenis({
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })
    lenis.on('scroll', (e) => {
    })
    function raf(time) {
        lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf);

    // 	--------LENIS end



 // ======GSAP started from here ====== //
    gsap.registerPlugin(SplitText, ScrollTrigger);
    let mm = gsap.matchMedia();
    mm.add(
    {
        isDesktop: '(min-width: 1024px)',
    isMobile: '(max-width: 767px)',
    reduceMotion: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        let {isDesktop, isMobile, reduceMotion} = context.conditions;





//--- Hero Heading Text Fade in & Split

const childSplitHero = new SplitText(".hero-heading", {
    type: "lines",
    linesClass: "split-child-hero-heading"
    });
    const parentSplitHero = new SplitText(".hero-heading", {
      linesClass: "split-parent-hero-heading"
    });

    gsap.to(".hero-heading", {
    opacity: 1,
    autoAlpha: 1,
    })
  
    gsap.to(childSplitHero.lines, {
    duration: 1.5,
    yPercent: 100,
    autoAlpha:1,
    ease: "power4",
    stagger: 1,
    scrollTrigger: {
    trigger: ".hero-heading",
    //   start: isDesktop ? 'top top' : 'top 50%',
    //   end: isDesktop ? '+=10px' : '+=200',
    //   scrub: true,
    markers: false
    },
    onComplete: () => {
        gsap.fromTo("#campsuleImage",
            {
                width: 0
            },
            {
                width: isDesktop ? 130 : 100,
            }
        );
    }
    });


     // -----Hero Sub-heading animation
     const heroSubHeading = new SplitType('.reveal-sub-heading-text', {types: 'lines' });
     gsap.to('.reveal-sub-heading-text', {
     delay: 1.5,
     duration: 1.5,
     autoAlpha: 1,
     opacity: 1,
     stagger: {
         amount: 0.3
       }
     });
     gsap.from(heroSubHeading.lines, {
     delay: 0.8,
     duration: 1.8,
     autoAlpha: 0,
     y: -30,
     opacity: 0,
     ease: "power4.out",
     stagger: {
         amount: 0.3
           }
         });






//-- SPLIT TEXT FUNCTION
    function createTextSplitAnimation(targetSelector, linesClass, parentClass, triggerSelector, startTrigger, endTrigger) {
    const childSplit = new SplitText(targetSelector, {
    type: "lines",
    linesClass: linesClass
    });

    const parentSplit = new SplitText(targetSelector, {
    linesClass: parentClass
    });

    const textSplitTimeline = gsap.timeline()

    textSplitTimeline.to(targetSelector, {
    opacity: 1,
    autoAlpha: 1,
    })

    .to(childSplit.lines, {
    duration: 2,
    yPercent: 100,
    autoAlpha: 1,
    ease: "power4",
    stagger: 1,
    scrollTrigger: {
    trigger: triggerSelector,
    start: startTrigger,
    end: endTrigger,
    scrub: true,
    markers: false
              }
            });

    return textSplitTimeline;
          }

    

    

    // Large image/video reveal after initial loading
    gsap.to("#project-image_container", {
    delay: 2,
    duration: 2,
    opacity: 1,
    autoAlpha: 1,
    ease: 'power4.out',
    scrollTrigger: {
        trigger: "#project-image_container",
    // start: 'top 50%',
    // end: '+=200',
    markers: false,
    toggleActions: 'play play none none'
      }
    });



 // -----Large image/video reveal with scroll
      
   const setVwVh = () => {
        let vw = document.documentElement.clientWidth / 100;
    let vh = document.documentElement.clientHeight / 100;
    document.documentElement.style.setProperty('--vw', `${vw}px`);
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
    setVwVh();

    const container = document.querySelector("#project__parallax");
    const figure = document.querySelector("#project_figure");

    let tlProjectImage = gsap.timeline({
        duration: 1.5,
    autoAlpha: 1,
    scrollTrigger: {
        trigger: isDesktop ? container : '#project-image_container',
    start: isDesktop ? "top top" : "top 45%",
    // end: () => window.innerHeight * 4,
    end: isDesktop ? "+=200%" : "+=150",
    scrub: 1,
    markers: false,
    // pin: "#project-image_container",
    pin: isDesktop ? "#project-image_container" : false,
      }
    })

    tlProjectImage.fromTo(figure,
    {
        clipPath: isDesktop ? `inset(5vh 14vw)` : `inset(1vh 2vw)`,
      },
    {
        clipPath: `inset(0px 0px)`,
    duration: 1.5,
      }
    )

    addEventListener('DOMContentLoaded', setVwVh);
    addEventListener("resize", setVwVh);
    //ending



    //-- accordion heading split
    const accordionHeading = createTextSplitAnimation(
        ".accordion-heading", //targetSelector
        "split-child-accordion-heading", //linesClass 
        "split-parent-accordion-heading", // parentClass
        ".accordion-heading", //trigger element
        isDesktop ? 'top 50%' : 'top 50%', //start trigger
        isDesktop ? '+=300px' : '+=300px', //end trigger
        );




    // --- Opacity Basic Animations
        const fadeinAnims = gsap.utils.toArray(".fadein-basic");
        fadeinAnims.forEach((fadeinAnim) => {
              gsap.to(fadeinAnim, 3.5, {
                  opacity: 1,
                  autoAlpha: 1,
                  ease: 'power4.out',
                  scrollTrigger: {
                      trigger: fadeinAnim,
                      start: isDesktop ? 'top 65%' : 'top 50%',
                      end: isDesktop ? '+=300' : '+=200',
                      scrub: 1,
                      stagger: 0.4,
                      markers: false,
                      toggleActions: 'play play none none'
                  }
              });
              });





    //===== Opacity/ Fade in FUNCTION
    function createOpacityAnimation(elementSelector, dealyInput, startTrigger, endTrigger) {
        gsap.to(elementSelector, {
          delay: dealyInput,
          opacity: 1,
          autoAlpha: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: elementSelector,
            start: startTrigger,
            end: endTrigger,
            scrub: 1,
            stagger: 0.4,
            markers: false,
            toggleActions: 'play play none none'
          }
        });
      }
      
      // accordion Fade
      const imageFadeInHero = createOpacityAnimation(
            ".accordion-basic", //elementSelector
            1, //delay
            isDesktop ? 'top 50%' : 'top 50%', //startTrigger
            isDesktop ? '+=300' : '+=200', //endTrigger
            );

      // Button basic fade in
      const buttonBasic = createOpacityAnimation(
            ".button-basic", //elementSelector
            0.2, //delay
            isDesktop ? 'top 50%' : 'top 50%', //startTrigger
            isDesktop ? '+=300' : '+=200', //endTrigger
            );

      // CTA Button fade in
      const buttonCta = createOpacityAnimation(
            ".buttonAnimate", //elementSelector
            0.2, //delay
            isDesktop ? 'top 50%' : 'top 50%', //startTrigger
            isDesktop ? '+=300' : '+=200', //endTrigger
            );




    //--- 	Text color fill
    // const previousHeight = 	document.querySelectorAll('.what-we-do-container')[0].offsetHeight;
    const revealTypes2 = gsap.utils.toArray('.reveal-type2');
      
    const split = new SplitText(".reveal-type2", {
            type: "words",
    });
    const tlRevealType = gsap.timeline({
        scrollTrigger: {
        trigger: '.fill-main-container',
        start: 'top top',
        end: '+=1000',
        pin: '.fill-main-container',
        anticipatePin: 1,
        scrub: 0.5
        }
      })
        .set(split.words, {
        color: 'white',
        stagger: 0.5,
      }, 0.1);






            
    // --------Testimonial reveal
    gsap.to('.testimonial__slider2', {
        autoAlpha: 1,
    opacity: 1,
    duration: 1.5,
    ease: 'power4.out',
    scrollTrigger: {
        trigger: '.testimonial__slider2',
    start: isDesktop ? 'top 60%' : 'top 50%',
    end: isDesktop ? '+=300px' : '+=200',
    scrub: 1,
    markers: false,
    toggleActions: 'play play none none'
}
});


    // CTA reveal
    gsap.to('.cta-container', {
        autoAlpha: 1,
    opacity: 1,
    duration: 1.5,
    ease: 'power4.out',
    scrollTrigger: {
        trigger: '.cta-container',
    start: isDesktop ? 'top 60%' : 'top 50%',
    end: isDesktop ? '+=300px' : '+=200',
    scrub: 1,
    markers: false,
    toggleActions: 'play play none none'
}
});






// --- Gsap Responsiveness ends here--//
});

// ====swiper for logo grid in mobile view
  const swiperLogoGrid = new Swiper('.logo-grid-sm .swiper', {
    direction: 'horizontal',
  loop: false,
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable:'true'
  }
});
// swiper ends


//======== Testimonial Section ======== //
const testiSlider = new Swiper('.testimonial__slider2 .swiper', {
    observer: true,
observeParents: true,
loop: false,
pagination: false,
navigation: {
    nextEl: '.swiper-button-next',
prevEl: '.swiper-button-prev',
  },
slidesPerView: 1,
spaceBetween: 10,
grabCursor: false,
noSwiping: false,
noSwipingClass: '.testimonial2',
allowTouchMove: false,
effect: 'fade',
fadeEffect: {
    crossFade: true
  }
});




//======== Form Section ======== //
const formButton = document.getElementsByClassName('form-button')[0];
formButton.addEventListener("click", openForm);
const formContainer = document.getElementsByClassName("form-container")[0];

function openForm() {
    formContainer.style.display = 'block'
}





// loadPageAnimations END
  }
  }


