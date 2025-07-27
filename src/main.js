import './style.css'

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenuClose = document.getElementById('mobile-menu-close');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const mobileMenuPanel = document.getElementById('mobile-menu-panel');

  // Open mobile menu
  if (mobileMenuButton) {
    mobileMenuButton.addEventListener('click', function() {
      mobileOverlay.classList.remove('hidden');
      setTimeout(() => {
        mobileMenuPanel.classList.remove('translate-x-full');
      }, 10);
    });
  }

  // Close mobile menu
  function closeMobileMenu() {
    mobileMenuPanel.classList.add('translate-x-full');
    setTimeout(() => {
      mobileOverlay.classList.add('hidden');
    }, 300);
  }

  if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', closeMobileMenu);
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', function(e) {
      if (e.target === mobileOverlay) {
        closeMobileMenu();
      }
    });
  }

  // Close mobile menu when clicking on links
  const mobileLinks = document.querySelectorAll('#mobile-menu a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Mobile Informasi Dropdown
  const mobileInformasiButton = document.getElementById('mobile-informasi-button');
  const mobileInformasiMenu = document.getElementById('mobile-informasi-menu');
  const mobileInformasiIcon = document.getElementById('mobile-informasi-icon');

  if (mobileInformasiButton) {
    mobileInformasiButton.addEventListener('click', function() {
      const isHidden = mobileInformasiMenu.classList.contains('hidden');
      
      if (isHidden) {
        mobileInformasiMenu.classList.remove('hidden');
        mobileInformasiIcon.classList.add('rotate-180');
      } else {
        mobileInformasiMenu.classList.add('hidden');
        mobileInformasiIcon.classList.remove('rotate-180');
      }
    });
  }
});

// Header scroll effect
window.addEventListener('scroll', function() {
  const header = document.querySelector('header');
  if (window.scrollY > 100) {
    header.classList.add('shadow-lg');
  } else {
    header.classList.remove('shadow-lg');
  }
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('opacity-100', 'translate-y-0');
      entry.target.classList.remove('opacity-0', 'translate-y-4');
    }
  });
}, observerOptions);

// Observe all cards and sections for animation
document.querySelectorAll('section > div > div > div').forEach(el => {
  el.classList.add('opacity-0', 'translate-y-4', 'transition-all', 'duration-700');
  observer.observe(el);
});

// Back to top button
function setupBackToTop() {
  const backToTopBtn = document.createElement('button');
  backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  backToTopBtn.className = 'fixed z-50 w-12 h-12 text-white transition-all duration-300 rounded-full shadow-lg opacity-0 pointer-events-none bg-den-secondary hover:bg-den-secondary/90 bottom-6 right-6';
  backToTopBtn.setAttribute('aria-label', 'Back to top');
  document.body.appendChild(backToTopBtn);

  // Show/hide back to top button
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
      backToTopBtn.classList.add('opacity-100');
    } else {
      backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
      backToTopBtn.classList.remove('opacity-100');
    }
  });

  // Smooth scroll to top
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Keyboard navigation for accessibility
document.addEventListener('keydown', function(e) {
  // Close mobile menu with Escape key
  if (e.key === 'Escape') {
    const mobileOverlay = document.getElementById('mobile-overlay');
    const mobileMenuPanel = document.getElementById('mobile-menu-panel');
    
    if (mobileOverlay && !mobileOverlay.classList.contains('hidden')) {
      mobileMenuPanel.classList.add('translate-x-full');
      setTimeout(() => {
        mobileOverlay.classList.add('hidden');
      }, 300);
    }

  }
});

// Lazy loading for images
function setupLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('opacity-0');
        img.classList.add('opacity-100');
        observer.unobserve(img);
      }
    });
  });

  images.forEach(img => {
    img.classList.add('opacity-0', 'transition-opacity', 'duration-300');
    imageObserver.observe(img);
  });
}

// Search functionality
function setupSearch() {
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  
  if (!searchInput || !searchResults) return;
  
  let searchTimeout;
  
  searchInput.addEventListener('input', function(e) {
    clearTimeout(searchTimeout);
    const query = e.target.value.trim();
    
    if (query.length < 2) {
      searchResults.classList.add('hidden');
      return;
    }
    
    searchTimeout = setTimeout(() => {
      performSearch(query);
    }, 300);
  });
  
  function performSearch(query) {
    console.log('Searching for:', query);
    
    // Mock results
    const mockResults = [
      { title: 'Policy Brief: Economic Recovery', url: '#' },
      { title: 'Strategic Study: Digital Economy', url: '#' },
      { title: 'Economic Indicators Q4 2024', url: '#' }
    ];
    
    displaySearchResults(mockResults);
  }
  
  function displaySearchResults(results) {
    searchResults.innerHTML = '';
    
    if (results.length === 0) {
      searchResults.innerHTML = '<p class="p-4 text-gray-500">No results found</p>';
    } else {
      results.forEach(result => {
        const resultElement = document.createElement('a');
        resultElement.href = result.url;
        resultElement.className = 'block p-4 transition-colors border-b border-gray-100 hover:bg-gray-50';
        resultElement.innerHTML = `<h4 class="font-medium text-gray-900">${result.title}</h4>`;
        searchResults.appendChild(resultElement);
      });
    }
    
    searchResults.classList.remove('hidden');
  }
  
  // Close search results when clicking outside
  document.addEventListener('click', function(e) {
    if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
      searchResults.classList.add('hidden');
    }
  });
}

// Card hover effects
function setupCardEffects() {
  const cards = document.querySelectorAll('.shadow-lg');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.classList.add('shadow-xl', 'scale-105');
      this.classList.remove('shadow-lg');
    });
    
    card.addEventListener('mouseleave', function() {
      this.classList.remove('shadow-xl', 'scale-105');
      this.classList.add('shadow-lg');
    });
  });
}

// Initialize all functions
document.addEventListener('DOMContentLoaded', () => {
  setupBackToTop();
  setupLazyLoading();
  setupSearch();
  setupCardEffects();
});

// Performance optimization - Debounce scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debounce to scroll handler
const debouncedScrollHandler = debounce(() => {
  const header = document.querySelector('header');
  if (window.scrollY > 100) {
    header.classList.add('shadow-lg');
  } else {
    header.classList.remove('shadow-lg');
  }
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

document.addEventListener('DOMContentLoaded', () => {
  setupBackToTop();
  setupLazyLoading();
  setupSearch();
  setupCardEffects();
});