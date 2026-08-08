// Animations Script
// Handles: scroll reveals, stats counter, mobile CTA text swap

document.addEventListener('DOMContentLoaded', () => {
  // ===== SCROLL REVEALS =====
  const revealElements = document.querySelectorAll('.css-reveal');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.setAttribute('data-revealed', 'true');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));

  // ===== PRICING STAGGER REVEAL =====
  const pricingItems = document.querySelectorAll('.pricing-stagger-item');
  
  const pricingObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.setAttribute('data-revealed', 'true');
        pricingObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  pricingItems.forEach(item => pricingObserver.observe(item));

  // ===== STATS COUNTER =====
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        const suffix = el.dataset.suffix || '';
        const duration = 2000;
        const startTime = performance.now();

        function updateCounter(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          // Ease out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.round(eased * target);
          
          el.textContent = current + suffix;
          
          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          }
        }

        requestAnimationFrame(updateCounter);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(num => counterObserver.observe(num));

  // ===== MOBILE CTA TEXT SWAP =====
  const ctaSwapEl = document.querySelector('.cta-swap-text');
  if (ctaSwapEl) {
    const phrases = ['Talk to the studio', 'View Rate Sheet', 'Book a Discovery Call'];
    let currentIndex = 0;

    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    setInterval(() => {
      // Add leaving class
      ctaSwapEl.classList.add('is-leaving');
      
      setTimeout(() => {
        // Swap text
        currentIndex = (currentIndex + 1) % phrases.length;
        ctaSwapEl.textContent = phrases[currentIndex];
        
        // Switch to entering
        ctaSwapEl.classList.remove('is-leaving');
        ctaSwapEl.classList.add('is-entering');
        
        // Force reflow
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            ctaSwapEl.classList.remove('is-entering');
          });
        });
      }, 180);
    }, 2600);
  }

  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
// Custom Cursor
document.addEventListener('DOMContentLoaded', () => {
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  document.body.appendChild(cursor);

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  document.addEventListener('mousedown', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
  });

  document.addEventListener('mouseup', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
  });

  // Add hover effect to interactive elements
  const hoverElements = document.querySelectorAll('a, button, [role="button"], .service-card, .industry-card, .pricing-stagger-item');
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
});