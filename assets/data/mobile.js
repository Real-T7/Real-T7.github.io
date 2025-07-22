(function() {
  const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const hasOptedOut = localStorage.getItem('hideMobileWarning') === 'true';
  const hasSessionOptOut = sessionStorage.getItem('skipMobileWarning') === 'true';
  const isWarningPage = window.location.pathname === '/mobile.html';

  if (isMobile && !hasOptedOut && !hasSessionOptOut && !isWarningPage) {
    sessionStorage.setItem('previousUrl', window.location.href);
    window.location.href = '/mobile.html';
  }
})();