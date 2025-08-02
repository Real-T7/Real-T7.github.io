(function() {
  const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const hasOptedOut = localStorage.getItem('hide-mobile-warning') === 'true';
  const hasSessionOptOut = sessionStorage.getItem('skip-mobile-warning') === 'true';
  const isWarningPage = window.location.pathname === '/html/mobile/';

  if (isMobile && !hasOptedOut && !hasSessionOptOut && !isWarningPage) {
    sessionStorage.setItem('previous-url', window.location.href);
    window.location.href = '/html/mobile/';
  }
})();