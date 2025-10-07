/* creation.js
   Handles accordion, theme toggle, back button and small UI niceties.
*/
(() => {
  // Accordion logic
  const toggles = document.querySelectorAll('.qa-toggle');
  toggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      // close all (single-open behavior)
      toggles.forEach(other => {
        other.setAttribute('aria-expanded', 'false');
        const panel = document.getElementById(other.getAttribute('aria-controls'));
        if (panel) panel.hidden = true;
      });

      // open clicked if it was closed
      if (!expanded) {
        btn.setAttribute('aria-expanded', 'true');
        const panel = document.getElementById(btn.getAttribute('aria-controls'));
        if (panel) panel.hidden = false;
        // focus first focusable element inside panel for accessibility
        const focusable = panel.querySelector('a, button, input, textarea');
        if (focusable) focusable.focus();
      }
    });
  });

  // Theme toggle (persists to localStorage)
  const themeToggle = document.getElementById('toggleTheme');
  const root = document.documentElement;
  const body = document.body;

  function applyTheme(theme){
    if(theme === 'dark'){
      body.classList.add('dark');
      body.classList.remove('light');
      themeToggle.textContent = '☀️ Light';
    } else {
      body.classList.remove('dark');
      body.classList.add('light');
      themeToggle.textContent = '🌙 Dark';
    }
  }

  // init from localStorage
  const stored = localStorage.getItem('site-theme') || 'light';
  applyTheme(stored);

  themeToggle.addEventListener('click', () => {
    const newTheme = body.classList.contains('dark') ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('site-theme', newTheme);
  });

  // Back button (if you want custom behaviour)
  const backBtn = document.getElementById('backBtn');
  if(backBtn){
    backBtn.addEventListener('click', () => {
      // If you want it to go to your index page, change this:
      if (document.referrer) {
        window.history.back();
      } else {
        window.location.href = 'index.html';
      }
    });
  }

  // "Next topic" shortcut
  const nextTopic = document.getElementById('nextTopic');
  if(nextTopic){
    nextTopic.addEventListener('click', () => {
      // adjust path to match your file structure
      window.location.href = 'Bible.html';
    });
  }

  // Respect prefers-reduced-motion: turn off animations if user prefers
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(prefersReduced){
    document.querySelectorAll('*').forEach(el => {
      el.style.transition = 'none';
      el.style.animation = 'none';
    });
  }
})();
// 🫧 Floating Sidebar Interactions
const bubble = document.getElementById('questionBubble');
const sidebar = document.getElementById('questionSidebar');
const closeBtn = document.getElementById('closeSidebar');

bubble.addEventListener('click', () => {
  sidebar.classList.add('open');
});

closeBtn.addEventListener('click', () => {
  sidebar.classList.remove('open');
});

// 🧭 Scroll to Q&A answers
document.querySelectorAll('.question-sidebar li').forEach(li => {
  li.addEventListener('click', () => {
    const targetId = li.getAttribute('data-target');
    const targetButton = document.getElementById(targetId);
    const panelId = targetButton.getAttribute('aria-controls');
    const panel = document.getElementById(panelId);
    
    // open the panel if not open yet
    if (panel && panel.hasAttribute('hidden')) {
      targetButton.click();
    }

    sidebar.classList.remove('open');
    targetButton.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
});

const googleBtn = document.getElementById('googleBtn');
const emailBtn = document.getElementById('emailBtn');
const socialBtn = document.getElementById('socialBtn');
const userQuestion = document.getElementById('userQuestion');

googleBtn.addEventListener('click', () => {
  const q = encodeURIComponent(userQuestion.value.trim());
  if (q) {
    const searchUrl = `https://www.google.com/search?q=Christian+question+about+${q}`;
    window.open(searchUrl, '_blank');
  }
});

emailBtn.addEventListener('click', () => {
  const q = encodeURIComponent(userQuestion.value.trim());
  if (q) {
    const mailto = `mailto:info@christiananswers.com?subject=User Question&body=${q}`;
    window.location.href = mailto;
  }
});

socialBtn.addEventListener('click', () => {
  const q = encodeURIComponent(userQuestion.value.trim());
  if (q) {
    // Example: WhatsApp DM (replace number with your own)
    const whatsapp = `https://wa.me/2348012345678?text=${q}`;
    window.open(whatsapp, '_blank');
  }
});
