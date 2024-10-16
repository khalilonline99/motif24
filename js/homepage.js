window.onload = function () {

    setTimeout(function () {

        //function loadHomepageAnimations() {

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

        gsap.registerPlugin(SplitText, ScrollTrigger, CustomEase);
        // ScrollSmoother.create({
        //     smooth: 1,
        //     effects: true,
        //   });
        let mm = gsap.matchMedia();
        mm.add(
            {
                isDesktop: '(min-width: 1024px)',
                isTablet: '(min-width: 768px) and (min-width: 1024px)',
                isMobile: '(max-width: 767px)',
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
                            trigger: ".what-we-do-large-heading",
                            start: isDesktop ? "top bottom" : "top 50%",
                            end: "+=400",
                            scrub: 0.8,
                        }
                    }
                );


                //-------Main Hero Animation
                const heroSplitLines = new SplitType('.large-text-split-1', { types: 'lines' });
                const heroHeadingLines = document.querySelectorAll(".large-text-split-1 .line");
                heroHeadingLines.forEach(function (line) {
                    const wrapper = document.createElement("div");
                    wrapper.classList.add("hero-line-wrapper");
                    line.parentNode.insertBefore(wrapper, line);
                    wrapper.appendChild(line);
                });
                gsap.to(".large-text-split-1", {
                    opacity: 1,
                    autoAlpha: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power1.out',
                });
                gsap.from(heroSplitLines.lines, {
                    opacity: 0,
                    yPercent: -200,
                    duration: 1.1,
                    stagger: 0.1,
                    ease: 'power1.out',
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
                    delay: 0.8,
                    opacity: 0,
                    yPercent: -200,
                    duration: 1.1,
                    stagger: 0.1,
                    ease: 'power1.out'
                });





                gsap.fromTo("#campsuleImage, #campsuleImage2, #campsuleImage3, #campsuleImage4",
                    {
                        width: 0,
                    },
                    {
                        visibility: 'visible',
                        width: isDesktop ? '7vw' : (isTablet ? '5vw' : '4vw'),
                    }, "-=0.2"
                );




                // for mobile-2
                let mobileHeroInnerTexts = document.querySelectorAll(".rolling-texts");
                const tlMoibleHero = gsap.timeline({ repeat: -1 });
                tlMoibleHero.to('.rolling-texts', {
                    delay: 1,
                    duration: 2.5,
                    y: "0%",
                    ease: CustomEase.create("custom", "M0,0 C0.048,0.361 0.021,0.51 0.347,0.806 0.569,1.008 0.818,1.001 1,1 "),
                    scrollTrigger: {
                        markers: false
                    }
                })
                tlMoibleHero.to('.circle', {
                    duration: 1.5,
                    width: "22vw", // 1st Fashion
                    ease: "expo.out"
                }, "<")
                tlMoibleHero.to('.rolling-texts', {
                    delay: 1,
                    duration: 2.5,
                    y: "-25%",
                    ease: CustomEase.create("custom", "M0,0 C0.048,0.361 0.021,0.51 0.347,0.806 0.569,1.008 0.818,1.001 1,1 ")
                })
                tlMoibleHero.to('.circle', {
                    duration: 1.5,
                    width: "20vw", //2nd Luxury
                    ease: "expo.out"
                }, "<")
                tlMoibleHero.to('.rolling-texts', {
                    delay: 1,
                    duration: 2.5,
                    y: "-50%",
                    ease: CustomEase.create("custom", "M0,0 C0.048,0.361 0.021,0.51 0.347,0.806 0.569,1.008 0.818,1.001 1,1 ")
                })
                tlMoibleHero.to('.circle', {
                    duration: 1.5,
                    width: "8vw",// 3rd Lifestyle
                    ease: "expo.out"
                })
                tlMoibleHero.to('.rolling-texts', {
                    delay: 1,
                    duration: 2.5,
                    y: "-75%",
                    ease: CustomEase.create("custom", "M0,0 C0.048,0.361 0.021,0.51 0.347,0.806 0.569,1.008 0.818,1.001 1,1 ")
                })
                tlMoibleHero.to('.circle', {
                    duration: 1.5,
                    width: "22vw", // 4th 
                    ease: "expo.out"
                })
                tlMoibleHero.to('.circle', {
                    duration: 1.5,
                    width: "8.5vw", // 5th 
                    ease: "expo.out"
                })

                // As seen on logo animation
                const logoImages = gsap.utils.toArray(".logo-image");

                const loop = horizontalLoop(logoImages, {
                    paused: true,
                    repeat: -1
                });
                loop.play()
                ScrollTrigger.create({
                    start: 0,
                    end: 'max',
                    onUpdate: function (self) {
                        self.direction === -1 ? loop.timeScale(-1) : loop.timeScale(1)
                    }
                })

                gsap.from('.portfolio-full-container', {
                    opacity: 0,
                    delay: 0.8,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: '.portfolio-full-container',
                        start: isDesktop ? "top 90%" : "20px 40%",
                        end: "+=200",
                        scrub: false,
                    },
                })


                // ===Portfolio reveal animation======= //

                // ========Portfolio swiper Js ========== //
                const swiper = new Swiper('.swiper-portfolio', {
                    direction: "horizontal",
                    pagination: false,
                    navigation: false,
                    spaceBetween: 0,

                    slidesPerView: 4,
                    breakpoints: {
                        320: {
                            slidesPerView: 1.5,
                            spaceBetween: 5,
                            loop: false
                        },
                        768: {
                            slidesPerView: 5,
                            spaceBetween: 8,
                            loop: false,
                            mousewheel: false,
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 0,
                            loop: false,
                        }
                    }
                });




                const itemToGetMargin = document.querySelectorAll('.main-hero .e-con-inner');
                const StyleToGetMarginValue = getComputedStyle(itemToGetMargin[0]);
                const itemLeftMargin = StyleToGetMarginValue.marginLeft;
                const portfolioSlider = document.querySelector(".portfolio__slider");

                //--- Adding padding to the start of portfolio-----//

                const portfolioTimeline = gsap.timeline();

                // Portfolio images reveal from small to large size
                // portfolioTimeline.fromTo(".portfolio__slider",
                //     {opacity: 0},
                //     {
                //         duration: 1.5,
                //         opacity: 1,
                //         ease: "elastic.out(1,1)",
                //         scrollTrigger: {
                //             trigger: ".portfolio__slider",
                //             start: isDesktop ? "top middle" : "20px 40%",
                //             end: "+=400",
                //             toggleActions: "play complete none none"
                //         }
                //     }
                // )
                portfolioTimeline.fromTo(".portfolio_single_image",
                    {
                        width: isDesktop ? "0vw" : "60vw",
                        height: isDesktop ? "0vw" : "",
                    },
                    {
                        delay: 0.5,
                        duration: 1.5,
                        width: isDesktop ? "23vw" : "60vw",
                        height: isDesktop ? "27vw" : "",
                        ease: "elastic.out(1,1)",
                        scrollTrigger: {
                            trigger: ".portfolio__image",
                            start: isDesktop ? "top bottom" : "20px 40%",
                            end: "+=400",
                            scrub: false,
                            markers: false,
                            toggleActions: "play complete none none"
                        }
                    }
                )
                portfolioTimeline.fromTo(
                    ".swiper-portfolio",
                    { paddingLeft: 0 },
                    {
                        paddingLeft: itemLeftMargin,
                        autoAlpha: 1,
                        ease: "elastic.out(1,1)",
                        scrollTrigger: {
                            trigger: ".swiper-portfolio",
                            start: isDesktop ? "top bottom" : "20px 40%",
                            end: "+=400",
                            scrub: false,
                            markers: false,
                            toggleActions: "play complete none none"
                        }
                    }
                )




                //-- Adding padding in front portfolio after resize of window
                window.addEventListener('resize', () => {
                    gsap.fromTo(
                        ".swiper-portfolio",
                        { paddingLeft: 0 },
                        {
                            paddingLeft: itemLeftMargin,
                            autoAlpha: 1,
                            ease: "elastic.out(1,1)",
                            scrollTrigger: {
                                trigger: ".swiper-portfolio",
                                start: isDesktop ? "top 70%" : "20px 40%",
                                end: "+=350",
                                scrub: false,
                                markers: false,
                                toggleActions: "play complete none none"
                            }
                        }
                    )
                }, true);

                // portfolio end



                // Fade in function for class used in different components
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

                fadeInClassMultiple(".reveal-as-seen-on-logo", 1.5, 1.8); //as seen on logo
                fadeInClassMultiple(".reveal-two", 0.2, 1.8); //as seen on logo
                fadeInClassMultiple(".motif-badge-container", 0.1, 1.8);
                fadeInClassMultiple(".logos-slide", 0.2, 1.8);


                //-- Reveal Lines as seen on 1
                const rightLines = gsap.utils.toArray('.border-line-top-right');
                rightLines.forEach((line) => {
                    gsap.to(line, {
                        duration: 1.1,
                        scrollTrigger: {
                            trigger: line,
                            scrub: false,
                        },
                        scale: 1,
                        ease: "power3.out",
                    });
                });

                // Reveal Lines as seen on 2
                // Const leftLines = gsap.utils.toArray('.border-line-btm-left');
                gsap.to('.border-line-btm-left', {
                    duration: 1.1,
                    scale: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: '.border-line-btm-left',
                        scrub: false,
                        markers: false,
                        // start: isDesktop ? "top 50%" : "top 50%",
                        // end: isDesktop ? "+=100px" : "+=200px",
                    },
                });



                // 		Line reveal from left
                const lineAnimationfromLeft = (className, duration, delay, startTime) => {
                    const leftLinesAnims = gsap.utils.toArray(className);
                    leftLinesAnims.forEach((leftLinesanim) => {
                        gsap.to(leftLinesanim, {
                            duration: duration,
                            delay: (delay || 0.5),
                            autoAlpha: 1,
                            opacity: 1,
                            scale: 1,
                            ease: "power4.out",
                            scrollTrigger: {
                                trigger: className,
                                start: isDesktop ? (startTime || 'top 50%' ): 'top 55%',
                                end: isDesktop ? '+=150' : '+=150',
                                scrub: false,
                                toggleActions: 'play play none none'
                            },
                        });
                    });
                }



                // Opacity Animations
                const opacityAnimation = (className, animationDuration, easeName, startPoint, endPoint, scrubVal, toggleAction) => {
                    const opacityAnims = gsap.utils.toArray(className);
                    opacityAnims.forEach((opacityAnim) => {
                        gsap.to(opacityAnim, {
                            duration: animationDuration,
                            opacity: 1,
                            autoAlpha: 1,
                            ease: easeName,
                            scrollTrigger: {
                                trigger: opacityAnim,
                                start: startPoint,
                                end: endPoint,
                                scrub: scrubVal,
                                markers: false,
                                toggleActions: toggleAction
                            }
                        });
                    });
                }

                opacityAnimation(
                    ".opacity-anim",
                    1.2,
                    "power4.out",
                    isDesktop ? 'top bottom' : 'top 50%',
                    isDesktop ? '+=200' : '+=200',
                    false,
                    "play play none none"
                );


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
                            scrub: false
                        }
                    });
                }


                splitHeadingOne(
                    ".large-text-split-2",
                    1.8,
                    0.2,
                    'power1.inOut',
                    "top bottom",
                    "+=150",
                    -200
                );

                // lineAnimationfromLeft('.border-line-from-left', 1.2, 0.5, "top bottom");
                gsap.to('.border-line-from-left', {
                    duration: duration,
                    delay: 0,
                    autoAlpha: 1,
                    opacity: 1,
                    scale: 1,
                    ease: "power1.inOut",
                    scrollTrigger: {
                        trigger: '.border-line-from-left',
                        start: isDesktop ? "top bottom": 'top 55%',
                        end: isDesktop ? '+=150' : '+=150',
                        scrub: false,
                        toggleActions: 'play play none none'
                    },
                });


                // paragraph scrub opacity animation
                const scrubOpacityAnimation = (className, opacityVal, durationVal, staggerVal, easeVal, startVal, endVal, dealyVal) => {
                    const heroSplitLines = new SplitType(className, { types: 'lines' });
                    gsap.from(heroSplitLines.lines, {
                        opacity: opacityVal,
                        duration: durationVal,
                        delay: (dealyVal || 0.5),
                        stagger: staggerVal,
                        ease: easeVal,
                        scrollTrigger: {
                            trigger: heroSplitLines.lines,
                            start: startVal,
                            end: endVal,
                            scrub: false,
                            markers: false
                        }
                    });
                }


                scrubOpacityAnimation(
                    '.p-animation',
                    0,
                    1.8,
                    0.2,
                    "power1.inOut",
                    "top bottom",
                    "+=200",
                );



                // 	buttons Animate

                const buttonAnimation = (className, durationTime, delayTime, ease, trigger, startPosition, endPosition) => {
                    gsap.from(className, {
                        duration: durationTime,
                        delay: delayTime,
                        autoAlpha: 0,
                        opacity: 1,
                        ease: ease,
                        scrollTrigger: {
                            trigger: trigger,
                            start: startPosition,
                            end: endPosition,
                            scrub: false,
                            markers: false,
                        }
                    })
                }

                buttonAnimation(".buttonAnimate", 1.5, 0.2, "power1.inOut", ".buttonAnimate", "top bottom", "+=150");


                // Image why us animation
                const imgWhyUsSections = gsap.utils.toArray(".img-why-us");
                imgWhyUsSections.forEach((imgWhyUsSection) => {
                    gsap.from(imgWhyUsSection, {
                        opacity: 0,
                        ease: 'power4.out',
                        scrollTrigger: {
                            trigger: imgWhyUsSection,
                            start: isDesktop ? 'top 45%' : 'top 40%',
                            end: isDesktop ? '+=250' : '+=200',
                            scrub: false,
                            markers: false,
                            toggleActions: 'play play none none'
                        }
                    });
                });



                // 	Stamp 1 in image
                gsap.to(".stamp_hm_1", {
                    opacity: 1,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: ".stamp_hm_1",
                        start: isDesktop ? "top 35%" : "top 50%",
                        end: "=+200",
                        scrub: false,
                        markers: false,
                        toggleActions: 'play play reverse reverse'
                    }
                });




                // 	color words animation2 -- Our work merges dynamic duos
                const previousHeight = document.querySelectorAll('.what-we-do-container')[0].offsetHeight;
                const revealTypes2 = gsap.utils.toArray('.reveal-type2');

                const split = new SplitText(".reveal-type2", {
                    type: "lines, words, chars",
                });
                const tlRevealType = gsap.timeline({
                    scrollTrigger: {
                        trigger: '.fill-main-container',
                        start: 'top top',
                        end: '+=1000',
                        pin: '.fill-main-container',
                        anticipatePin: 1,
                        scrub: 0.2
                    }
                })
                    .set(split.chars, {
                        color: 'white',
                        stagger: 0.1,
                        ease: 'power1.inOut',
                    }, 0.3);



                // Our work merges cards

                scrubOpacityAnimation(
                    '.reveal-card-h-1, .reveal-card-p-1',
                    0,
                    1.80,
                    0.1,
                    "power1.inOut",
                    "top center",
                    "+=150",
                );
                scrubOpacityAnimation(
                    '.reveal-card-h-2, .reveal-card-p-2',
                    0,
                    1.80,
                    0.1,
                    "power1.inOut",
                    "top center",
                    "+=150",
                );
                scrubOpacityAnimation(
                    '.reveal-card-h-3, .reveal-card-p-3',
                    0,
                    1.80,
                    0.1,
                    "power1.inOut",
                    "top center",
                    "+=150",
                );



                opacityAnimation(
                    ".opacity-anim-2",
                    1.2,
                    "power4.inOut",
                    isDesktop ? 'top 50%' : 'top 50%',
                    isDesktop ? '+=300' : '+=200',
                    false,
                    "play play none none"
                );


                // How we help heading
                splitHeadingOne(
                    ".large-text-split-3",
                    2.5,
                    0.1,
                    'power1.out',
                    "top center",
                    "+=150",
                    -200
                );

                scrubOpacityAnimation(
                    '.p-animation-2',
                    0,
                    1.80,
                    0.1,
                    "power1.out",
                    "top center",
                    "+=150",
                );


                lineAnimationfromLeft('.border-line-from-left-1', 1.2, 0.5);


                // 	buttons Animate

                buttonAnimation(".buttonAnims", 1.5, 1.3, "power1.inOut", ".buttonAnims", "center 90%", "+=100");


                opacityAnimation(
                    ".opacity-anim-3",
                    1.2,
                    "power4.out",
                    isDesktop ? 'top 45%' : (isTablet ? 'top 50%' : 'top 40%'),
                    isDesktop ? '+=300' : '+=200',
                    false,
                    "play play none none"
                );

                // 	Stamp 2 in image
                gsap.to(".stamp_hm_2", {
                    opacity: 1,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: ".stamp_hm_2",
                        start: isDesktop ? "top 65%" : "top 50%",
                        end: "=+150",
                        scrub: false,
                        markers: false,
                        toggleActions: 'play play reverse reverse'
                    }
                });


                // Heading of stats
                splitHeadingOne(
                    ".large-text-split-4",
                    0.5,
                    0.1,
                    'power1.out',
                    "top center",
                    "+=150",
                    -200
                );



                // Stat numbers anims fade in
                const statComponents = gsap.utils.toArray(".stat-anims");
                statComponents.forEach((statComponent) => {
                    gsap.from(statComponent, {
                        duration: 1.1,
                        opacity: 0,
                        ease: 'power4.out',
                        scrollTrigger: {
                            trigger: statComponent,
                            start: isDesktop ? 'top 45%' : 'top 50%',
                            end: isDesktop ? '+=200' : '+=200',
                            scrub: false,
                            markers: false,
                            toggleActions: 'play play none none'
                        }
                    });
                });

                // --------Testimonial reveal
                opacityAnimation(
                    ".testimonial__slider2",
                    1.2,
                    "power4.out",
                    isDesktop ? 'top 60%' : 'top 50%',
                    isDesktop ? '+=300px' : '+=200',
                    false,
                    "play play none none"
                );



                // -----------Scroll and change text section (are we liked?)

                let sectionScrollTextChange = gsap.utils.toArray(".section-scroll-text-change"),
                    textDuration = 2,
                    fadeDuration = 1,
                    tlScrollTextChange = gsap.timeline({
                        defaults: {
                            ease: "power1.inOut"
                        }
                    });

                gsap.set(sectionScrollTextChange[0], {
                    opacity: 1,
                    scale: 1
                });

                tlScrollTextChange.from(sectionScrollTextChange.slice(0), {
                    scale: isDesktop ? 2.5 : 2,
                    duration: 6,
                })
                //     .to(sectionScrollTextChange.slice(0), {
                //     scale: isDesktop ? 2.5 : 0.9,
                //     duration: 3,
                //     opacity: 0,
                //     autoAlpha: 0
                // })

                //     .from(sectionScrollTextChange[1], {
                //     scale: isDesktop ? 2.5 : 0.9,
                //     opacity: 0,
                //     data: "in"
                // })

                tlScrollTextChange.to(sectionScrollTextChange.slice(1), {
                    // scale: isDesktop ? 1 : 0.9,
                    opacity: 1,
                    stagger: textDuration,
                    data: "in"
                }, textDuration)

                    .to(sectionScrollTextChange, {
                        opacity: 0,
                        stagger: textDuration,
                        data: "out"
                    }, textDuration)

                // tlScrollTextChange.fromTo(".smiley-face", {
                //     visibility: "hidden", // Initially hidden
                //     scale: 0 // Initially scaled down
                // }, {
                //     visibility: "visible", // Make the smiley face visible
                //     scale: 1.5, // Final scale
                //     duration: 2, // Adjust duration for slower effect
                //     ease: "elastic.out(1, 0.3)" // Adjust easing as needed
                // });


                ScrollTrigger.create({
                    trigger: ".are-we-liked-container",
                    // pin: ".are-we-liked-container",
                    pin: true,
                    anticipatePin: 1,
                    // scrub: isDesktop ? 1 : 2,
                    scrub: false,
                    start: "top top",
                    animation: tlScrollTextChange,
                    end: isDesktop ? "+=500%" : "+=400%",
                    markers: false
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
                        scrub: false,
                        markers: false,
                        toggleActions: 'play play none none'
                    }
                });



                // ---Responsiveness ends here--//
            });


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
        //   function closeForm() {
        //     formContainer.style.display = 'none'
        //   }

        // -------------------------------------------------------------------------------------------------------------------------------------

        /*
        This helper function makes a group of elements animate along the x-axis in a seamless, responsive loop.
         
        Features:
         - Uses xPercent so that even if the widths change (like if the window gets resized), it should still work in most cases.
         - When each item animates to the left or right enough, it will loop back to the other side
         - Optionally pass in a config object with values like "speed" (default: 1, which travels at roughly 100 pixels per second), paused (boolean),  repeat, reversed, and paddingRight.
         - The returned timeline will have the following methods added to it:
           - next() - animates to the next element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
           - previous() - animates to the previous element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
           - toIndex() - pass in a zero-based index value of the element that it should animate to, and optionally pass in a vars object to control duration, easing, etc. Always goes in the shortest direction
           - current() - returns the current index (if an animation is in-progress, it reflects the final index)
           - times - an Array of the times on the timeline where each element hits the "starting" spot. There's also a label added accordingly, so "label1" is when the 2nd element reaches the start.
         */
        function horizontalLoop(items, config) {
            items = gsap.utils.toArray(items);
            config = config || {};
            let tl = gsap.timeline({ repeat: config.repeat, paused: config.paused, defaults: { ease: "none" }, onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100) }),
                length = items.length,
                startX = items[0].offsetLeft,
                times = [],
                widths = [],
                xPercents = [],
                curIndex = 0,
                pixelsPerSecond = (config.speed || 1) * 100,
                snap = config.snap === false ? v => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
                totalWidth, curX, distanceToStart, distanceToLoop, item, i;
            gsap.set(items, { // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
                xPercent: (i, el) => {
                    let w = widths[i] = parseFloat(gsap.getProperty(el, "width", "px"));
                    xPercents[i] = snap(parseFloat(gsap.getProperty(el, "x", "px")) / w * 100 + gsap.getProperty(el, "xPercent"));
                    return xPercents[i];
                }
            });
            gsap.set(items, { x: 0 });
            totalWidth = items[length - 1].offsetLeft + xPercents[length - 1] / 100 * widths[length - 1] - startX + items[length - 1].offsetWidth * gsap.getProperty(items[length - 1], "scaleX") + (parseFloat(config.paddingRight) || 0);
            for (i = 0; i < length; i++) {
                item = items[i];
                curX = xPercents[i] / 100 * widths[i];
                distanceToStart = item.offsetLeft + curX - startX;
                distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
                tl.to(item, { xPercent: snap((curX - distanceToLoop) / widths[i] * 100), duration: distanceToLoop / pixelsPerSecond }, 0)
                    .fromTo(item, { xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100) }, { xPercent: xPercents[i], duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond, immediateRender: false }, distanceToLoop / pixelsPerSecond)
                    .add("label" + i, distanceToStart / pixelsPerSecond);
                times[i] = distanceToStart / pixelsPerSecond;
            }
            function toIndex(index, vars) {
                vars = vars || {};
                (Math.abs(index - curIndex) > length / 2) && (index += index > curIndex ? -length : length); // always go in the shortest direction
                let newIndex = gsap.utils.wrap(0, length, index),
                    time = times[newIndex];
                if (time > tl.time() !== index > curIndex) { // if we're wrapping the timeline's playhead, make the proper adjustments
                    vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
                    time += tl.duration() * (index > curIndex ? 1 : -1);
                }
                curIndex = newIndex;
                vars.overwrite = true;
                return tl.tweenTo(time, vars);
            }
            tl.next = vars => toIndex(curIndex + 1, vars);
            tl.previous = vars => toIndex(curIndex - 1, vars);
            tl.current = () => curIndex;
            tl.toIndex = (index, vars) => toIndex(index, vars);
            tl.times = times;
            tl.progress(1, true).progress(0, true); // pre-render for performance
            if (config.reversed) {
                tl.vars.onReverseComplete();
                tl.reverse();
            }
            return tl;
        }

        //--- caliing the homepage animation when window resizes
        // window.addEventListener('resize', loadHomepageAnimations, true)


        // Three js image distortion on hover
        // WHAT WE DO
        new hoverEffect({
            parent: document.querySelector('.distortion-6'),
            intensity: 0.3,
            image1: 'https://wemotif.com/finalstaging/wp-content/uploads/2023/09/Section-graphic-without-stamp.png',
            image2: 'https://wemotif.com/finalstaging/wp-content/uploads/2023/09/Section-graphic-without-stamp.png',
            displacementImage: 'https://wemotif.com/finalstaging/wp-content/uploads/2023/09/distortionImage.png',
        });

        // Distortion How we help
        new hoverEffect({
            parent: document.querySelector('.distortion-7'),
            intensity: 0.3,
            imageRatio: 1,
            image1: 'https://wemotif.com/finalstaging/wp-content/uploads/2023/11/what-we-do-word.png',
            image2: 'https://wemotif.com/finalstaging/wp-content/uploads/2023/11/what-we-do-word.png',
            displacementImage: 'https://wemotif.com/finalstaging/wp-content/uploads/2023/09/distortionImage.png',
        });


        // loadHomepageAnimations Ends
        //}

    }, 5000);



}