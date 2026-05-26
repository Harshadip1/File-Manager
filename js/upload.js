/**
 * Upload simulation - drag & drop, queue, progress
 */
const NexusUpload = (function () {
  const queue = [];

  function initUploadZone() {
    const zone = document.getElementById('upload-zone');
    if (!zone) return;

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(evt => {
      zone.addEventListener(evt, e => {
        e.preventDefault();
        e.stopPropagation();
      });
    });

    zone.addEventListener('dragover', () => zone.classList.add('dragover'));
    zone.addEventListener('dragleave', () => zone.classList.remove('dragover'));
    zone.addEventListener('drop', e => {
      zone.classList.remove('dragover');
      handleFiles(e.dataTransfer.files);
    });

    zone.addEventListener('click', () => {
      const input = document.createElement('input');
      input.type = 'file';
      input.multiple = true;
      input.onchange = () => handleFiles(input.files);
      input.click();
    });
  }

  function handleFiles(fileList) {
    Array.from(fileList).forEach((file, i) => {
      const item = {
        id: 'upload-live-' + Date.now() + '-' + i,
        name: file.name,
        size: NexusData.formatSize(file.size),
        progress: 0,
        status: 'uploading'
      };
      queue.push(item);
      simulateUpload(item);
    });
    renderQueue();
    NexusApp.toast(`Added ${fileList.length} file(s) to queue`, 'success');
  }

  function simulateUpload(item) {
    const interval = setInterval(() => {
      item.progress += NexusData.randomInt(5, 25);
      if (item.progress >= 100) {
        item.progress = 100;
        item.status = 'completed';
        clearInterval(interval);
        NexusApp.toast(`${item.name} uploaded`, 'success');
      }
      renderQueue();
    }, 400);
  }

  function renderQueue() {
    const container = document.getElementById('upload-queue');
    if (!container) return;
    const all = [...queue, ...NexusData.uploads.slice(0, 30)];
    container.innerHTML = all.map(u => `
      <div class="glass-card upload-item reveal" style="margin-bottom:0.75rem">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem">
          <strong style="font-size:0.9rem">${u.name}</strong>
          <span class="badge ${u.status === 'completed' ? 'badge-success' : u.status === 'failed' ? 'badge-danger' : 'badge-primary'}">${u.status}</span>
        </div>
        <div class="progress-bar" style="height:8px;margin-bottom:0.35rem">
          <div class="progress-fill" style="width:${u.progress}%"></div>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:0.75rem;color:var(--text-muted)">
          <span>${u.size}</span>
          <span>${u.progress}% ${u.speed ? '• ' + u.speed : ''}</span>
        </div>
      </div>
    `).join('');
    document.querySelectorAll('.reveal').forEach(el => {
      if (!el.classList.contains('visible')) el.classList.add('visible');
    });
  }

  function renderHistory() {
    const tbody = document.getElementById('upload-history-body');
    if (!tbody) return;
    tbody.innerHTML = NexusData.uploads.map(u => `
      <tr>
        <td>${u.name}</td>
        <td>${u.size}</td>
        <td><span class="badge badge-${u.status === 'completed' ? 'success' : u.status === 'failed' ? 'danger' : 'warning'}">${u.status}</span></td>
        <td>${NexusApp.formatDate(u.started)}</td>
        <td>${u.progress}%</td>
      </tr>
    `).join('');
  }

  function init() {
    initUploadZone();
    renderQueue();
    renderHistory();
  }

  return { init, handleFiles, renderQueue };
})();
