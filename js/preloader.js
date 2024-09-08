window.addEventListener('load', function () {

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
            // .to("body", { overflow: "auto", onComplete: loadHomepageAnimations });
            .to("body", { overflow: "auto"});
    }

    // function loadPageSpecificScripts() {
    //     let pageID = document.body.getAttribute('data-page-id');

    //     if (pageID === 'homepage') {
    //         loadScript('/finalstaging/wp-content/themes/motif24/js/homepage.js');
    //     } else if (pageID === 'what-we-do') {
    //         loadScript('/finalstaging/wp-content/themes/motif24/js/what-we-do.js');
    //     }
    // }

    // function loadScript(scriptUrl) {
    //     let script = document.createElement('script');
    //     script.src = scriptUrl;
    //     script.type = 'text/javascript';
    //     script.async = true;
    //     document.body.appendChild(script);
    // }


    //--------Preloader Animation 1 END



});