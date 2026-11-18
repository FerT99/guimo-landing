/**
 * Guimo Landing Page — Interactive Behaviors
 * Clean Look Edition
 */

document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================================================
     1. MOBILE NAVIGATION TOGGLE
     ========================================================================== */
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mainNav = document.getElementById('mainNav');

  if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
    });

    mainNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ==========================================================================
     2. TESTIMONIALS CAROUSEL
     ========================================================================== */
  const testimonials = [
    {
      quote:
        '“Me encantó porque hemos adaptado un sillón para Hasen pero no se puede sentar con nosotros en la mesa a la hora de comer, con este asiento podemos estar todos juntos como familia en el comedor”',
      author: '-Lili Arzate',
      role: '(Mamá de Hasen 5 años)',
      image: 'assets/images/testimonial-hasen.png',
    },
    {
      quote:
        '“Lo que más valoramos de Guimo es que sus módulos crecen junto con Mateo. Su fisioterapeuta pudo ajustar el soporte lumbar en minutos y ahora mantiene una postura cómoda y segura toda la tarde.”',
      author: '-Mariana Gómez',
      role: '(Mamá de Mateo 7 años)',
      image: 'assets/images/testimonial-hasen.png',
    },
    {
      quote:
        '“Como especialista en rehabilitación pediátrica, Guimo me permite personalizar la curva lumbar de cada paciente sin equipos pesados, facilitando que el tratamiento postural continúe en casa.”',
      author: '-Fisioterapeuta Elena Barrón',
      role: '(Especialista Certificada en Querétaro)',
      image: 'assets/images/testimonial-hasen.png',
    },
    {
      quote:
        '“Es ligero, fácil de colocar en cualquier silla de nuestra casa y nos da la tranquilidad de que Sofía está bien sujeta y alineada mientras juega o dibuja con sus hermanos.”',
      author: '-Carlos y Fernanda Ruiz',
      role: '(Papás de Sofía 4 años)',
      image: 'assets/images/testimonial-hasen.png',
    },
  ];

  let currentSlide = 0;
  const quoteEl = document.getElementById('testimonialQuote');
  const authorEl = document.getElementById('testimonialAuthor');
  const dots = document.querySelectorAll('.carousel-dot');
  const prevBtn = document.getElementById('prevTestimonial');
  const nextBtn = document.getElementById('nextTestimonial');

  function renderTestimonial(index) {
    currentSlide = (index + testimonials.length) % testimonials.length;
    const item = testimonials[currentSlide];

    if (quoteEl && authorEl) {
      quoteEl.style.opacity = '0.35';
      setTimeout(() => {
        quoteEl.textContent = item.quote;
        authorEl.innerHTML = `<strong>${item.author}</strong> <span>${item.role}</span>`;
        quoteEl.style.opacity = '1';
      }, 140);
    }

    dots.forEach((dot, idx) => {
      const isActive = idx === currentSlide;
      dot.classList.toggle('active', isActive);
      dot.setAttribute('aria-selected', String(isActive));
    });
  }

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const index = Number(dot.getAttribute('data-index') || 0);
      renderTestimonial(index);
    });
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', () => renderTestimonial(currentSlide - 1));
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => renderTestimonial(currentSlide + 1));
  }

  /* ==========================================================================
     3. DISTRIBUTOR LOCATOR SEARCH & MAP PIN SYNC
     ========================================================================== */
  const searchInput = document.getElementById('citySearchInput');
  const searchBtn = document.getElementById('searchBtn');
  const distributorCards = document.querySelectorAll('.distributor-card');
  const filterChips = document.querySelectorAll('.filter-chip');
  const mapPins = document.querySelectorAll('.map-pin-btn');
  const noResultsMsg = document.getElementById('noResultsMsg');

  function normalizeText(str) {
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  }

  function filterDistributors(query) {
    const cleanQuery = normalizeText(query);
    let visibleCount = 0;

    distributorCards.forEach((card) => {
      const keywords = normalizeText(card.getAttribute('data-keywords') || '');
      const textContent = normalizeText(card.textContent || '');
      const matches =
        !cleanQuery ||
        keywords.includes(cleanQuery) ||
        textContent.includes(cleanQuery);

      card.style.display = matches ? 'flex' : 'none';
      if (matches) visibleCount++;
    });

    if (noResultsMsg) {
      noResultsMsg.hidden = visibleCount > 0;
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      filterDistributors(e.target.value);
    });
  }

  if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', () => {
      filterDistributors(searchInput.value);
    });
  }

  filterChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      filterChips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      const query = chip.getAttribute('data-query') || '';
      if (searchInput) {
        searchInput.value = query;
      }
      filterDistributors(query);
    });
  });

  // Synchronize Map Pins and Specialist Cards
  function highlightDistributor(targetId) {
    distributorCards.forEach((card) => {
      card.classList.toggle('active', card.id === targetId);
    });
    mapPins.forEach((pin) => {
      pin.classList.toggle(
        'active',
        pin.getAttribute('data-target') === targetId
      );
    });
  }

  mapPins.forEach((pin) => {
    pin.addEventListener('click', () => {
      const targetId = pin.getAttribute('data-target');
      if (targetId) {
        highlightDistributor(targetId);
      }
    });
  });

  distributorCards.forEach((card) => {
    card.addEventListener('click', () => {
      highlightDistributor(card.id);
    });
  });
});
