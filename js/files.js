/**
 * File rendering, grid/list views, selection
 */
const NexusFiles = (function () {
  let selectedIds = new Set();
  let currentView = 'grid';

  function renderFileCard(file) {
    const isFav = NexusStorage.isFavorite(file.id) || file.favorite;
    return `
      <div class="file-card" data-file-id="${file.id}" data-file-type="${file.type}">
        <div class="file-icon" style="background:${file.color}22;color:${file.color}">${file.icon}</div>
        <div class="file-name" title="${file.name}">${file.name}</div>
        <div class="file-meta">${file.sizeFormatted}<br>${NexusApp.formatDate(file.uploaded)}<br>${file.owner}</div>
        <div class="file-actions">
          <button class="file-action-btn" data-fav="${file.id}" title="Favorite">${isFav ? '⭐' : '☆'}</button>
          <button class="file-action-btn" data-share="${file.id}" title="Share">🔗</button>
          <button class="file-action-btn" data-preview="${file.id}" title="Preview">👁️</button>
        </div>
      </div>
    `;
  }

  function renderFileRow(file) {
    const isFav = NexusStorage.isFavorite(file.id) || file.favorite;
    return `
      <tr data-file-id="${file.id}">
        <td><input type="checkbox" class="file-checkbox" data-id="${file.id}"></td>
        <td><span style="font-size:1.25rem">${file.icon}</span> ${file.name}</td>
        <td><span class="badge badge-primary">${file.type}</span></td>
        <td>${file.sizeFormatted}</td>
        <td>${NexusApp.formatDate(file.uploaded)}</td>
        <td>${file.owner}</td>
        <td>${file.folder}</td>
        <td>
          <button class="file-action-btn" data-fav="${file.id}">${isFav ? '⭐' : '☆'}</button>
          <button class="file-action-btn" data-share="${file.id}">🔗</button>
          <button class="file-action-btn" data-preview="${file.id}">👁️</button>
        </td>
      </tr>
    `;
  }

  function renderGrid(container, files, limit = null) {
    if (!container) return;
    const list = limit ? files.slice(0, limit) : files;
    container.innerHTML = list.map(renderFileCard).join('');
    bindFileEvents(container);
  }

  function renderTable(tbody, files, limit = null) {
    if (!tbody) return;
    const list = limit ? files.slice(0, limit) : files;
    tbody.innerHTML = list.map(renderFileRow).join('');
    bindFileEvents(tbody.closest('table') || tbody);
  }

  function bindFileEvents(container) {
    container.querySelectorAll('[data-fav]').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const id = btn.dataset.fav;
        NexusStorage.toggleFavorite(id);
        btn.textContent = NexusStorage.isFavorite(id) ? '⭐' : '☆';
        NexusApp.toast('Favorite updated', 'success');
      });
    });
    container.querySelectorAll('[data-share]').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        NexusApp.toast('Share link copied (demo)', 'success');
      });
    });
    container.querySelectorAll('[data-preview]').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        window.location.href = 'preview.html?id=' + btn.dataset.preview;
      });
    });
    container.querySelectorAll('.file-card').forEach(card => {
      card.addEventListener('click', e => {
        if (e.target.closest('button')) return;
        if (e.ctrlKey || e.metaKey) {
          card.classList.toggle('selected');
          const id = card.dataset.fileId;
          if (card.classList.contains('selected')) selectedIds.add(id);
          else selectedIds.delete(id);
          updateSelectionBar();
        } else {
          window.location.href = 'preview.html?id=' + card.dataset.fileId;
        }
      });
    });
    container.querySelectorAll('.file-checkbox').forEach(cb => {
      cb.addEventListener('change', () => {
        if (cb.checked) selectedIds.add(cb.dataset.id);
        else selectedIds.delete(cb.dataset.id);
        updateSelectionBar();
      });
    });
  }

  function updateSelectionBar() {
    const bar = document.querySelector('.selection-bar');
    if (!bar) return;
    const count = selectedIds.size;
    bar.classList.toggle('active', count > 0);
    const countEl = bar.querySelector('[data-selection-count]');
    if (countEl) countEl.textContent = count;
  }

  function initFilesPage() {
    const grid = document.getElementById('files-grid');
    const tbody = document.getElementById('files-table-body');
    const sortSelect = document.getElementById('sort-select');
    const filterChips = document.querySelectorAll('.filter-chips .chip');
    let files = [...NexusData.files];

    function refresh() {
      const query = document.getElementById('page-search')?.value || '';
      const type = document.querySelector('.filter-chips .chip.active')?.dataset.filter || 'all';
      const sort = sortSelect?.value || 'name';
      files = NexusSearch.sortFiles(
        NexusSearch.filterByType(NexusSearch.searchFiles(query, NexusData.files), type),
        sort,
        'asc'
      );
      const countEl = document.getElementById('file-count');
      if (countEl) countEl.textContent = files.length + ' files';
      if (currentView === 'grid') {
        grid.style.display = 'grid';
        document.getElementById('files-table-wrap')?.style.setProperty('display', 'none');
        renderGrid(grid, files);
      } else {
        grid.style.display = 'none';
        document.getElementById('files-table-wrap')?.style.setProperty('display', 'block');
        renderTable(tbody, files);
      }
    }

    document.querySelectorAll('.view-toggle button').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.view-toggle button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentView = btn.dataset.view;
        refresh();
      });
    });

    filterChips.forEach(chip => {
      chip.addEventListener('click', () => {
        filterChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        refresh();
      });
    });

    document.getElementById('page-search')?.addEventListener('input', debounce(refresh, 300));
    sortSelect?.addEventListener('change', refresh);
    refresh();
  }

  function debounce(fn, ms) {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), ms);
    };
  }

  function initLazyRender(container, files, batchSize = 50) {
    let rendered = 0;
    function loadMore() {
      const batch = files.slice(rendered, rendered + batchSize);
      if (!batch.length) return;
      const html = batch.map(renderFileCard).join('');
      container.insertAdjacentHTML('beforeend', html);
      rendered += batch.length;
      bindFileEvents(container);
    }
    loadMore();
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && rendered < files.length) loadMore();
    });
    const sentinel = document.createElement('div');
    sentinel.id = 'load-sentinel';
    sentinel.style.height = '20px';
    container.parentElement?.appendChild(sentinel);
    observer.observe(sentinel);
  }

  return {
    renderFileCard,
    renderGrid,
    renderTable,
    initFilesPage,
    initLazyRender,
    selectedIds
  };
})();
