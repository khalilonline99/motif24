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



    //--------Preloader Animation 1 END

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
                isTablet: '(min-width: 768px) and (max-width: 1023px)',
                reduceMotion: "(prefers-reduced-motion: reduce)",
            },
            (context) => {
                let { isDesktop, isMobile, reduceMotion } = context.conditions;
				
				
				
				// Main Heading Animation
				const heroHeadingSplit = new SplitType('.elementor-heading-title', { types: 'lines' }); 
				const heroHeadingLines = document.querySelectorAll('.elementor-heading-title .line');

				// Wrap each line in a div for better control with GSAP
				heroHeadingLines.forEach(function(line) {
					const wrapper = document.createElement("div");
					wrapper.classList.add("hero-line-wrapper");
					line.parentNode.insertBefore(wrapper, line);
					wrapper.appendChild(line);
				});

				// Animate the main heading's container to become visible
				gsap.to('.elementor-heading-title', {
					opacity: 1,
					duration: 1.2,
					stagger: 0.1,
					ease: 'power1.inOut'
				});

				// Animate each line of the main heading
				gsap.from(heroHeadingSplit.lines, {
					opacity: 0, 
					yPercent: -200,  
					duration: 1.4,
					stagger: 0.1, 
					ease: 'power1.inOut',
				});

				gsap.fromTo(".borderee img", 
					{ 
						width: 0, 
					}, 
					{
						visibility: 'visible', 
						width: isDesktop ? '7vw' : (isTablet ? '5vw' : '20vw'),
					},
					"-=0.2" 
				);

				// Hero Sub-heading animation
				const heroSubHeadingSplit = new SplitType('.reveal-sub-heading-text', { types: 'lines' });
				gsap.to('.reveal-sub-heading-text', {
					opacity: 1,
					delay: 1.2, 
					duration: 2.0,
					ease: 'power1.inOut'
				});

				// Animate each line of the subheading
				gsap.from(heroSubHeadingSplit.lines, {
					opacity: 0,
					y: -30,
					delay: 1.2,  
					duration: 1.8,
					stagger: 0.3,  
					ease: "power4.out"
				});
				

                //  Opacity Animations
                const fadeinAnims = gsap.utils.toArray(".fadein-basic");
                fadeinAnims.forEach((fadeinAnim) => {
                    gsap.to(fadeinAnim, 3.5, {
                        opacity: 1,
                        autoAlpha: 1,
                        ease: 'power4.out',
                        scrollTrigger: {
                            trigger: fadeinAnim,
                            start: isDesktop ? 'top 80%' : 'top 50%',
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


                // Showreel Image animation
                gsap.to('.showreel-image', {
                    opacity: 1,
                    autoAlpha: 1,
                    delay: 2,
                    duration: 3,
                    ease: 'power4.out',
                    scrollTrigger: {
                        trigger: '.showreel-image',
                        // start: isDesktop ? 'top top' : 'top top',
                        // end: isDesktop ? '+=300px' : '+=200',
                        markers: false,
                        toggleActions: 'play play none none'
                    }
                });


                // Image why us animations
                const sections = gsap.utils.toArray(".img-why-us");
                sections.forEach((section) => {
                    gsap.to(section, 2.8, {
                        opacity: 1,
                        ease: 'power4.out',
                        scrollTrigger: {
                            trigger: section,
                            start: isDesktop ? 'top 40%' : 'top 50%',
                            end: isDesktop ? '+=300px' : '+=200',
                            scrub: true,
                            markers: false,
                            toggleActions: 'play play none none'
                        }
                    });
                });

                // Why Choose Us Heading Split text
//                 const childSplit = new SplitText(".text-split-1", {
//                     type: "lines",
//                     linesClass: "split-child"
//                 });
//                 const parentSplit = new SplitText(".text-split-1", {
//                     type: "lines",
//                     linesClass: "split-parent"
//                 });

//                 gsap.from(childSplit.lines, {
//                     duration: 2,
//                     yPercent: -100,
//                     ease: "power4",
//                     stagger: 1,
//                     scrollTrigger: {
//                         trigger: ".text-split-1",
//                         start: isDesktop ? 'top 50%' : 'top 50%',
//                         end: isDesktop ? '+=300px' : '+=200',
//                         scrub: true,
//                     }
//                 });

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
        // type: "lines",
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



                //------ Why Choose us cards -- Swiper Library
                const swiperChooseUs = new Swiper('.choose-us__slider .swiper', {
                    effect: "coverflow",
                    centeredSlides: false,
                    coverflowEffect: {
                        rotate: 0,
                        stretch: 0,
                        depth: 0,
                        modifier: 1,
                        slideShadows: false
                    },
                    loop: false,
                    pagination: true,
                    navigation: false,
                    spaceBetween: 10,
                    slidesPerView: 3.5,
                    // loopedSlides: 3,
                    autoplay: false,
                    speed: 3000,
                    breakpoints: {
                        // when window width is >= 320px
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 16,
                            allowTouchMove: false
                        },
                        // when window width is >= 768px
                        768: {
                            slidesPerView: 2.5,
                            spaceBetween: 10
                        },
                        1024: {
                            slidesPerView: 2.5,
                            spaceBetween: 10
                        },
                        1536: {
                            slidesPerView: 4,
                            spaceBetween: 8
                        }
                    }
                });



                // ===Why choose us cards reveal animation= //
                let revealWhyChooseUsCards = document.querySelectorAll(".slide-why_choose_us");
                revealWhyChooseUsCards.forEach((revealWhyChooseUsCard) => {
                    gsap.from(revealWhyChooseUsCard, {
                        duration: 3.0,
                        x: isDesktop ? 400 : 0,
                        ease: "elastic.out(1,1)",
                        scrollTrigger: {
                            trigger: revealWhyChooseUsCard,
                            start: "top 60%",
                            end: "+=300",
                            scrub: 1,
                            markers: true,
                            toggleActions: "play none none none"
                        }
                    })
                })



                // why choose us left side padding on resize
                // setTimeout(() => {
                addPaddingLeft();
                // }, 5000);

                function addPaddingLeft() {
                    const itemToGetMargin = document.querySelectorAll('.e-con-inner');
                    const portfolioSlider = document.querySelector(".choose-us__slider .swiper");
                    const StyleToGetMarginValue = getComputedStyle(itemToGetMargin[6]);
                    const itemLeftMargin = StyleToGetMarginValue.marginLeft;
                    portfolioSlider.style.paddingLeft = itemLeftMargin;
                }
                window.addEventListener('resize', function (event) {
                    addPaddingLeft()
                }, true);





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



                // ScrollTrigger

                gsap.to(".choose-us__card", {
                    scrollTrigger: ".choose-us__card",
                    toggleClass: "active"
                });

                const cards = gsap.utils.toArray('.choose-us__card');
                cards.forEach((card) => {
                    gsap.to(card, {
                        scrollTrigger: {
                            trigger: card,
                            toggleClass: 'active',
                        },
                    });
                });

                document.addEventListener('scroll', function () {
                    cards.forEach(card => {
                        if (card.classList.contains('active')) {
                            setTimeout(() => {
                                card.classList.remove('active')
                            }, 1000)
                        }
                    })
                })


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



                // --- Gsap Responsiveness ends here--//
            });


        //======== Form Section ======== //
        const formButton = document.getElementsByClassName('form-button')[0];
        formButton.addEventListener("click", openForm);
        const formContainer = document.getElementsByClassName("form-container")[0];

        function openForm() {
            formContainer.style.display = 'block'
        }
        //   function closeForm() {
        //     formContainer.style.display = 'none'
        //   }
    }


    // loadPageAnimations END
}



new hoverEffect({
    parent: document.querySelector('.distortion-office-image-why_us'),
    intensity: 0.3,
    imagesRatio: 0.66,
    easing: Expo.easeOut,
    image1: 'https://wemotif.com/wp-content/uploads/2023/07/About-us-Motif-1024x683.jpeg',
    image2: 'https://wemotif.com/wp-content/uploads/2023/07/About-us-Motif-1024x683.jpeg',
    displacementImage: 'https://wemotif.com/wp-content/uploads/2023/09/distortionImage.png',
});

//--- image 2
new hoverEffect({
    parent: document.querySelector('.distortion-image2-why_us'),
    intensity: 0.3,
    imagesRatio: 1.30,
    easing: Expo.easeOut,
    image1: 'https://wemotif.com/wp-content/uploads/2023/07/6130aa3116b32af42eedffab_SCREENSITE4-2-e1690658770955.jpg',
    image2: 'https://wemotif.com/wp-content/uploads/2023/07/6130aa3116b32af42eedffab_SCREENSITE4-2-e1690658770955.jpg',
    displacementImage: 'https://wemotif.com/wp-content/uploads/2023/09/distortionImage.png',
});

//--- image 2
new hoverEffect({
    parent: document.querySelector('.distortion-image3-why_us'),
    intensity: 0.3,
    imagesRatio: 1.32,
    easing: Expo.easeOut,
    image1: 'https://wemotif.com/wp-content/uploads/2023/07/MOTIF-Lifestyle-Brand-WORK-.png',
    image2: 'https://wemotif.com/wp-content/uploads/2023/07/MOTIF-Lifestyle-Brand-WORK-.png',
    displacementImage: 'https://wemotif.com/wp-content/uploads/2023/09/distortionImage.png',
});