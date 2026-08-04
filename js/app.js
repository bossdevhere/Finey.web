/* ==========================================================================
   FINEY WEB APPLICATION INTERACTIVE LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initPolicyTabs();
  initFaqAccordion();
  initLiveDemo();
  initContactForm();
  initCopyButtons();
});

/* --------------------------------------------------
 * 1. Dark/Light Mode Theme Toggle
 * -------------------------------------------------- */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const storedTheme = localStorage.getItem('finey_theme') || 'dark';

  document.documentElement.setAttribute('data-theme', storedTheme);
  updateThemeIcon(storedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('finey_theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }
}

function updateThemeIcon(theme) {
  const themeIcon = document.getElementById('themeIcon');
  if (!themeIcon) return;

  if (theme === 'dark') {
    themeIcon.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
    `;
  } else {
    themeIcon.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    `;
  }
}

/* --------------------------------------------------
 * 2. Policy Tab Switcher
 * -------------------------------------------------- */
function initPolicyTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const policyPanes = document.querySelectorAll('.policy-pane');

  if (!tabBtns.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      tabBtns.forEach(b => b.classList.remove('active'));
      policyPanes.forEach(pane => pane.classList.remove('active'));

      btn.classList.add('active');
      const targetPane = document.getElementById(`policy-${targetTab}`);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------
 * 3. FAQ Accordion Toggle
 * -------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      
      // Close all items
      faqItems.forEach(i => i.classList.remove('open'));

      // If clicked item was not open, open it
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });
}

/* --------------------------------------------------
 * 4. Interactive Live Expense Calculator Demo
 * -------------------------------------------------- */
function initLiveDemo() {
  const demoForm = document.getElementById('demoExpenseForm');
  const expenseList = document.getElementById('demoExpenseList');
  const totalDisplay = document.getElementById('demoTotalDisplay');

  if (!demoForm || !expenseList || !totalDisplay) return;

  let demoExpenses = [
    { title: 'Grocery Shopping', category: 'Food & Dining', amount: 48.50, date: 'Today' },
    { title: 'Electricity Bill', category: 'Utilities & Bills', amount: 85.00, date: 'Yesterday' },
    { title: 'Coffee & Snacks', category: 'Food & Dining', amount: 12.40, date: '2 days ago' }
  ];

  function renderDemoExpenses() {
    expenseList.innerHTML = '';
    let total = 0;

    demoExpenses.forEach(item => {
      total += item.amount;
      const li = document.createElement('li');
      li.className = 'expense-item';
      li.innerHTML = `
        <div class="expense-cat">
          <span class="expense-cat-badge"></span>
          <div>
            <div>${escapeHtml(item.title)}</div>
            <small style="color: var(--text-muted); font-weight: normal;">${escapeHtml(item.category)} • ${item.date}</small>
          </div>
        </div>
        <div class="expense-amount">-$${item.amount.toFixed(2)}</div>
      `;
      expenseList.appendChild(li);
    });

    totalDisplay.textContent = `$${total.toFixed(2)}`;
  }

  renderDemoExpenses();

  demoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const titleInput = document.getElementById('demoTitle');
    const amountInput = document.getElementById('demoAmount');
    const categorySelect = document.getElementById('demoCategory');

    const title = titleInput.value.trim() || 'Expense Item';
    const amount = parseFloat(amountInput.value);

    if (isNaN(amount) || amount <= 0) {
      showToast('Please enter a valid amount');
      return;
    }

    demoExpenses.unshift({
      title,
      category: categorySelect.value,
      amount,
      date: 'Just now'
    });

    renderDemoExpenses();
    titleInput.value = '';
    amountInput.value = '';
    showToast('Expense recorded! (Offline Hive storage simulation)');
  });
}

/* --------------------------------------------------
 * 5. Contact Form Handler
 * -------------------------------------------------- */
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const message = document.getElementById('contactMessage').value.trim();

    if (!name || !email || !message) {
      showToast('Please fill out all fields.');
      return;
    }

    showToast('Thank you! Your support ticket has been logged.');
    contactForm.reset();
  });
}

/* --------------------------------------------------
 * 6. Copy URL & Policy Helpers
 * -------------------------------------------------- */
function initCopyButtons() {
  const copyPolicyBtns = document.querySelectorAll('.btn-copy-link');

  copyPolicyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const urlToCopy = btn.getAttribute('data-url') || window.location.href;
      navigator.clipboard.writeText(urlToCopy).then(() => {
        showToast('Link copied to clipboard! Ready for Play Store / App Store Console.');
      }).catch(() => {
        showToast('Failed to copy. URL: ' + urlToCopy);
      });
    });
  });
}

/* --------------------------------------------------
 * Toast Notification Utility
 * -------------------------------------------------- */
function showToast(message) {
  let toast = document.getElementById('toastNotification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotification';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
