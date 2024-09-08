  window.onload = function () {

// -------------Preloader Animation 1 start

// scribble line START
// const svgAll = document.querySelectorAll(".scribbles_lines svg");
  const svgPaths = document.querySelectorAll(".scribbles_lines svg path");
  var seoTween = new TimelineMax({ repeat: -1 });
  const firstVisit = localStorage.getItem('visited');
  const tlPreloader = gsap.timeline();
  const svgAll = document.querySelectorAll(".scribbles_lines svg");
	  
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
  .to(svgAll[0], 0.1, {
    autoAlpha: 1
        })
  .to(svgAll[0], 0.1, {
    autoAlpha: 0
        });
  seoTween
  .to(svgAll[3], 0.1, {
    autoAlpha: 1
        })
  .to(svgAll[3], 0.1, {
    autoAlpha: 0
        })
  .to(svgAll[2], 0.1, {
    autoAlpha: 1
        })
  .to(svgAll[2], 0.1, {
    autoAlpha: 0
        })
  .to(svgAll[1], 0.1, {
    autoAlpha: 1
        })
  .to(svgAll[1], 0.1, {
    autoAlpha: 0
        })
  .to(svgAll[6], 0.1, {
    autoAlpha: 1
        })
  .to(svgAll[6], 0.1, {
    autoAlpha: 0
        })
  .to(svgAll[5], 0.1, {
    autoAlpha: 1
        })
  .to(svgAll[5], 0.1, {
    autoAlpha: 0
        })
  .to(svgAll[4], 0.1, {
    autoAlpha: 1
        })
  .to(svgAll[4], 0.1, {
    autoAlpha: 0
        })
  .to(svgAll[7], 0.1, {
    autoAlpha: 1
        })
  .to(svgAll[7], 0.1, {
    autoAlpha: 0
        })
  .to(svgAll[0], 0.1, {
    autoAlpha: 1
        })
  .to(svgAll[0], 0.1, {
    autoAlpha: 0
        })
  .to(svgAll[3], 0.1, {
    autoAlpha: 1
        })
  .to(svgAll[3], 0.1, {
    autoAlpha: 0,
        });
  // ------scribble line END

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
      .to("body", { overflow: "auto", onComplete: loadHomepageAnimations });

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
		isTablet: '(min-width: 768px) and (max-width: 1024px)',
  isMobile: '(max-width: 767px)',
  reduceMotion: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
    let {isDesktop, isTablet, isMobile, reduceMotion} = context.conditions;


  // 	 Hero Animation for Desktop/ large view
  const heroHeadingWhyUs = gsap.timeline();
//   heroHeadingWhyUs.from(".our-process-headings .our-process-heading", 2.0, {
//     autoAlpha: 0,
//   y: -100,
//   ease: "power4.out",
//   stagger: {
//     amount: 0.1
//       }
//     });
  //-------Main Hero Animation
		  const heroSplitLines = new SplitType('.large-text-split-1', { types: 'lines' });
		  const heroHeadingLines = document.querySelectorAll(".large-text-split-1 .line");
		  heroHeadingLines.forEach(function (line) {
			  const wrapper = document.createElement("div");
			  wrapper.classList.add("hero-line-wrapper");
			  line.parentNode.insertBefore(wrapper, line);
			  wrapper.appendChild(line);
		  });
		  heroHeadingWhyUs.to(".large-text-split-1", {
			  opacity: 1,
			  autoAlpha: 1,
			  duration: 0.8,
			  stagger: 0.1,
			  ease: 'power1.out',
		  });
		  heroHeadingWhyUs.from(heroSplitLines.lines, {
			  opacity: 0,
			  yPercent: -200,
			  duration: 1.1,
			  stagger: 0.1,
			  ease: 'power1.out',
		  });
		   heroHeadingWhyUs.from(".borderee img", 1.0, {
			  width: 0,
			  autoAlpha: 1,
			  ease: "power4.out",
			});


		  const subHeroSplitLines = new SplitType('.large-text-split-sub-heading', { types: 'lines' });
		  const subHeroHeadingLines = document.querySelectorAll(".large-text-split-sub-heading .line");
		  subHeroHeadingLines.forEach(function (line) {
			  const wrapper = document.createElement("div");
			  wrapper.classList.add("hero-line-wrapper");
			  line.parentNode.insertBefore(wrapper, line);
			  wrapper.appendChild(line);
		  });
		  gsap.to(".large-text-split-sub-heading", {
			  opacity: 1,
			  autoAlpha: 1,
			  duration: 0.8,
			  stagger: 0.1,
			  ease: 'power1.out',
		  });
		  gsap.from(subHeroSplitLines.lines, {
			  delay: 0.4,
			  opacity: 0,
			  yPercent: -200,
			  duration: 1.1,
			  stagger: 0.1,
			  ease: 'power1.out'
		  });
 



  // Hero Animation for Mobile device
  gsap.to(".hero-mobile", {
    delay: 0.8,
  duration: 2,
  opacity: 1,
  autoAlpha: 1,
  ease: 'power4.out',
  scrollTrigger: {
    trigger: ".hero-mobile",
  // start: 'top 50%',
  // end: '+=200',
  markers: false,
  toggleActions: 'play play none none'
    }
  });
		  
		  


  // Hero Sub-heading animation
  const heroSubHeading = new SplitType('.reveal-sub-heading-text', {types: 'lines' });
  gsap.set('.reveal-sub-heading-text', { opacity: 1 });
  gsap.from('.reveal-sub-heading-text', {
  delay: 1.5,
  duration: 1.5,
  autoAlpha: 0,
  opacity: 0,
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
		  
		  
	// nyNaim
	const splitHeadingOne = (className, durationVal, staggerVal, easeVal, startVal, endVal, yPercentageVal) => {
		const heroSplitLines = new SplitType(className, { types: 'lines' });
		const heroHeadingLines = document.querySelectorAll(`${className} .line`);
		heroHeadingLines.forEach(function (line) {
			const wrapper = document.createElement("div");
			wrapper.classList.add("hero-line-wrapper");
			line.parentNode.insertBefore(wrapper, line);
			wrapper.appendChild(line);
		});
		gsap.to(className, {
			opacity: 1,
			autoAlpha: 1,
			duration: durationVal,
			stagger: staggerVal,
			ease: easeVal,
			scrollTrigger: {
				trigger: className,
				start: startVal,
				end: endVal,
				scrub: false
			}
		});
		gsap.from(heroSplitLines.lines, {
			opacity: 0,
			yPercent: yPercentageVal,
			duration: durationVal,
			stagger: staggerVal,
			ease: easeVal,
			scrollTrigger: {
				trigger: className,
				start: startVal,
				end: endVal,
				scrub: true
			}
		});
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


   // Large image/video reveal with scroll
      
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
        pin: isDesktop ? (isTablet ? false : container) : false,
      }
    })  
    
    tlProjectImage.fromTo(figure, 
      {
        clipPath: isDesktop ? `inset(5vh 14vw)` : (isTablet ? `inset(1vh 2vw)` : `inset(1vh 2vw)`),
      },
      {
        clipPath: `inset(0px 0px)`,
        duration: 1.5,
      }
    )
  
  addEventListener('DOMContentLoaded', setVwVh);
  addEventListener("resize", setVwVh);
  //ending

// -----Our process full width SLIDER
let processSlider = gsap.utils.toArray(".process-single");
  gsap.to(processSlider, {
    delay: 2,
    xPercent: isDesktop ? -100 * (processSlider.length - 1) : -115 * (processSlider.length - 1),
    ease: "none",
    scrollTrigger: {
      trigger: ".process-container",
      pin: true,
      scrub: 0.5,
      start: isDesktop ? '15% 15%' : '30% 27%',
      end: () => "+=" + document.querySelector(".process-container").offsetWidth,
//      snap: {
//         snapTo: 1 / (processSlider.length - 1),
//        inertia: false,
//        duration: {min: 0.2, max: 0.4}
//       },
      markers: true
    }
  });
		  
	// For Creating floating effect for the process images
	processSlider.forEach((slide, index) => {
	  const image = slide.querySelector('.process-image');
	  gsap.timeline({
		scrollTrigger: {
		  trigger: slide,
		  start: "top center",
		  end: "bottom center",
		  scrub: 0.5
		}
	  })
	  .fromTo(image, { y: 50, opacity: 0 }, { y: -50, opacity: 1, duration: 1, delay: 0.5 });
	});
		  
	processSlider.forEach((slide) => {
	  const image = slide.querySelector('.process-image');
	  gsap.to(image, {
		y: '+=5', 
		repeat: -1, 
		yoyo: true, 
		ease: 'power1.inOut', 
		duration: 2
	  });
	});


// -----Our process full width SLIDER's Image
// let processSliderImages = gsap.utils.toArray(".process-image");
// let processSliderImages = document.querySelectorAll(".process-image");

  // gsap.to(processSliderImages, {
  //   xPercent: -10 * (processSliderImages.length - 1),
  //   ease: "power3.inOut",
  //   scrollTrigger: {
  //     trigger: ".process-image",
  //     scrub: 1,
  //     start: processSliderImages,
  //     end: () => "+=" + document.querySelector(".process-image").offsetWidth,
  //     markers: false
  //   }
  // });

		  
  // ---- Opacity/ FadeIn  Animations
  const fadeinAnims = gsap.utils.toArray(".fadein-basic");
  fadeinAnims.forEach((fadeinAnim) => {
    gsap.to(fadeinAnim, 3.5, {
      opacity: 1,
      autoAlpha: 1,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: fadeinAnim,
        start: isDesktop ? 'top 75%' : 'top 50%',
        end: isDesktop ? '+=300' : '+=200',
        scrub: 1,
        markers: false,
        toggleActions: 'play play none none'
      }
    });
        });


  //  Opacity Animations -2 
  const fadeinAnims2 = gsap.utils.toArray(".fadein-basic-2");
  fadeinAnims2.forEach((fadeinAnim2) => {
    gsap.to(fadeinAnim2, 3.5, {
      opacity: 1,
      autoAlpha: 1,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: fadeinAnim2,
        start: isDesktop ? 'top 65%' : 'top 50%',
        end: isDesktop ? '+=300' : '+=200',
        scrub: 1,
        stagger: 0.4,
        markers: false,
        toggleActions: 'play play none none'
      }
    });
        });
		  
	splitHeadingOne(
		".large-heading-2",
		0.8,
		0.2,
		'power1.out',
		"top center",
		"+=200",
		-200
	);


  // 	Type 2 Hero Animation 1
  const typeTwoHeroAnims = gsap.utils.toArray('.sub_hero_headings .sub_hero_heading');
  typeTwoHeroAnims.forEach(typeTwoHeroAnim => {
    gsap.from(typeTwoHeroAnim, {
      duration: 3.5,
      autoAlpha: 0,
      y: -100,
      ease: "power4.out",
      duration: 4.5,
      scrollTrigger: {
        trigger: typeTwoHeroAnim,
        start: isDesktop ? "top 45%" : "top 50%",
        end: isDesktop ? "+=300px" : "+=200px",
        markers: false,
        scrub: 1,
        toggleActions: "play play reverse reverse",
      }
    });
  });




  // 	buttons animations
  const buttonsAll = gsap.utils.toArray(".buttonAnimate");
        buttonsAll.forEach((buttonSingle) => {
    gsap.from(buttonSingle, {
      autoAlpha: 0,
      opacity: 1,
      scrollTrigger: {
        trigger: buttonSingle,
        start: "top 90%",
        end: "+=100",
        scrub: true,
        markers: false,
      }
    })
  });



  // Large Sub Heading White Split text-1
