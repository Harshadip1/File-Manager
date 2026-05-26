/**
 * NexusCloud - Core Application
 */
const NexusApp = (function () {
  const NAV_ITEMS = [
    { section: 'Main', links: [
      { href: 'index.html', icon: '🏠', label: 'Dashboard' },
      { href: 'files.html', icon: '📁', label: 'My Files', badge: '400+' },
      { href: 'recent.html', icon: '🕐', label: 'Recent' },
      { href: 'favorites.html', icon: '⭐', label: 'Favorites' },
      { href: 'shared.html', icon: '🔗', label: 'Shared' },
      { href: 'uploads.html', icon: '📤', label: 'Upload Center' }
    ]},
    { section: 'Organize', links: [
      { href: 'folders.html', icon: '📂', label: 'Folders' },
      { href: 'gallery.html', icon: '🖼️', label: 'Media Gallery' },
      { href: 'trash.html', icon: '🗑️', label: 'Trash', badge: '110' },
      { href: 'downloads.html', icon: '📥', label: 'Downloads' }
    ]},
    { section: 'Workspace', links: [
      { href: 'workspace.html', icon: '👥', label: 'Team Workspace' },
      { href: 'sharing.html', icon: '🤝', label: 'File Sharing' },
      { href: 'activity.html', icon: '📋', label: 'Activity Logs' },
      { href: 'notifications.html', icon: '🔔', label: 'Notifications', badge: '130' }
    ]},
    { section: 'Tools', links: [
      { href: 'analytics.html', icon: '📊', label: 'Analytics' },
      { href: 'backup.html', icon: '☁️', label: 'Cloud Backup' },
      { href: 'security.html', icon: '🔒', label: 'Security' },
      { href: 'search.html', icon: '🔍', label: 'Search' }
    ]},
    { section: 'Media', links: [
      { href: 'preview.html', icon: '👁️', label: 'Preview' },
      { href: 'document.html', icon: '📄', label: 'Document Viewer' },
      { href: 'video.html', icon: '🎬', label: 'Video Player' }
    ]},
    { section: 'Account', links: [
      { href: 'profile.html', icon: '👤', label: 'Profile' },
      { href: 'settings.html', icon: '⚙️', label: 'Settings' },
      { href: 'about.html', icon: 'ℹ️', label: 'About' },
      { href: 'contact.html', icon: '✉️', label: 'Contact' }
    ]}
  ];

  function getCurrentPage() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    return path;
  }

  function renderSidebar() {
    const container = document.getElementById('sidebar-nav');
    if (!container) return;
    const current = getCurrentPage();
    let html = '';
    NAV_ITEMS.forEach(section => {
      html += `<div class="nav-section"><div class="nav-section-title">${section.section}</div>`;
      section.links.forEach(link => {
        const active = current === link.href ? ' active' : '';
        const badge = link.badge ? `<span class="nav-badge">${link.badge}</span>` : '';
        html += `<a href="${link.href}" class="nav-link${active}"><span class="icon">${link.icon}</span>${link.label}${badge}</a>`;
      });
      html += '</div>';
    });
    container.innerHTML = html;
  }

  function renderParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    for (let i = 0; i < 30; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.left = Math.random() * 100 + '%';
      p.style.animationDelay = Math.random() * 15 + 's';
      p.style.animationDuration = (10 + Math.random() * 10) + 's';
      container.appendChild(p);
    }
  }

  function initSidebar() {
    const toggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    if (toggle && sidebar) {
      toggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        overlay?.classList.toggle('active');
      });
      overlay?.addEventListener('click', () => {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
      });
    }
  }

  function initReveal() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  function toast(message, type = 'info') {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    const icons = { info: 'ℹ️', success: '✅', error: '❌', warning: '⚠️' };
    const t = document.createElement('div');
    t.className = 'toast';
    t.innerHTML = `<span>${icons[type] || icons.info}</span><span>${message}</span>`;
    container.appendChild(t);
    setTimeout(() => t.remove(), 4000);
  }

  function formatDate(iso) {
    const d = new Date(iso);
    const now = new Date();
    const diff = (now - d) / 1000;
    if (diff < 60) return 'Just now';
    if (diff < 3600) return Math.floor(diff / 60) + ' min ago';
    if (diff < 86400) return Math.floor(diff / 3600) + ' hours ago';
    if (diff < 604800) return Math.floor(diff / 86400) + ' days ago';
    return d.toLocaleDateString();
  }

  function initKeyboardShortcuts() {
    document.addEventListener('keydown', e => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
          case 'k':
            e.preventDefault();
            document.querySelector('[data-global-search]')?.focus();
            break;
          case 'u':
            e.preventDefault();
            window.location.href = 'uploads.html';
            break;
          case 'f':
            if (!e.shiftKey) {
              e.preventDefault();
              window.location.href = 'favorites.html';
            }
            break;
        }
      }
    });
  }

  function initContextMenu() {
    let menu = document.querySelector('.context-menu');
    if (!menu) {
      menu = document.createElement('div');
      menu.className = 'context-menu';
      menu.innerHTML = `
        <button data-action="open">📂 Open</button>
        <button data-action="download">📥 Download</button>
        <button data-action="share">🔗 Share</button>
        <button data-action="favorite">⭐ Favorite</button>
        <button data-action="rename">✏️ Rename</button>
        <button data-action="delete">🗑️ Delete</button>
      `;
      document.body.appendChild(menu);
    }
    document.addEventListener('contextmenu', e => {
      const card = e.target.closest('[data-file-id]');
      if (!card) return;
      e.preventDefault();
      menu.style.left = e.clientX + 'px';
      menu.style.top = e.clientY + 'px';
      menu.classList.add('active');
      menu.dataset.fileId = card.dataset.fileId;
    });
    document.addEventListener('click', () => menu.classList.remove('active'));
    menu.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        toast(`${btn.textContent.trim()} action (demo)`);
        menu.classList.remove('active');
      });
    });
  }

  function init() {
    renderSidebar();
    renderParticles();
    initSidebar();
    initReveal();
    initKeyboardShortcuts();
    initContextMenu();
    NexusThemes.init();
    NexusSearch.initGlobalSearch();
    document.documentElement.setAttribute('data-theme', NexusStorage.getTheme());
  }

  return {
    init,
    toast,
    formatDate,
    getCurrentPage,
    NAV_ITEMS
  };
})();

document.addEventListener('DOMContentLoaded', () => NexusApp.init());
