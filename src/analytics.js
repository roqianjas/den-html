// Google Analytics 4 Integration
function initAnalytics() {
  // Google Analytics
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID'); // Replace with your GA4 ID
  
  // Track page views
  gtag('event', 'page_view', {
    page_title: document.title,
    page_location: window.location.href
  });
}

// Track user interactions
function trackEvent(action, category, label) {
  if (typeof gtag !== 'undefined') {
    gtag('event', action, {
      event_category: category,
      event_label: label
    });
  }
}

// Track downloads
document.querySelectorAll('a[href$=".pdf"], a[href$=".doc"], a[href$=".docx"]').forEach(link => {
  link.addEventListener('click', function() {
    trackEvent('download', 'file', this.href);
  });
});

// Track external links
document.querySelectorAll('a[href^="http"]:not([href*="' + window.location.hostname + '"])').forEach(link => {
  link.addEventListener('click', function() {
    trackEvent('click', 'external_link', this.href);
  });
});
