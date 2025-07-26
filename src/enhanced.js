// Tambahkan ke main.js

// Mobile Menu Toggle
function initMobileMenu() {
  const mobileMenuButton = document.querySelector('.md\\:hidden button');
  const mobileMenu = document.createElement('div');
  mobileMenu.className = 'mobile-menu';
  mobileMenu.innerHTML = `
    <a href="index.html">Beranda</a>
    <a href="profil.html">Profil</a>
    <a href="informasi.html">Informasi</a>
    <a href="publikasi.html">Publikasi</a>
  `;
  
  if (mobileMenuButton) {
    document.body.appendChild(mobileMenu);
    
    mobileMenuButton.addEventListener('click', function() {
      mobileMenu.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove('active');
      }
    });
  }
}

// Search Functionality
function initSearch() {
  const searchInput = document.querySelector('input[type="search"]');
  if (searchInput) {
    searchInput.addEventListener('input', debounce(function(e) {
      const query = e.target.value.toLowerCase();
      const cards = document.querySelectorAll('.card');
      
      cards.forEach(card => {
        const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
        const content = card.querySelector('p')?.textContent.toLowerCase() || '';
        
        if (title.includes(query) || content.includes(query)) {
          card.style.display = 'block';
          card.classList.add('animate-fade-in');
        } else {
          card.style.display = 'none';
        }
      });
    }, 300));
  }
}

// Debounce function
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

// Lazy Loading Images
function initLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
}

// Back to Top Button
function initBackToTop() {
  const backToTopButton = document.createElement('button');
  backToTopButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
  backToTopButton.className = 'fixed z-50 w-12 h-12 text-white transition-all duration-300 rounded-full shadow-lg opacity-0 pointer-events-none bottom-8 right-8 bg-primary-600 hover:bg-primary-700';
  backToTopButton.id = 'backToTop';
  
  document.body.appendChild(backToTopButton);
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopButton.classList.remove('opacity-0', 'pointer-events-none');
    } else {
      backToTopButton.classList.add('opacity-0', 'pointer-events-none');
    }
  });
  
  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Form Validation
function initFormValidation() {
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const inputs = form.querySelectorAll('input[required], textarea[required]');
      let isValid = true;
      
      inputs.forEach(input => {
        if (!input.value.trim()) {
          input.classList.add('border-red-500');
          isValid = false;
        } else {
          input.classList.remove('border-red-500');
        }
      });
      
      if (isValid) {
        // Show success message
        showNotification('Form berhasil dikirim!', 'success');
        form.reset();
      } else {
        showNotification('Mohon lengkapi semua field yang wajib diisi.', 'error');
      }
    });
  });
}

// Notification System (lanjutan)
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';
  
  notification.className = `fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg text-white z-50 transform translate-x-full transition-transform duration-300 ${bgColor}`;
  notification.innerHTML = `
    <div class="flex items-center gap-3">
      <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
      <span>${message}</span>
      <button class="ml-2 text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">
        <i class="fas fa-times"></i>
      </button>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.classList.remove('translate-x-full');
  }, 100);
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    notification.classList.add('translate-x-full');
    setTimeout(() => notification.remove(), 300);
  }, 5000);
}

// Dark Mode Toggle
function initDarkMode() {
  const darkModeToggle = document.createElement('button');
  darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  darkModeToggle.className = 'fixed z-50 w-12 h-12 text-white transition-colors bg-gray-800 rounded-full shadow-lg bottom-8 left-8 hover:bg-gray-700';
  darkModeToggle.title = 'Toggle Dark Mode';
  
  document.body.appendChild(darkModeToggle);
  
  // Check for saved dark mode preference
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  if (isDarkMode) {
    document.documentElement.classList.add('dark');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }
  
  darkModeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', isDark);
    darkModeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  });
}

// Initialize all functions
document.addEventListener('DOMContentLoaded', function() {
  initMobileMenu();
  initSearch();
  initLazyLoading();
  initBackToTop();
  initFormValidation();
  initDarkMode();
});

// Performance Monitoring
function initPerformanceMonitoring() {
  // Monitor page load time
  window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
    
    // Send to analytics (if implemented)
    if (typeof gtag !== 'undefined') {
      gtag('event', 'page_load_time', {
        value: Math.round(loadTime)
      });
    }
  });
}

// Error Handling
window.addEventListener('error', function(e) {
  console.error('JavaScript Error:', e.error);
  // You can send this to your error tracking service
});

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}
