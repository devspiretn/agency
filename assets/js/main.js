/**
* Template Name: Gp
* Template URL: https://bootstrapmade.com/gp-free-multipurpose-html-bootstrap-template/
* Updated: Aug 15 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function () {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Progress Scroll top button
   */

  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      // Show/hide button based on scroll position
      if (window.scrollY > 400) {
        scrollTop.classList.add('active');

        // Calculate scroll progress
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollPosition = window.scrollY;
        const scrollPercentage = (scrollPosition / (documentHeight - windowHeight)) * 100;

        // Update progress circle
        const progressBar = scrollTop.querySelector('.progress-bar');
        const circumference = 113; // 2πr where r=18
        const offset = circumference - (scrollPercentage / 100) * circumference;
        progressBar.style.strokeDashoffset = offset;

      } else {
        scrollTop.classList.remove('active');
      }
    }
  }

  // Smooth scroll to top
  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Throttle scroll events for better performance
  function throttle(func, wait) {
    let timeout = null;
    let previous = 0;

    return function () {
      const now = Date.now();
      const remaining = wait - (now - previous);

      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        func.apply(this, arguments);
      } else if (!timeout) {
        timeout = setTimeout(() => {
          previous = Date.now();
          timeout = null;
          func.apply(this, arguments);
        }, remaining);
      }
    };
  }

  // Add scroll event listener with throttling
  window.addEventListener('scroll', throttle(toggleScrollTop, 100));
  window.addEventListener('load', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: false,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function () {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function (filters) {
      filters.addEventListener('click', function () {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();


/**
 * custom cursor
 */

const innerCursor = document.querySelector('.inner-cursor');
const outerCursor = document.querySelector('.outer-cursor');

// Smooth cursor movement with requestAnimationFrame
let mouseX = 0;
let mouseY = 0;
let outerX = 0;
let outerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  // Inner cursor follows immediately
  innerCursor.style.left = `${mouseX}px`;
  innerCursor.style.top = `${mouseY}px`;
});

// Smooth animation for outer cursor
function animateOuterCursor() {
  const distX = mouseX - outerX;
  const distY = mouseY - outerY;

  outerX += distX * 0.15;
  outerY += distY * 0.15;

  outerCursor.style.left = `${outerX}px`;
  outerCursor.style.top = `${outerY}px`;

  requestAnimationFrame(animateOuterCursor);
}
animateOuterCursor();

// Hide cursors when mouse leaves window
document.addEventListener('mouseleave', () => {
  innerCursor.style.opacity = '0';
  outerCursor.style.opacity = '0';
});

document.addEventListener('mouseenter', () => {
  innerCursor.style.opacity = '1';
  outerCursor.style.opacity = '1';
});

// Improved hover effects with better selectors
const hoverables = document.querySelectorAll('a, button, .swiper-slide, [data-hover]');

hoverables.forEach(el => {
  el.addEventListener('mouseenter', () => {
    innerCursor.style.width = '15px';
    innerCursor.style.height = '15px';
    outerCursor.style.width = '35px';
    outerCursor.style.height = '35px';
  });

  el.addEventListener('mouseleave', () => {
    innerCursor.style.width = '10px';
    innerCursor.style.height = '10px';
    outerCursor.style.width = '25px';
    outerCursor.style.height = '25px';
  });
});

// Hide default cursor on swiper container
const swiperContainer = document.querySelector('.project-swiper');
if (swiperContainer) {
  swiperContainer.style.cursor = 'none';
}



/**
 * Service Filter Functionality
 */
document.addEventListener('DOMContentLoaded', function () {
  // Service content data
  const serviceContent = {
    'web-creation': {
      image: 'assets/img/services/creation-website.jpg',
      title: 'Un site web unique qui reflète votre identité',
      content: `
        <p>Nous développons des sites web personnalisés, optimisés pour la performance et le référencement. 
        Que ce soit un <strong>site vitrine</strong> pour présenter vos services, un <strong>site e-commerce</strong> 
        pour vendre en ligne, ou un <strong>portfolio</strong> pour valoriser vos créations, 
        nous transformons votre vision en une plateforme digitale attractive et fonctionnelle.</p>

        <ul>
          <li><i class="bi bi-check-circle"></i> <span>Design moderne, responsive et adapté à votre activité</span></li>
          <li><i class="bi bi-check-circle"></i> <span>Optimisation SEO intégrée pour une meilleure visibilité</span></li>
          <li><i class="bi bi-check-circle"></i> <span>Accompagnement de A à Z, de la conception au lancement</span></li>
        </ul>
        <p>Notre approche du web design combine créativité et stratégie pour créer des sites 
        qui non seulement impressionnent visuellement mais convertissent également vos visiteurs en clients.</p>
    `
  },
    'mobile-apps': {
      image: 'assets/img/services/mobile.jpg',
      title: 'Des solutions mobiles à portée de main',
      content: `
        <p>Nous développons des applications mobiles performantes et évolutives pour Android et iOS, 
        afin d’offrir une expérience fluide à vos utilisateurs et renforcer la présence digitale de votre marque.</p>
        <ul>
          <li><i class="bi bi-check-circle"></i> <span>Applications natives et hybrides</span></li>
          <li><i class="bi bi-check-circle"></i> <span>Développement cross-platform avec <strong>Flutter</strong></span></li>
          <li><i class="bi bi-check-circle"></i> <span>Interface utilisateur intuitive et moderne</span></li>
          <li><i class="bi bi-check-circle"></i> <span>Maintenance et mises à jour continues</span></li>
        </ul>
        <p>Grâce à Flutter, nous créons une seule base de code qui fonctionne sur plusieurs plateformes, 
        ce qui permet de réduire les coûts et d’accélérer le développement tout en garantissant 
        des performances optimales.</p>
      `
    },
    'web-development': {
      image: 'assets/img/services/dev.jpg',
      title: 'Des solutions robustes et évolutives',
      content: `
        <p>Nous développons des applications et plateformes web performantes, sécurisées et adaptées à vos besoins. 
        Notre équipe maîtrise les technologies modernes du web pour offrir des solutions innovantes et durables.</p>
        <ul>
          <li><i class="bi bi-check-circle"></i> <span>Développement avec <strong>HTML, CSS et JavaScript</strong></span></li>
          <li><i class="bi bi-check-circle"></i> <span>Back-end puissant avec <strong>PHP & Laravel</strong></span></li>
          <li><i class="bi bi-check-circle"></i> <span>Front-end dynamique avec <strong>React.js</strong></span></li>
          <li><i class="bi bi-check-circle"></i> <span>Intégration d’API et services tiers</span></li>
          <li><i class="bi bi-check-circle"></i> <span>Solutions scalables et performantes</span></li>
        </ul>
        <p>Grâce à cette expertise technique, nous transformons vos idées en solutions digitales 
        robustes, évolutives et adaptées à la croissance de votre entreprise.</p>
      `
    },
    'graphic-design': {
      image: 'assets/img/services/design.jpg',
      title: 'Un design qui attire et fidélise',
      content: `
        <p>De la création de logos au design complet de votre identité visuelle, nous vous aidons à construire une image professionnelle et mémorable.</p>
        <ul>
          <li><i class="bi bi-check-circle"></i> <span>Logos et chartes graphiques</span></li>
          <li><i class="bi bi-check-circle"></i> <span>Flyers, cartes de visite, affiches</span></li>
          <li><i class="bi bi-check-circle"></i> <span>UI/UX pour sites et applications</span></li>
        </ul>
        <p>Un design qui parle pour votre entreprise avant même les mots.</p>
      `
    },
    'web-selling': {
      image: 'assets/img/services/web-selling.jpg',
      title: 'Un site prêt à l’utilisation dès le premier jour',
      content: `
        <p>Nous proposons des sites web déjà conçus et optimisés, que vous pouvez personnaliser selon vos besoins pour démarrer sans attendre.</p>
        <ul>
          <li><i class="bi bi-check-circle"></i> <span>Sites vitrines, e‑commerce, portfolios disponibles</span></li>
          <li><i class="bi bi-check-circle"></i> <span>Configuration rapide et personnalisable</span></li>
          <li><i class="bi bi-check-circle"></i> <span>Support et accompagnement inclus</span></li>
        </ul>
        <p>Profitez de sites web clé en main, prêts à l’emploi, pour lancer rapidement votre activité en ligne.</p>
      `
    }
  };

  // Service filter functionality
  const serviceLinks = document.querySelectorAll('.services-list a');
  const serviceContentContainer = document.getElementById('service-content');

  serviceLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      // Remove active class from all links
      serviceLinks.forEach(l => l.classList.remove('active'));

      // Add active class to clicked link
      this.classList.add('active');

      // Get service type from data attribute
      const serviceType = this.getAttribute('data-service');

      // Update service content
      if (serviceContent[serviceType]) {
        const service = serviceContent[serviceType];
        serviceContentContainer.innerHTML = `
          <img src="${service.image}" alt="${service.title}" class="img-fluid services-img">
          <h3>${service.title}</h3>
          ${service.content}
        `;

        // Add animation effect
        serviceContentContainer.style.opacity = '0';
        setTimeout(() => {
          serviceContentContainer.style.transition = 'opacity 0.5s ease';
          serviceContentContainer.style.opacity = '1';
        }, 50);
      }
    });
  });
});


