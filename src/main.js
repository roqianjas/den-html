import './style.css'

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenuClose = document.getElementById('mobile-menu-close');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const mobileMenuPanel = document.getElementById('mobile-menu-panel');
  const mobilePublikasiToggle = document.getElementById('mobile-publikasi-toggle');
  const mobilePublikasiMenu = document.getElementById('mobile-publikasi-menu');
  const mobilePublikasiIcon = document.getElementById('mobile-publikasi-icon');

  // Open mobile menu
  if (mobileMenuButton) {
    mobileMenuButton.addEventListener('click', function() {
      mobileOverlay.classList.remove('hidden');
      setTimeout(() => {
        mobileMenuPanel.classList.add('mobile-menu-open');
      }, 10);
    });
  }

  // Close mobile menu
  function closeMobileMenu() {
    mobileMenuPanel.classList.remove('mobile-menu-open');
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

  // Mobile publikasi accordion
  if (mobilePublikasiToggle) {
    mobilePublikasiToggle.addEventListener('click', function() {
      const isHidden = mobilePublikasiMenu.classList.contains('hidden');
      
      if (isHidden) {
        mobilePublikasiMenu.classList.remove('hidden');
        mobilePublikasiIcon.style.transform = 'rotate(180deg)';
      } else {
        mobilePublikasiMenu.classList.add('hidden');
        mobilePublikasiIcon.style.transform = 'rotate(0deg)';
      }
    });
  }

  // Close mobile menu when clicking on links
  const mobileLinks = document.querySelectorAll('#mobile-menu a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });
});

// Smooth scrolling for navigation links
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
      entry.target.classList.add('animate-fade-in');
    }
  });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.card, section').forEach(el => {
  observer.observe(el);
});

// Mega menu positioning for desktop - IMPROVED
function adjustMegaMenuPosition() {
  const megaMenus = document.querySelectorAll('.mega-menu');
  
  megaMenus.forEach(menu => {
    const rect = menu.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const menuWidth = menu.offsetWidth;
    
    // Reset positioning
    menu.style.left = '50%';
    menu.style.transform = 'translateX(-50%)';
    menu.style.right = 'auto';
    
    // Check if menu overflows viewport
    const menuLeft = rect.left;
    const menuRight = rect.right;
    
    if (menuLeft < 0) {
      // Menu overflows left side
      menu.style.left = '0';
      menu.style.transform = 'translateX(0)';
    } else if (menuRight > viewportWidth) {
      // Menu overflows right side
      menu.style.left = 'auto';
      menu.style.right = '0';
      menu.style.transform = 'translateX(0)';
    }
  });
}

// Call on resize and load
window.addEventListener('resize', adjustMegaMenuPosition);
window.addEventListener('load', adjustMegaMenuPosition);

// Detail page navigation
function setupDetailNavigation() {
  // Back to top button
  const backToTopBtn = document.createElement('button');
  backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  backToTopBtn.className = 'fixed z-50 w-12 h-12 text-white transition-all duration-300 rounded-full shadow-lg opacity-0 pointer-events-none bottom-6 right-6 bg-primary-600 hover:bg-primary-700';
  backToTopBtn.setAttribute('aria-label', 'Back to top');
  document.body.appendChild(backToTopBtn);

  // Show/hide back to top button
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.style.opacity = '1';
      backToTopBtn.style.pointerEvents = 'auto';
    } else {
      backToTopBtn.style.opacity = '0';
      backToTopBtn.style.pointerEvents = 'none';
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

// Table of contents active section highlighting
function setupTableOfContents() {
  const tocLinks = document.querySelectorAll('a[href^="#"]');
  const sections = document.querySelectorAll('h2[id], h3[id]');

  if (sections.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        tocLinks.forEach(link => {
          link.classList.remove('text-primary-600', 'font-semibold');
          link.classList.add('text-gray-600');
        });
        
        const activeLink = document.querySelector(`a[href="#${entry.target.id}"]`);
        if (activeLink) {
          activeLink.classList.remove('text-gray-600');
          activeLink.classList.add('text-primary-600', 'font-semibold');
        }
      }
    });
  }, {
    rootMargin: '-20% 0px -35% 0px'
  });

  sections.forEach(section => {
    observer.observe(section);
  });
}

// Keyboard navigation for accessibility
document.addEventListener('keydown', function(e) {
  // Close mobile menu with Escape key
  if (e.key === 'Escape') {
    const mobileOverlay = document.getElementById('mobile-overlay');
    const mobileMenuPanel = document.getElementById('mobile-menu-panel');
    
    if (mobileOverlay && !mobileOverlay.classList.contains('hidden')) {
      mobileMenuPanel.classList.remove('mobile-menu-open');
      setTimeout(() => {
        mobileOverlay.classList.add('hidden');
      }, 300);
    }
  }
});

// Initialize detail page features
if (window.location.pathname.includes('-detail.html')) {
  document.addEventListener('DOMContentLoaded', () => {
    setupDetailNavigation();
    setupTableOfContents();
  });
}

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

  images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', setupLazyLoading);

// Search functionality (if needed)
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
      // Simulate search API call
      performSearch(query);
    }, 300);
  });
  
  function performSearch(query) {
    // This would typically be an API call
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
        resultElement.className = 'block p-4 border-b border-gray-100 hover:bg-gray-50';
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

// Initialize search
document.addEventListener('DOMContentLoaded', setupSearch);
