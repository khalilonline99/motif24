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
    // loadPageAnimations();

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
                let { isDesktop, isTablet, isMobile, reduceMotion } = context.conditions;

                // Badge animation on scroll
                const badgeAnimation = gsap.timeline();

                badgeAnimation.fromTo(".motif-badge-fixed-position",
                    {
                        right: isDesktop ? '-9vw' : (isTablet ? '9vw' : '-32vw'),
                    },
                    {
                        right: isDesktop ? '2vw' : (isTablet ? '2vw' : '1vw'),
                        scrollTrigger: {
                            trigger: ".small-heading",
                            start: isDesktop ? "top bottom" : "top 50%",
                            end: "+=400",
                            scrub: 0.8,
                        }
                    }
                );



                //-------Main Hero Animation
                const heroSplitLines = new SplitType('.hero-heading', { types: 'lines' });
                const heroHeadingLines = document.querySelectorAll(".hero-heading .line");
                heroHeadingLines.forEach(function (line) {
                    const wrapper = document.createElement("div");
                    wrapper.classList.add("hero-line-wrapper");
                    line.parentNode.insertBefore(wrapper, line);
                    wrapper.appendChild(line);
                });
                gsap.to(".hero-heading", {
                    opacity: 1,
                    // autoAlpha: 1,
                    duration: 1.2,
                    stagger: 0.1,
                    ease: 'power1.inOut',
                });
                gsap.from(heroSplitLines.lines, {
                    opacity: 0,
                    yPercent: -200,
                    duration: 1.4,
                    stagger: 0.1,
                    ease: 'power1.inOut',
                });

                gsap.fromTo("#campsuleImage",
                    {
                        width: 0,
                    },
                    {
                        visibility: 'visible',
                        width: isDesktop ? '7vw' : (isTablet ? '5vw' : '20vw'),
                    }, "-=0.2"
                );

				// Hero Sub-heading animation
				const heroSubHeadingSplit = new SplitType('.reveal-sub-heading-text', { types: 'lines' });

				// Animate the subheading text container to become visible
				gsap.to('.reveal-sub-heading-text', {
					opacity: 1,
					delay: 1.2, // Start after the main heading animation
					duration: 2.0,
					ease: 'power1.inOut'
				});

				// Animate each line of the subheading
				gsap.from(heroSubHeadingSplit.lines, {
					opacity: 0,
					y: -30,
					delay: 1.2,  // Start after the main heading animation
					duration: 1.8,
					stagger: 0.3,  // Stagger animations for each line
					ease: "power4.out"
				});

				
				

                const fadeInClassMultiple = (className, delayValue, animationDuration) => {
                    const revealTwoAnims = gsap.utils.toArray(className);
                    revealTwoAnims.forEach((revealTwoAnim) => {
                        gsap.to(revealTwoAnim, {
                            delay: delayValue,
                            duration: animationDuration,
                            autoAlpha: 1,
                            opacity: 1,
                            ease: "power4.out",
                            stagger: {
                                amount: 0.4
                            },
                            scrollTrigger: {
                                trigger: revealTwoAnim,
                                scrub: false,
                            },
                        }, "+=2");
                    })
                }
                fadeInClassMultiple(".motif-badge-container", 0.1, 1.8);


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

                splitHeadingOne(
                    ".small-heading",
                    0.8,
                    0.1,
                    'power1.out',
                    "top center",
                    "+=150",
                    -200
                );

                splitHeadingOne(
                    ".large-heading-1",
                    0.8,
                    0.2,
                    'power1.out',
                    "top center",
                    "+=200",
                    -200
                );

                gsap.fromTo(".campsuleImageDiff",
                    {
                        width: 0,
                    },
                    {
                        delay: 0.5,
                        visibility: 'visible',
                        width: '12vw',
                        scrollTrigger: {
                            trigger: ".campsuleImageDiff",
                            start: "center center",
                            end: '+=200',
                        }
                    }, "-=0.2"
                );



                //  Heading Fade in  Animations
                const headingFadeinAnims = gsap.utils.toArray(".fadein-heading");
                headingFadeinAnims.forEach((headingFadeinAnim) => {
                    gsap.to(headingFadeinAnim, 3.5, {
                        opacity: 1,
                        delay: 2,
                        autoAlpha: 1,
                        ease: 'power4.out',
                        scrollTrigger: {
                            trigger: headingFadeinAnim,
                            start: isDesktop ? 'top 50%' : 'top 50%',
                            end: isDesktop ? '+=300' : '+=200',
                            scrub: 1,
                            markers: false,
                            toggleActions: 'play play none none'
                        }
                    });
                });



                //  Video Fade in  Animations
                gsap.to(".fadein-video", 3.5, {
                    opacity: 1,
                    delay: 2,
                    autoAlpha: 1,
                    ease: 'power4.out',
                });


                //  Opacity/ FadeIn  Animations

                const fadeInBasic = (className, durationTime, delayTime, easeName, scrollTriggerName, startTimeDesktop, startTimeMob, endTimeDesktop, endTimeMobile, toggleActionName) => {
                    gsap.to(className, {
                        duration: durationTime,
                        delay: delayTime,
                        opacity: 1,
                        autoAlpha: 1,
                        ease: easeName,
                        scrollTrigger: {
                            trigger: scrollTriggerName,
                            start: isDesktop ? startTimeDesktop : startTimeMob,
                            end: isDesktop ? endTimeDesktop : endTimeMobile,
                            scrub: 1,
                            markers: false,
                            toggleActions: toggleActionName
                        }
                    });
                }

                fadeInBasic(".fadein-basic", 1.2, 0.2, 'power4.out', ".fadein-basic", 'top 50%', 'top 50%', '+=300', '+=300', 'play play none none');



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





                // Stacked cards only in Desktop
                if (isDesktop) {
                    var tlStackedCards = gsap.timeline({
                        scrollTrigger: {
                            trigger: "#pack-container",
                            start: "38% 50%",
                            end: "+=500%",
                            scrub: 4.5,
                            pin: true
                        }
                    });
                    tlStackedCards.to(
                        "#card-one",
                        {
                            top: isTablet ? "30%" : "30%"
                        },
                        "a"
                    )
                        .to(
                            "#card-two",
                            {
                                top: "130%"
                            },
                            "a"
                        )
                        .to(
                            "#card-two",
                            {
                                top: isTablet ? "33%" : "36%"
                            },
                            "b"
                        )
                        .to(
                            "#card-three",
                            {
                                top: "130%"
                            },
                            "b"
                        )
                        .to(
                            "#card-three",
                            {
                                top: isTablet ? "36%" : "44%"
                            },
                            "c"
                        )
                        .to(
                            "#card-four",
                            {
                                top: "130%"
                            },
                            "c"
                        )
                        .to(
                            "#card-four",
                            {
                                top: isTablet ? "39%" : "50%"
                            },
                            "d"
                        );
                }


                //------Key Industry Capsule Image hover text "GO"
                const industryImage = document.getElementsByClassName('imagee-industry');
                const textOverImage = document.getElementsByClassName('industry_capsule_image_hover_text');

                for (let i = 0; i < industryImage.length; i++) {
                    industryImage[i].addEventListener('mouseenter', function (e) {
                        textOverImage[i].classList.add('showGo');
                        industryImage[i].classList.add('imageDarken');
                    });

                    textOverImage[i].addEventListener('mouseenter', function (e) {
                        textOverImage[i].classList.add('showGo');
                        industryImage[i].classList.add('imageDarken');
                    });

                    industryImage[i].addEventListener('mouseleave', function (e) {
                        textOverImage[i].classList.remove('showGo');
                        industryImage[i].classList.remove('imageDarken');
                    });

                    textOverImage[i].addEventListener('mouseleave', function (e) {
                        textOverImage[i].classList.remove('showGo');
                        industryImage[i].classList.remove('imageDarken');
                    });
                }



                //---- split heading-3 in industry we work

                gsap.to(".split-heading-3", {
                    duration: 1,
                    opacity: 1,
                    autoAlpha: 1,
                    ease: "power4",
                    stagger: 1,
                    scrollTrigger: {
                        trigger: ".split-heading-3",
                        start: isDesktop ? 'top 60%' : 'top 80%',
                        end: isDesktop ? '+=200' : '+=150',
                        scrub: true,
                        markers: false,
                        toggleActions: 'play complete none reset',
                    }
                });

                gsap.to(".imagee-industry", {
                    delay: 3,
                    width: isDesktop ? 150 : 65,
                    opacity: 1,
                    autoAlpha: 1,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: ".imagee-industry",
                        start: isDesktop ? 'top 35%' : 'top 50%',
                        end: isDesktop ? '+=300' : '+=200',
                        scrub: true,
                        toggleActions: 'play complete none reset'
                    },
                });


                // SPlit heading 3 (Industries we work with...)

                const doSplitText3 = () => {
                    const childSplit3 = new SplitText(".text-split-3", {
                        type: "lines",
                        linesClass: "split-child-3"
                    });
                    const parentSplit3 = new SplitText(".text-split-3", {
                        linesClass: "split-parent-3"
                    });

                    textSplitText3 = gsap.to(childSplit3.lines, {
                        duration: 2,
                        yPercent: 100,
                        ease: "power4",
                        stagger: 1,
                        scrollTrigger: {
                            trigger: ".text-split-3",
                            start: isDesktop ? 'top 50%' : 'top 50%',
                            end: isDesktop ? '+=300' : '+=200',
                            scrub: true,
                            markers: false,
                        }
                    });
                }


                doSplitText3();
                window.addEventListener("resize", doSplitText3);


                // Collaboration
                fadeInBasic(".fadein-basic-2", 1.2, 0.2, 'power4.out', ".fadein-basic-2", 'center center', 'top 50%', '+=300', '+=300', 'play play none none');

                splitHeadingOne(
                    ".large-heading-2",
                    0.8,
                    0.2,
                    'power1.out',
                    "top center",
                    "+=200",
                    -200
                );

                fadeInBasic(".fadein-basic-3", 1.2, 0.2, 'power4.out', ".fadein-basic-3", 'center 65%', 'top 50%', '+=300', '+=300', 'play play none none');



                // Testimonial reveal
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


                fadeInBasic(".fadein-basic-4", 1.2, 0.2, 'power4.out', ".fadein-basic-4", 'center center', 'top 50%', '+=300', '+=300', 'play play none none');


                // Large Sub Heading White Split text-2

                gsap.to(".split-heading-2", {
                    duration: 1,
                    opacity: 1,
                    autoAlpha: 1,
                    ease: "power4",
                    stagger: 1,
                    scrollTrigger: {
                        trigger: ".split-heading-2",
                        start: isDesktop ? 'top 50%' : 'top 80%',
                        end: isDesktop ? '+=300px' : '+=200',
                        scrub: true,
                        toggleActions: 'play complete none reset'
                    }
                });

                let textSplitText2;
                const doSplitText2 = () => {
                    textSplitText2 && textSplitText2.progress(1);
                    const childSplit2 = new SplitText(".text-split-2", {
                        type: "lines",
                        linesClass: "split-child-2"
                    });
                    const parentSplit2 = new SplitText(".text-split-2", {
                        type: "lines",
                        linesClass: "split-parent-2"
                    });

                    textSplitText2 = gsap.to(".split-child-2", {
                        duration: 2,
                        yPercent: 100,
                        ease: "power4",
                        stagger: 1,
                        scrollTrigger: {
                            trigger: ".text-split-2",
                            start: isDesktop ? 'top 50%' : 'top 50%',
                            end: isDesktop ? '+=300' : '+=200',
                            scrub: true,
                        }
                    });
                }

                doSplitText2();
                window.addEventListener("resize", doSplitText2);


                fadeInBasic(".fadein-basic-5", 1, 0, 'power4.out', ".fadein-basic-5", 'top 35%', 'top 50%', '+=200', '+=300', 'play play none none');
                fadeInBasic(".fadein-basic-6", 1, 0, 'power4.out', ".fadein-basic-6", 'top 35%', 'top 50%', '+=200', '+=300', 'play play none none');





                // --- Gsap Responsiveness ends here--//
            });





        //======== Testimonial Section Swiper ======== //
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



        // swiper for logo grid in mobile view
        const swiperLogoGrid = new Swiper('.logo-grid-sm .swiper', {
            direction: 'horizontal',
            loop: false,
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
                clickable: 'true'
            }
        });
        // swiper ends

    }
    // loadPageAnimations END
}

