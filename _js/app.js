document.addEventListener('DOMContentLoaded', function() {
    //Buger
    const nav = document.querySelector('nav');
    const burger = document.querySelector('.hamburger');
    const sidebar = document.querySelector('.sidebar');
    const sideLinks = sidebar.querySelector('ul').querySelectorAll('li');
    // ClickBurger function
    const clickburger = function(e) {
        // Toogle Nav
        sidebar.classList.toggle('active');
    
        // Burger Animation
        nav.classList.toggle('cross');
    
        // Animate Links
        sideLinks.forEach((e, index) => {
            if(e.style.animation) {
                e.style.animation = '';
            }else {
                e.style.animation = `sideLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }  
        });


        if(nav.classList.contains('cross') && sidebar.classList.contains('active')) {

            nav.addEventListener('click', function(e) {
                e.stopPropagation();
            });
            sidebar.addEventListener('click', function(e) {
                e.stopPropagation();
            });
            document.querySelector("body>div").addEventListener('click', function() {
                // Close burger menu 
                sidebar.classList.remove('active');
                nav.classList.remove('cross');
                // Reset Navlink animate style
                sideLinks.forEach((e) => {
                    if(e.style.animation) {
                        e.style.animation = null;
                    }
                });
            });
        }
    };
    // Burger AddEventListener
    burger.addEventListener('click', ()=> clickburger());


    // Slider Animation
    // Selector
    const slider = document.querySelector('.slider-container');
    const sliderGallery = document.querySelector('.slider-gallery');
    const GalleryImgs = document.querySelectorAll('.slider-gallery li img');
    const liIndex = document.querySelectorAll('.slider-gallery li').length;
    const prev = document.querySelector(".prev");
    const next = document.querySelector(".next");
    const dots = document.querySelectorAll('.dot');
    
    const slideFunction = function() {
        // If no slider gallery section, Return.
        if(!slider) { return; }

        let activeImg = 1;
        let sliderWidth = GalleryImgs[0].getBoundingClientRect().width;
        window.addEventListener("resize", function() {
            sliderWidth = GalleryImgs[0].getBoundingClientRect().width;
            sliderGallery.style.left = "-" + (activeImg - 1) * sliderWidth + "px";
        });
        
        // Function
        const Slideprev = function() {
            if(activeImg > 1) {
                activeImg = activeImg - 2;
                sliderGallery.style.left = "-" + activeImg * sliderWidth + "px";
                activeImg++;
            } else if (activeImg == 1) {
                activeImg = liIndex - 1;
                sliderGallery.style.left = "-" + activeImg * sliderWidth + "px";
                activeImg++;
            }
            SetDotActive();
        };
        const Slidenext = function() {
            if(activeImg < liIndex) {
                sliderGallery.style.left = "-" + activeImg * sliderWidth + "px";
                activeImg++;
            } else if (activeImg == liIndex) {
                sliderGallery.style.left = "0px";
                activeImg = 1;
            }
            SetDotActive();
        };
        const SetDotActive = function() {
            dots.forEach(dot => {
                dot.classList.remove('active');
                dots[activeImg - 1].classList.add('active');
            });
        };
        // Loop
        let autoSlide;
        const autoSlideRepeater = () => {
            autoSlide = setInterval(function() {
                Slidenext();
            }, 4000);
        };
        const resetAutoSlide = function() {
            clearInterval(autoSlide);
            autoSlideRepeater();
        };
        // Loop Start
        autoSlideRepeater();

        
        // AddEventListener
        prev.addEventListener('click', function() { 
            resetAutoSlide();
            Slideprev();
        });
        next.addEventListener('click', function() { 
            resetAutoSlide();
            Slidenext();
        });
        dots.forEach(function dot(e, index) {
            e.addEventListener('click', function() {
                if (index == activeImg - 1) {
                    return;
                }else {
                    resetAutoSlide();
                    sliderGallery.style.left = "-" + index * sliderWidth + "px";
                    activeImg = index + 1;
                    SetDotActive();
                }
            });
        });
        slider.addEventListener("mouseover", () => {
            clearInterval(autoSlide);
        });
        slider.addEventListener("mouseout", () => {
            resetAutoSlide();
        });
    };
    slideFunction();

    // Menu Onclick to Scroll
    const bannerLinks = document.querySelectorAll(".banner-link ul li a");
    let bannerLinkTarget;

    const smoothScroll = function(tarGet, duration) {
        // const targetPosition = tarGet.getBoundingClientRect().top;
        const targetPosition = tarGet.offsetTop - 24;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;
    
        const animation = function(currentTime) {
            if(startTime === null) startTime = currentTime;
            let timeElapsed = currentTime - startTime;
            let run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if(timeElapsed < duration) requestAnimationFrame(animation);
        };
    
        function ease(t, b, c ,d){
            t /= d/2;
            if (t < 1) return c/2*t*t + b;
            t--;
            return -c/2 * (t*(t-2) - 1) + b;
        }
    
        requestAnimationFrame(animation);
    };

    bannerLinks.forEach(bannerLink => {
        bannerLink.addEventListener('click', function(e) {
            // if css scroll-behavior can working return
            if (getComputedStyle(document.body).scrollBehavior === 'smooth'){
                console.log(getComputedStyle(document.body).scrollBehavior);  
                return;
            } else {
                console.log(getComputedStyle(document.body).scrollBehavior);  
                // Add smoothScroll function
                e.preventDefault();
                let bannerLinkTarget = document.querySelector(e.target.hash);
                smoothScroll(bannerLinkTarget, 500);
            }
        });
    });

    // Class btn Onclick to Scroll
    const classBtns = document.querySelectorAll(".class a");
    classBtns.forEach(classBtn => {
        classBtn.addEventListener('click', (e) => {
            // if css scroll-behavior can working return
            if (getComputedStyle(document.body).scrollBehavior === 'smooth'){
                return;
            } else {
                // Add smoothScroll function
                e.preventDefault();
                let classBtnTarget = document.querySelector(e.target.hash);
                smoothScroll(classBtnTarget, 500);
            }
        });
    });

    // List hover animation
    const list = document.querySelectorAll('.list');
    const indicator = document.querySelector('.indicator');
    function activeLink(e, index) {
        // e.preventDefault();
        list.forEach((item) => 
        item.classList.remove('active'));
        e.classList.add('active');
        // console.log(index);
        indicator.style.transform = `translateX( calc(100px * ${index}) ) translateY(-42.5px)`;
    }
    for(let i=0; i<list.length; i++) {
        list[i].addEventListener('click', () => {
            
            activeLink(list[i], i);
            // console.log(list[i]);          
        });
    }
});