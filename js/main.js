        // // Project image management
        // const projectImages = [
        //     [0, 1, 2], // Project 1 images
        //     [0, 1, 2], // Project 2 images  
        //     [0, 1, 2], // Project 3 images
        //     [0, 1, 2]  // Project 4 images
        // ];

        let currentImageIndex = [0, 0, 0, 0, 0, 0, 0]; // Track current image index for each project
        function nextImage(projectIndex) {
            const images = document.querySelectorAll(`.project-card:nth-child(${projectIndex + 1}) .project-image`);
            images[currentImageIndex[projectIndex]].classList.remove('active');
            currentImageIndex[projectIndex] = (currentImageIndex[projectIndex] + 1) % images.length;
            images[currentImageIndex[projectIndex]].classList.add('active');
        }

        function previousImage(projectIndex) {
            const images = document.querySelectorAll(`.project-card:nth-child(${projectIndex + 1}) .project-image`);
            images[currentImageIndex[projectIndex]].classList.remove('active');
            currentImageIndex[projectIndex] = currentImageIndex[projectIndex] === 0 ? images.length - 1 : currentImageIndex[projectIndex] - 1;
            images[currentImageIndex[projectIndex]].classList.add('active');
        }

        // Auto-advance project images
        setInterval(() => {
            for (let i = 0; i < 4; i++) {
                nextImage(i);
            }
        }, 4000);

        // Projects swiper functionality
        function scrollProjects(direction) {
            const swiper = document.getElementById('projectsSwiper');
            const cardWidth = 400 + 32; // card width + gap
            const scrollAmount = cardWidth * direction;
            swiper.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
            updateSwiperButtons();
        }

        function updateSwiperButtons() {
            const swiper = document.getElementById('projectsSwiper');
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            
            prevBtn.disabled = swiper.scrollLeft <= 0;
            nextBtn.disabled = swiper.scrollLeft >= swiper.scrollWidth - swiper.clientWidth;
        }

        // Particles Animation
        function createParticles() {
            const container = document.getElementById('particles');
            const particleCount = 60;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 8 + 's';
                particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
                container.appendChild(particle);
            }
        }

        // Smooth Scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Scroll Progress
        window.addEventListener('scroll', () => {
            const scrollProgress = document.getElementById('scrollProgress');
            const scrollTop = document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercentage = (scrollTop / scrollHeight) * 100;
            scrollProgress.style.width = scrollPercentage + '%';
        });

        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe all fade-in elements
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // Enhanced parallax effect for hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroContent = document.querySelector('.hero-content');
            const particles = document.getElementById('particles');
            
            if (heroContent && scrolled < window.innerHeight) {
                heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
                heroContent.style.opacity = 1 - scrolled / window.innerHeight;
            }
            
            if (particles) {
                particles.style.transform = `translateY(${scrolled * 0.2}px)`;
            }
        });

        // Initialize everything
        document.addEventListener('DOMContentLoaded', () => {
            createParticles();
            updateSwiperButtons();
            
            // Add scroll listener for swiper buttons
            document.getElementById('projectsSwiper').addEventListener('scroll', updateSwiperButtons);
        });

        // Add loading animation
        window.addEventListener('load', () => {
            document.body.style.overflow = 'visible';
            document.querySelector('.hero').style.animation = 'fadeInUp 1.2s ease';
        });
