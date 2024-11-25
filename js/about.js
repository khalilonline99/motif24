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

    }
    else {
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



    // --------Preloader Animation 1 END

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
                let { isDesktop, isTablet, isMobile, reduceMotion } = context.conditions;


                //--- Split Large Heading in Hero Section---//
                const childSplit1 = new SplitText(".large-text-split-1", {
                    type: "lines",
                    linesClass: "split-child-1"
                });
                const parentSplit1 = new SplitText(".large-text-split-1", {
                    // type: "lines",
                    linesClass: "split-parent-1"
                });

                const largeTextHeading = gsap.timeline();

                largeTextHeading.to(".large-text-split-1", {
                    opacity: 1,
                    autoAlpha: 1,
                })

                gsap.to(childSplit1.lines, {
                    duration: 1.5,
                    opacity: 1,
                    yPercent: 100,
                    autoAlpha: 1,
                    ease: "power4",
                    stagger: 0,
                    scrollTrigger: {
                        trigger: ".large-text-split-1",
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
								visibility: 'visible',
                                width: isDesktop ? 130 : (isTablet ? '9vw' : 100),
                            }
                        );
                    }
                });




                // Hero Sub-heading animation
                const heroSubHeading = new SplitType('.reveal-sub-heading-text', { types: 'lines' });
                gsap.to('.reveal-sub-heading-text', {
                    opacity: 1,
                    delay: 1.2,
                    duration: 2.0,
                    // autoAlpha: 0,
                    stagger: {
                        amount: 0.3
                    }
                });
                gsap.from(heroSubHeading.lines, {
                    opacity: 0,
                    // autoAlpha: 0,
                    delay: 0.8,
                    duration: 1.8,
                    y: -30,
                    ease: "power4.out",
                    stagger: {
                        amount: 0.3
                    }
                });


                // ---------Large image/video reveal after initial loading
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
                        pin: isDesktop ? "#project-image_container" : (isTablet ? false : false),
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
                //----ending




                // ---- Opacity Animations
                const fadeinAnims = gsap.utils.toArray(".fadein-basic");
                fadeinAnims.forEach((fadeinAnim) => {
                    gsap.to(fadeinAnim, {
                        delay: 1,
                        opacity: 1,
                        autoAlpha: 1,
                        ease: 'power4.out',
                        scrollTrigger: {
                            trigger: fadeinAnim,
                            start: isDesktop ? 'top 50%' : 'top 50%',
                            end: isDesktop ? '+=300' : '+=200',
                            scrub: 1,
                            markers: false,
                            toggleActions: 'play play none none'
                        }
                    });
                });



                //--- Split Medium Headings---//
                const childSplit2 = new SplitText(".medium-text-split-1", {
                    type: "lines",
                    linesClass: "split-child-2"
                });
                const parentSplit2 = new SplitText(".medium-text-split-1", {
                    linesClass: "split-parent-2"
                });

                const mediumTextSplit = gsap.timeline()

                mediumTextSplit.to(".medium-text-split-1", {
                    opacity: 1,
                    autoAlpha: 1,
                })

                    .to(childSplit2.lines, {
                        duration: 1.5,
                        // opacity: 1,
                        yPercent: 100,
                        autoAlpha: 1,
                        ease: "power4",
                        stagger: 1,
                        scrollTrigger: {
                            trigger: ".medium-text-split-1",
                            start: isDesktop ? 'top 50%' : 'top 50%',
                            end: isDesktop ? '+=300px' : '+=200',
                            scrub: true,
                            markers: false
                        }
                    })
                    .to('.about-motif-p', {
                        opacity: 1,
                        autoAlpha: 1,
                        scrollTrigger: {
                            trigger: ".about-motif-p",
                            start: isDesktop ? 'top 50%' : 'top 50%',
                            end: isDesktop ? '+=300px' : '+=200',
                            scrub: true,
                            markers: false
                        }
                    })



                    // Office images auto scroll
                const logoImages = gsap.utils.toArray(".office-image img");

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

                // -- Office images scroll and change
                // let officeImages = document.querySelector(".office-image");
                // gsap.to(".office-image img", {
                //     opacity: 1,
                //     autoAlpha: 1,
                //     x: () => -(officeImages.scrollWidth - window.innerWidth),
                //     scrollTrigger: {
                //         trigger: officeImages,
                //         pin: officeImages,
                //         start: "center center",
                //         end: () => "+=" + (officeImages.scrollWidth - window.innerWidth),
                //         scrub: true,
                //         invalidateOnRefresh: true
                //     }
                // });




                // ----- Opacity Animations -2 
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
                            duration: 1.5,
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

                //-- Big text SPLIT animation
                const bigTextAnimation = createTextSplitAnimation(
                    ".big-text-anim", //targetSelector
                    "split-child-big-text-anim", //linesClass 
                    "split-parent-big-text-anim", // parentClass
                    ".big-text-anim", //trigger element
                    isDesktop ? 'top 50%' : 'top 50%', //start trigger
                    isDesktop ? '+=300px' : '+=200'
                ); // ---end trigger

                //-- story heading SPLIT
                const storyHeadingAnimation = createTextSplitAnimation(
                    ".story-heading", //targetSelector
                    "split-child-story-heading", //linesClass 
                    "split-parent-story-heading", // parentClass
                    ".story-heading", //trigger element
                    isDesktop ? 'top 50%' : 'top 50%', //start trigger
                    isDesktop ? '+=300px' : '+=200'
                ); //--- end trigger


                //-- What why heading SPLIT
                const whatWhyHeadingAnimation = createTextSplitAnimation(
                    ".what-why-heading", //targetSelector
                    "split-child-what-why-heading", //linesClass 
                    "split-parent-what-why-heading", // parentClass
                    ".what-why-heading", //trigger element
                    isDesktop ? 'top 50%' : 'top 50%', //start trigger
                    isDesktop ? '+=300px' : '+=200'
                ); //---- end trigger


                //===== Opacity/ Fade in animation
                function createOpacityAnimation(elementSelector, startTrigger, endTrigger) {
                    gsap.to(elementSelector, 3.5, {
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

                // ----Story paragraph FADE
                const storyPara = createOpacityAnimation(
                    ".story-p", //elementSelector
                    isDesktop ? 'top 50%' : 'top 50%', //startTrigger
                    isDesktop ? '+=300' : '+=200', //endTrigger
                );

                // ----Quote from Ash FADE
                const quoteLarge = createOpacityAnimation(
                    ".quote-1", //elementSelector
                    isDesktop ? 'top 50%' : 'top 50%', //startTrigger
                    isDesktop ? '+=300' : '+=200', //endTrigger
                );


                //---- What why accordion FADE
                const whatWhyAccordion = createOpacityAnimation(
                    ".accordion-what-why", //elementSelector
                    isDesktop ? 'top 50%' : 'top 50%', //startTrigger
                    isDesktop ? '+=300' : '+=200', //endTrigger
                );




                // --- Gsap Responsiveness ends here--//
            });


        // loadPageAnimations END
    }

}  