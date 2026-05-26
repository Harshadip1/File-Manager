/**
 * Search & filter functionality
 */
const NexusSearch = (function () {
  function searchFiles(query, files = NexusData.files) {
    if (!query || !query.trim()) return files;
    const q = query.toLowerCase().trim();
    NexusStorage.addRecentSearch(query);
    return files.filter(f =>
      f.name.toLowerCase().includes(q) ||
      f.owner.toLowerCase().includes(q) ||
      f.folder.toLowerCase().includes(q) ||
      f.type.toLowerCase().includes(q) ||
      (f.tags && f.tags.some(t => t.toLowerCase().includes(q)))
    );
  }

  function filterByType(files, type) {
    if (!type || type === 'all') return files;
    return files.filter(f => f.type === type);
  }

  function sortFiles(files, sortBy = 'name', order = 'asc') {
    const sorted = [...files];
    const mult = order === 'asc' ? 1 : -1;
    sorted.sort((a, b) => {
      switch (sortBy) {
        case 'size': return (a.size - b.size) * mult;
        case 'date': return (new Date(a.uploaded) - new Date(b.uploaded)) * mult;
        case 'owner': return a.owner.localeCompare(b.owner) * mult;
        default: return a.name.localeCompare(b.name) * mult;
      }
    });
    return sorted;
  }

  function initGlobalSearch() {
    const inputs = document.querySelectorAll('[data-global-search]');
    inputs.forEach(input => {
      input.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
          const q = encodeURIComponent(input.value.trim());
          window.location.href = `search.html?q=${q}`;
        }
      });
    });

    const params = new URLSearchParams(window.location.search);
    const q = params.get('q');
    if (q && document.querySelector('[data-search-query]')) {
      document.querySelector('[data-search-query]').textContent = decodeURIComponent(q);
      if (document.querySelector('[data-search-input]')) {
        document.querySelector('[data-search-input]').value = decodeURIComponent(q);
      }
    }
  }

  return { searchFiles, filterByType, sortFiles, initGlobalSearch };
})();