//   const childSplit = new SplitText(".text-split-1", {
//   type: "lines",
//   linesClass: "split-child"
//   });
//   const parentSplit = new SplitText(".text-split-1", {
//     type: "lines",
//     linesClass: "split-parent"
//   });

//   gsap.from(childSplit.lines, {
//   duration: 2,
//   yPercent: -100,
//   ease: "power4",
//   stagger: 1,
//   scrollTrigger: {
//     trigger: ".text-split-1",
//     start: isDesktop ? 'top 50%' : 'top 50%',
//     end: isDesktop ? '+=300px' : '+=200',
//     scrub: true,
//   }
//   });
	
		  // Select all elements with the class '.text-split-1'
const textSplitElements = gsap.utils.toArray(".text-split-1");

// Loop through each element and apply the SplitText and GSAP animation
textSplitElements.forEach((textSplitElement) => {
  // Create child and parent split texts for each element
  const childSplit = new SplitText(textSplitElement, {
    type: "lines",
    linesClass: "split-child"
  });
  const parentSplit = new SplitText(textSplitElement, {
//     type: "lines",
    linesClass: "split-parent"
  });

  // GSAP animation for each split text
  gsap.from(childSplit.lines, {
    duration: 2,
    yPercent: -100,
    ease: "power4",
    stagger: 1,
    scrollTrigger: {
      trigger: textSplitElement,
      start: isDesktop ? 'top 50%' : 'top 50%',
      end: isDesktop ? '+=300px' : '+=200',
      scrub: true,
    }
  });
});


  // Large Sub Heading White Split text-1
  const childSplit2 = new SplitText(".text-split-2", {
  type: "lines",
  linesClass: "split-child-2"
  });
  const parentSplit2 = new SplitText(".text-split-2", {
    linesClass: "split-parent-2"
  });

  gsap.from(childSplit.lines, {
  duration: 2,
  yPercent: -100,
  ease: "power4",
  stagger: 1,
  scrollTrigger: {
    trigger: ".text-split-2",
    start: isDesktop ? 'top 50%' : 'top 50%',
    end: isDesktop ? '+=300px' : '+=200',
    scrub: true,
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

// swiper for logo grid in mobile view
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

  }
	  
// loadPageAnimations END
}
