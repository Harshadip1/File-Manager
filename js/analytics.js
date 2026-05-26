/**
 * Analytics charts rendering
 */
const NexusAnalytics = (function () {
  function renderBarChart(container, data, key = 'value') {
    if (!container) return;
    const max = Math.max(...data.map(d => d[key]));
    container.innerHTML = `
      <div class="chart-bars">
        ${data.map(d => `
          <div class="chart-bar" style="height:${(d[key] / max) * 100}%" title="${d.month || d.label}: ${d[key]}"></div>
        `).join('')}
      </div>
      <div class="chart-labels">
        ${data.map(d => `<span>${d.month || d.label || d.hour}</span>`).join('')}
      </div>
    `;
  }

  function renderDonut(container, percent, label) {
    if (!container) return;
    const colors = NexusData.analytics.fileTypes.map(t => t.color);
    let gradient = '';
    let acc = 0;
    NexusData.analytics.fileTypes.forEach((t, i) => {
      gradient += `${t.color} ${acc}% ${acc + t.percent}%`;
      acc += t.percent;
      if (i < NexusData.analytics.fileTypes.length - 1) gradient += ', ';
    });
    container.innerHTML = `
      <div class="donut-chart" style="background:conic-gradient(${gradient})">
        <div class="donut-center">
          <strong>${percent}%</strong>
          <span>${label}</span>
        </div>
      </div>
      <div class="legend">
        ${NexusData.analytics.fileTypes.map(t => `
          <div class="legend-item">
            <span class="legend-dot" style="background:${t.color}"></span>
            ${t.type} — ${t.percent}% (${t.size})
          </div>
        `).join('')}
      </div>
    `;
  }

  function renderStorageBreakdown(container) {
    if (!container) return;
    container.innerHTML = NexusData.analytics.fileTypes.map(t => `
      <div class="storage-item">
        <div class="storage-item-label">
          <span class="legend-dot" style="background:${t.color}"></span>
          ${t.type}
        </div>
        <div class="progress-bar">
          <div class="progress-fill" style="width:${t.percent}%;background:${t.color}"></div>
        </div>
        <span style="font-size:0.8rem;min-width:60px">${t.size}</span>
      </div>
    `).join('');
  }

  function renderActivityChart(container) {
    const data = NexusData.analytics.activityByHour;
    renderBarChart(container, data.map(d => ({ month: d.hour + 'h', value: d.activity })));
  }

  function renderStats() {
    const a = NexusData.analytics;
    const map = {
      'stat-storage': a.storageUsed + ' GB',
      'stat-files': a.filesTotal.toLocaleString(),
      'stat-uploads': a.uploadsThisMonth.toLocaleString(),
      'stat-downloads': a.downloadsThisMonth.toLocaleString()
    };
    Object.entries(map).forEach(([id, val]) => {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    });
    const progress = document.getElementById('storage-progress');
    if (progress) progress.style.width = a.storagePercent + '%';
  }

  function init() {
    renderStats();
    renderBarChart(document.getElementById('uploads-chart'), NexusData.analytics.monthlyUploads);
    renderBarChart(document.getElementById('downloads-chart'), NexusData.analytics.monthlyDownloads);
    renderDonut(document.getElementById('type-donut'), NexusData.analytics.storagePercent, 'Used');
    renderStorageBreakdown(document.getElementById('storage-breakdown'));
    renderActivityChart(document.getElementById('activity-chart'));

    const topBody = document.getElementById('top-files-body');
    if (topBody) {
      topBody.innerHTML = NexusData.analytics.topFiles.map((f, i) => `
        <tr>
          <td>${i + 1}</td>
          <td>${f.icon} ${f.name}</td>
          <td>${f.downloads}</td>
          <td>${f.views}</td>
          <td>${f.sizeFormatted}</td>
        </tr>
      `).join('');
    }
  }

  return { init, renderBarChart, renderDonut };
})();
