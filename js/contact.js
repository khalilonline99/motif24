
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
                isMobile: '(max-width: 767px)',
                reduceMotion: "(prefers-reduced-motion: reduce)",
            },
            (context) => {
                let { isDesktop, isMobile, reduceMotion } = context.conditions;


                //  Marquee Fadein
                gsap.to(".text-marquee-heading", 3.5, {
                    opacity: 1,
                    autoAlpha: 1,
                    ease: 'power4.out',
                    scrollTrigger: {
                        trigger: ".text-marquee-heading",
                        //  start: isDesktop ? 'top 65%' : 'top 50%',
                        //  end: isDesktop ? '+=300' : '+=200',
                        scrub: 1,
                        stagger: 0.4,
                        markers: false,
                        toggleActions: 'play play none none'
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
                                markers: true
                            }
                        });

                    return textSplitTimeline;
                }



                //-- Big text SPLIT animation (Let's unlock....)
                const bigTextAnimation = createTextSplitAnimation(
                    ".large-text", //targetSelector
                    "split-child-large-text", //linesClass
                    "split-parent-large-text", // parentClass
                    ".large-text", //trigger element
                    isDesktop ? 'top 50%' : 'top 65%', //start trigger
                    isDesktop ? '+=300px' : '+=200', //end trigger
                ); // end trigger



                // --- Opacity Animations
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

                // Form FADE
                createOpacityAnimation(
                    ".form-fadein", //elementSelector
                    isDesktop ? 'top 40%' : 'top 50%', //startTrigger
                    isDesktop ? '+=300' : '+=200', //endTrigger
                );
                // Testimonial FADE
                const marqueeMain = createOpacityAnimation(
                    ".testimonial__slider2", //elementSelector
                    isDesktop ? 'top 50%' : 'top 50%', //startTrigger
                    isDesktop ? '+=300' : '+=200', //endTrigger
                );








                // --- Gsap Responsiveness ends here--//
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




        // loadPageAnimations END
    }
}
