<?php

/**
 * Theme functions and definitions.
 *
 * For additional information on potential customization options,
 * read the developers' documentation:
 *
 * https://developers.elementor.com/docs/hello-elementor-theme/
 *
 * @package HelloElementorChild
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

define('HELLO_ELEMENTOR_CHILD_VERSION', '2.0.0');

/**
 * Load child theme scripts & styles.
 *
 * @return void
 */


function hello_elementor_child_scripts_styles()
{
    global $post;
    $perma = get_permalink($post->ID);


    // GSAP Core
    wp_enqueue_script('gsap-core', 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js', array(), null, true);

    // Additional GSAP Plugins
    wp_enqueue_script('gsap-flip', 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/Flip.min.js', array('gsap-core'), null, true);
    wp_enqueue_script('gsap-scrolltrigger', 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js', array('gsap-core'), null, true);
    wp_enqueue_script('gsap-scrollto', 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollToPlugin.min.js', array('gsap-core'), null, true);
    wp_enqueue_script('gsap-draggable', 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/Draggable.min.js', array('gsap-core'), null, true);
    wp_enqueue_script('gsap-easel', 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/EaselPlugin.min.js', array('gsap-core'), null, true);
    wp_enqueue_script('gsap-text', 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/TextPlugin.min.js', array('gsap-core'), null, true);
    wp_enqueue_script('gsap-easepack', 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/EasePack.min.js', array('gsap-core'), null, true);
    wp_enqueue_script('gsap-custom', 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/CustomEase.min.js', array('gsap-core'), null, true);
    wp_enqueue_script('gsap-tweenmax', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.3/TweenMax.min.js', array('gsap-core'), null, true);

    // Popper.js for tooltips and dropdowns
    wp_enqueue_script('popper-js', 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/2.9.2/umd/popper.min.js', array(), null, true);

    // Three.js for 3D animations
    wp_enqueue_script('three-js', 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js', array(), null, true);

    // Lenis for smooth scrolling
    wp_enqueue_script('lenis-js', 'https://cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.23/bundled/lenis.min.js', array(), null, true);

    // Scroll Smoother custom library
    wp_enqueue_script('scroll-smoother', get_template_directory_uri() . '/lib/ScrollSmoother.min.js', array(), null, true);

    // Ensure jQuery is added
    wp_enqueue_script('jquery');


    wp_enqueue_style(
        'hello-elementor-child-style-homepage',
        get_stylesheet_directory_uri() . '/style.css',
        [
            'hello-elementor-theme-style',
        ],
        HELLO_ELEMENTOR_CHILD_VERSION
    );

    include(get_stylesheet_directory() . '/html/preloader.html'); // loading html here



    if (is_page(122661)) {
        //homepage
        wp_enqueue_style(
            'hello-elementor-child-style-homepage',
            get_stylesheet_directory_uri() . '/css/homepage.css',
            [
                'hello-elementor-theme-style',
            ],
            HELLO_ELEMENTOR_CHILD_VERSION
        );

        wp_enqueue_script('js-homepage', get_stylesheet_directory_uri() . '/js/homepage.js', array('jquery'), '', true);
    } elseif (is_page(131269)) {
        // what we do
        wp_enqueue_style(
            'hello-elementor-child-style-what-we-do',
            get_stylesheet_directory_uri() . '/css/what-we-do.css',
            [
                'hello-elementor-theme-style',
            ],
            HELLO_ELEMENTOR_CHILD_VERSION
        );
        wp_enqueue_script('js-what-we-do', get_stylesheet_directory_uri() . '/js/what-we-do.js', array('jquery'), '', true);
    } elseif (is_page(119786)) {
        // how we do
        wp_enqueue_style(
            'hello-elementor-child-style-how-we-do',
            get_stylesheet_directory_uri() . '/css/how-we-do.css',
            [
                'hello-elementor-theme-style',
            ],
            HELLO_ELEMENTOR_CHILD_VERSION
        );
        wp_enqueue_script('js-how-we-do', get_stylesheet_directory_uri() . '/js/how-we-do.js', array('jquery'), '', true);
    } elseif (strpos($perma, '/finalstaging/about') !== false) {
        //about page
        wp_enqueue_style(
            'hello-elementor-child-style-about',
            get_stylesheet_directory_uri() . '/css/about.css',
            [
                'hello-elementor-theme-style',
            ],
            HELLO_ELEMENTOR_CHILD_VERSION
        );
        wp_enqueue_script('js-about', get_stylesheet_directory_uri() . '/js/about.js', array('jquery'), '', true);
    } elseif (strpos($perma, '/finalstaging/the-motif-process') !== false) {
        //motif process
        wp_enqueue_style(
            'hello-elementor-child-style-the-motif-process',
            get_stylesheet_directory_uri() . '/css/the-motif-process.css',
            [
                'hello-elementor-theme-style',
            ],
            HELLO_ELEMENTOR_CHILD_VERSION
        );
        wp_enqueue_script('js-how-we-do', get_stylesheet_directory_uri() . '/js/how-we-do.js', array('jquery'), '', true);
    } elseif (strpos($perma, '/finalstaging/why-motif') !== false) {
        //why motif page
        wp_enqueue_style(
            'hello-elementor-child-style-why-motif',
            get_stylesheet_directory_uri() . '/css/why-motif.css',
            [
                'hello-elementor-theme-style',
            ],
            HELLO_ELEMENTOR_CHILD_VERSION
        );
        wp_enqueue_script('js-why-motif', get_stylesheet_directory_uri() . '/js/why-motif.js', array('jquery'), '', true);
    } elseif (strpos($perma, '/finalstaging/contact') !== false) {
        //contact page
        wp_enqueue_style(
            'hello-elementor-child-style-contact',
            get_stylesheet_directory_uri() . '/css/contact.css',
            [
                'hello-elementor-theme-style',
            ],
            HELLO_ELEMENTOR_CHILD_VERSION
        );
        wp_enqueue_script('js-contact', get_stylesheet_directory_uri() . '/js/contact.js', array('jquery'), '', true);
    } elseif (
        strpos($perma, '/finalstaging/pulse-b2b-commerce-agency') !== false
    ) {
        //Single pages
        wp_enqueue_style(
            'hello-elementor-child-style-contact',
            get_stylesheet_directory_uri() . '/css/pulseb2b.css',
            [
                'hello-elementor-theme-style',
            ],
            HELLO_ELEMENTOR_CHILD_VERSION
        );
        wp_enqueue_script('js-singlePageFull', get_stylesheet_directory_uri() . '/js/singlePageFull.js', array('jquery'), '', true);
    } elseif (
        strpos($perma, '/finalstaging/dtc-agency-motif-the-agency') !== false
    ) {
        //Single pages
        wp_enqueue_style(
            'hello-elementor-child-style-contact',
            get_stylesheet_directory_uri() . '/css/pulseb2b.css',
            [
                'hello-elementor-theme-style',
            ],
            HELLO_ELEMENTOR_CHILD_VERSION
        );
        wp_enqueue_script('js-singlePageFull', get_stylesheet_directory_uri() . '/js/singlePageFull.js', array('jquery'), '', true);
    } elseif (
        strpos($perma, '/finalstaging/shopify-plus-partner-agency') !== false
    ) {
        //Single pages
        wp_enqueue_style(
            'hello-elementor-child-style-contact',
            get_stylesheet_directory_uri() . '/css/pulseb2b.css',
            [
                'hello-elementor-theme-style',
            ],
            HELLO_ELEMENTOR_CHILD_VERSION
        );
        wp_enqueue_script('js-singlePageFull', get_stylesheet_directory_uri() . '/js/singlePageFull.js', array('jquery'), '', true);
    } elseif (
        strpos($perma, '/finalstaging/elite-bigcommerce-partner-agency') !== false
    ) {
        //Single pages
        wp_enqueue_style(
            'hello-elementor-child-style-contact',
            get_stylesheet_directory_uri() . '/css/pulseb2b.css',
            [
                'hello-elementor-theme-style',
            ],
            HELLO_ELEMENTOR_CHILD_VERSION
        );
        wp_enqueue_script('js-singlePageFull', get_stylesheet_directory_uri() . '/js/singlePageFull.js', array('jquery'), '', true);
    } elseif (
        strpos($perma, '/finalstaging/luxury-lifestyle-advertising-branding-agency-nyc-la-sf') !== false
    ) {
        //Single OTHER pages
        wp_enqueue_style(
            'hello-elementor-child-style-contact',
            get_stylesheet_directory_uri() . '/css/pulseb2b.css',
            [
                'hello-elementor-theme-style',
            ],
            HELLO_ELEMENTOR_CHILD_VERSION
        );
        wp_enqueue_script('js-singlePageOthers', get_stylesheet_directory_uri() . '/js/singlePageOthers.js', array('jquery'), '', true);
    } elseif (
        strpos($perma, '/finalstaging/fashion-agency') !== false
    ) {
        //Single OTHER pages
        wp_enqueue_style(
            'hello-elementor-child-style-contact',
            get_stylesheet_directory_uri() . '/css/pulseb2b.css',
            [
                'hello-elementor-theme-style',
            ],
            HELLO_ELEMENTOR_CHILD_VERSION
        );
        wp_enqueue_script('js-singlePageOthers', get_stylesheet_directory_uri() . '/js/singlePageOthers.js', array('jquery'), '', true);
    } elseif (
        strpos($perma, '/finalstaging/beauty-brand-marketing-advertising-agency') !== false
    ) {
        //Single OTHER pages
        wp_enqueue_style(
            'hello-elementor-child-style-contact',
            get_stylesheet_directory_uri() . '/css/pulseb2b.css',
            [
                'hello-elementor-theme-style',
            ],
            HELLO_ELEMENTOR_CHILD_VERSION
        );
        wp_enqueue_script('js-singlePageOthers', get_stylesheet_directory_uri() . '/js/singlePageOthers.js', array('jquery'), '', true);
    } else {
        wp_enqueue_style(
            'hello-elementor-child-style',
            get_stylesheet_directory_uri() . '/style.css',
            [
                'hello-elementor-theme-style',
            ],
            HELLO_ELEMENTOR_CHILD_VERSION
        );
    }
}
add_action('wp_enqueue_scripts', 'hello_elementor_child_scripts_styles', 20);
