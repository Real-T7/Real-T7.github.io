(function() {
  const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const hasOptedOut = localStorage.getItem('hideMobileWarning') === 'true';

  if (isMobile && !hasOptedOut) {
    sessionStorage.setItem('previousUrl', window.location.href);
    window.location.href = '/mobile.html';
  }
})();