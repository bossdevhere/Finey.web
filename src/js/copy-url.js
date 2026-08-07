/* ==========================================================================
   COPY URL & TOAST NOTIFICATION MODULE
   ========================================================================== */

export function initCopyUrl() {
  const copyBtns = document.querySelectorAll('.btn-copy-link');

  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const urlToCopy = btn.getAttribute('data-url') || window.location.href;
      const absoluteUrl = new URL(urlToCopy, window.location.href).href;

      navigator.clipboard.writeText(absoluteUrl).then(() => {
        showToast('Link copied to clipboard! Ready for Play Console.');
      }).catch(() => {
        showToast('Failed to copy. URL: ' + absoluteUrl);
      });
    });
  });
}

export function showToast(message) {
  let toast = document.getElementById('toastNotification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotification';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${escapeHtml(message)}</span>
  `;

  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, function(m) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }[m];
  });
}