// 

/**
 * Real Offer Countdown Timer with actual expiration date : Weboria Only
 */
function initOfferCountdown() {
  const timerElement = document.getElementById('offerTimer');
  if (!timerElement) return;
  
  // ⚠️ MODIFIEZ CETTE DATE AVEC VOTRE VÉRITABLE DATE D'EXPIRATION ⚠️
  // Format: Année-Mois-Jour Heure:Minute:Seconde
  const expirationDate = new Date('2025-09-30T23:59:59');
  
  function updateCountdown() {
    const now = new Date();
    const timeRemaining = expirationDate - now;
    
    // Si le compte à rebours est terminé
    if (timeRemaining <= 0) {
      timerElement.textContent = "OFFRE EXPIREE";
      timerElement.className = "countdown-timer expired";
      return;
    }
    
    // Calculer le temps restant
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
    
    // Formater l'affichage
    let formattedTime;
    if (days > 0) {
      formattedTime = `${days}j ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else {
      formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    timerElement.textContent = formattedTime;
    
    // Styles conditionnels
    timerElement.classList.remove('urgent', 'warning', 'expired');
    
    if (days === 0) {
      if (hours < 24) {
        timerElement.classList.add('urgent');
      } else if (hours < 48) {
        timerElement.classList.add('warning');
      }
    }
  }
  
  // Vérifier si la date d'expiration est déjà passée
  if (new Date() > expirationDate) {
    timerElement.textContent = "OFFRE EXPIREE";
    timerElement.className = "countdown-timer expired";
    return;
  }
  
  // Mettre à jour immédiatement puis toutes les secondes
  updateCountdown();
  const countdownInterval = setInterval(updateCountdown, 1000);
  
  // Nettoyer à la fermeture de la page
  window.addEventListener('beforeunload', () => {
    clearInterval(countdownInterval);
  });
}

// Initialiser le compte à rebours
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initOfferCountdown);
} else {
  initOfferCountdown();
}