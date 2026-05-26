/**
 * File preview system
 */
const NexusPreview = (function () {
  function getFileFromUrl() {
    const id = new URLSearchParams(window.location.search).get('id');
    return NexusData.files.find(f => f.id === id) || NexusData.files[0];
  }

  function renderPreview() {
    const file = getFileFromUrl();
    const title = document.getElementById('preview-title');
    const main = document.getElementById('preview-content');
    const meta = document.getElementById('preview-meta');
    if (title) title.textContent = file.name;
    if (meta) {
      meta.innerHTML = `
        <p><strong>Type:</strong> ${file.type}</p>
        <p><strong>Size:</strong> ${file.sizeFormatted}</p>
        <p><strong>Owner:</strong> ${file.owner}</p>
        <p><strong>Uploaded:</strong> ${new Date(file.uploaded).toLocaleString()}</p>
        <p><strong>Folder:</strong> ${file.folder}</p>
        <p><strong>Downloads:</strong> ${file.downloads}</p>
      `;
    }
    if (!main) return;

    let content = '';
    switch (file.type) {
      case 'image':
        content = `<div class="masonry-placeholder" style="width:600px;max-width:100%;aspect-ratio:16/10;font-size:5rem">${file.icon}</div>`;
        break;
      case 'video':
        content = `<div class="video-player-wrap"><div style="display:flex;align-items:center;justify-content:center;height:100%;font-size:4rem">${file.icon}</div><div class="video-controls"><button class="btn btn-ghost">▶ Play</button><span style="flex:1;height:4px;background:rgba(255,255,255,0.3);border-radius:2px"><span style="display:block;width:35%;height:100%;background:var(--primary)"></span></span><span>12:34 / 45:00</span></div></div>`;
        break;
      case 'audio':
        content = `<div class="audio-player"><div style="font-size:3rem">${file.icon}</div><h3>${file.name}</h3><div class="audio-waveform">${Array(24).fill(0).map((_, i) => `<div class="wave-bar" style="height:${20 + Math.random() * 80}%"></div>`).join('')}</div><button class="btn btn-primary">▶ Play</button></div>`;
        break;
      case 'pdf':
      case 'doc':
        content = `<div class="preview-document"><h1>${file.name.replace(/\.[^.]+$/, '')}</h1><p style="color:#666;margin:1rem 0">Demo document preview content. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p><p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p><p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p></div>`;
        break;
      default:
        content = `<div class="glass-card" style="padding:3rem;text-align:center"><span style="font-size:5rem">${file.icon}</span><h3 style="margin-top:1rem">${file.name}</h3><p style="color:var(--text-muted)">Preview not available for this file type</p></div>`;
    }
    main.innerHTML = content;

    const comments = document.getElementById('preview-comments');
    if (comments) {
      comments.innerHTML = Array(8).fill(0).map((_, i) => `
        <div class="comment">
          <div class="comment-avatar">${String.fromCharCode(65 + i)}</div>
          <div>
            <strong>${NexusData.random(NexusData.files.map(f => f.owner))}</strong>
            <p style="font-size:0.85rem;color:var(--text-secondary)">Great file! Reviewed section ${i + 1}.</p>
            <time style="font-size:0.75rem;color:var(--text-muted)">${NexusApp.formatDate(new Date().toISOString())}</time>
          </div>
        </div>
      `).join('');
    }
  }

  function init() {
    renderPreview();
    document.querySelector('[data-close-preview]')?.addEventListener('click', () => {
      window.location.href = 'files.html';
    });
  }

  return { init, getFileFromUrl, renderPreview };
})();
