/**
 * NexusCloud - Demo Data Generator
 * Large realistic mock datasets for all pages
 */
const NexusData = (function () {
  const FILE_TYPES = {
    image: { ext: ['jpg', 'png', 'gif', 'webp', 'svg'], icon: '🖼️', color: '#06B6D4' },
    video: { ext: ['mp4', 'mov', 'avi', 'mkv'], icon: '🎬', color: '#7C3AED' },
    pdf: { ext: ['pdf'], icon: '📕', color: '#EF4444' },
    doc: { ext: ['doc', 'docx'], icon: '📄', color: '#3B82F6' },
    xls: { ext: ['xls', 'xlsx', 'csv'], icon: '📊', color: '#22C55E' },
    zip: { ext: ['zip', 'rar', '7z', 'tar'], icon: '📦', color: '#F59E0B' },
    audio: { ext: ['mp3', 'wav', 'flac', 'aac'], icon: '🎵', color: '#EC4899' },
    code: { ext: ['js', 'ts', 'py', 'html', 'css', 'json', 'java', 'cpp'], icon: '💻', color: '#8B5CF6' }
  };

  const PREFIXES = ['project', 'report', 'design', 'backup', 'archive', 'draft', 'final', 'export', 'sync', 'data', 'asset', 'media', 'document', 'presentation', 'spreadsheet', 'recording', 'screenshot', 'template', 'bundle', 'release'];
  const SUFFIXES = ['v1', 'v2', 'v3', '2024', '2025', 'Q1', 'Q2', 'Q3', 'Q4', 'final', 'copy', 'rev', 'updated', 'old', 'new', 'master', 'beta', 'prod', 'staging', 'dev'];
  const OWNERS = ['Alex Morgan', 'Jordan Lee', 'Sam Rivera', 'Casey Kim', 'Riley Chen', 'Morgan Blake', 'Taylor Brooks', 'Quinn Hayes', 'Avery Dunn', 'Jamie Fox'];
  const FOLDER_NAMES = ['Projects', 'Documents', 'Media', 'Archives', 'Work', 'Personal', 'Shared', 'Backups', 'Templates', 'Resources', 'Development', 'Marketing', 'Finance', 'HR', 'Legal', 'Research', 'Presentations', 'Spreadsheets', 'Images', 'Videos'];
  const COLORS = ['#7C3AED', '#06B6D4', '#22C55E', '#F59E0B', '#EF4444', '#EC4899', '#3B82F6', '#8B5CF6'];

  function random(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function randomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

  function formatSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    if (bytes < 1073741824) return (bytes / 1048576).toFixed(1) + ' MB';
    return (bytes / 1073741824).toFixed(2) + ' GB';
  }

  function randomDate(daysBack = 365) {
    const d = new Date();
    d.setDate(d.getDate() - randomInt(0, daysBack));
    d.setHours(randomInt(0, 23), randomInt(0, 59));
    return d.toISOString();
  }

  function generateFileName(type) {
    const typeInfo = FILE_TYPES[type];
    const ext = random(typeInfo.ext);
    return `${random(PREFIXES)}_${random(SUFFIXES)}_${randomInt(100, 9999)}.${ext}`;
  }

  function generateFiles(count = 350) {
    const types = Object.keys(FILE_TYPES);
    const files = [];
    for (let i = 0; i < count; i++) {
      const type = random(types);
      const info = FILE_TYPES[type];
      const size = randomInt(1024, 500 * 1024 * 1024);
      files.push({
        id: `file-${i + 1}`,
        name: generateFileName(type),
        type,
        ext: info.ext[0],
        icon: info.icon,
        color: info.color,
        size,
        sizeFormatted: formatSize(size),
        owner: random(OWNERS),
        uploaded: randomDate(180),
        modified: randomDate(90),
        folder: random(FOLDER_NAMES),
        favorite: Math.random() > 0.85,
        shared: Math.random() > 0.7,
        tags: [random(['urgent', 'review', 'approved', 'draft', 'archive', 'public', 'private', 'team'])],
        downloads: randomInt(0, 500),
        views: randomInt(0, 2000)
      });
    }
    return files;
  }

  function generateFolders(depth = 3, count = 80) {
    const folders = [];
    for (let i = 0; i < count; i++) {
      const parent = i > 20 ? `folder-${randomInt(1, Math.min(i, 40))}` : null;
      folders.push({
        id: `folder-${i + 1}`,
        name: random(FOLDER_NAMES) + (i > FOLDER_NAMES.length ? ` ${randomInt(1, 99)}` : ''),
        parent,
        color: random(COLORS),
        files: randomInt(5, 120),
        size: formatSize(randomInt(1048576, 10 * 1073741824)),
        created: randomDate(400),
        modified: randomDate(60)
      });
    }
    return folders;
  }

  function generateUsers(count = 45) {
    const roles = ['Admin', 'Editor', 'Viewer', 'Contributor', 'Guest'];
    const depts = ['Engineering', 'Design', 'Marketing', 'Sales', 'Support', 'Operations', 'Finance', 'Legal'];
    return Array.from({ length: count }, (_, i) => ({
      id: `user-${i + 1}`,
      name: OWNERS[i % OWNERS.length] + (i >= OWNERS.length ? ` ${i}` : ''),
      email: `user${i + 1}@workspace.demo`,
      role: random(roles),
      department: random(depts),
      avatar: String.fromCharCode(65 + (i % 26)),
      status: random(['online', 'away', 'offline']),
      lastActive: randomDate(7),
      filesShared: randomInt(5, 200),
      storageUsed: formatSize(randomInt(1073741824, 50 * 1073741824))
    }));
  }

  function generateNotifications(count = 120) {
    const types = [
      { type: 'upload', icon: '📤', title: 'File uploaded successfully' },
      { type: 'share', icon: '🔗', title: 'File shared with team' },
      { type: 'security', icon: '🔒', title: 'Security alert detected' },
      { type: 'download', icon: '📥', title: 'File downloaded' },
      { type: 'comment', icon: '💬', title: 'New comment on file' },
      { type: 'team', icon: '👥', title: 'Team workspace updated' },
      { type: 'backup', icon: '☁️', title: 'Backup completed' },
      { type: 'trash', icon: '🗑️', title: 'Item moved to trash' },
      { type: 'restore', icon: '♻️', title: 'File restored from trash' },
      { type: 'quota', icon: '⚠️', title: 'Storage quota warning' }
    ];
    return Array.from({ length: count }, (_, i) => {
      const t = random(types);
      return {
        id: `notif-${i + 1}`,
        ...t,
        message: `${t.title}: ${generateFileName(random(Object.keys(FILE_TYPES)))}`,
        time: randomDate(14),
        read: Math.random() > 0.35,
        priority: random(['low', 'normal', 'high'])
      };
    }).sort((a, b) => new Date(b.time) - new Date(a.time));
  }

  function generateActivities(count = 150) {
    const actions = ['uploaded', 'downloaded', 'shared', 'deleted', 'renamed', 'moved', 'commented on', 'favorited', 'restored', 'archived'];
    return Array.from({ length: count }, (_, i) => ({
      id: `act-${i + 1}`,
      user: random(OWNERS),
      action: random(actions),
      target: generateFileName(random(Object.keys(FILE_TYPES))),
      time: randomDate(30),
      ip: `192.168.${randomInt(1, 255)}.${randomInt(1, 255)}`,
      device: random(['Chrome on Windows', 'Safari on macOS', 'Firefox on Linux', 'Edge on Windows', 'Mobile App'])
    })).sort((a, b) => new Date(b.time) - new Date(a.time));
  }

  function generateUploads(count = 85) {
    const statuses = ['completed', 'completed', 'completed', 'uploading', 'queued', 'failed'];
    return Array.from({ length: count }, (_, i) => ({
      id: `upload-${i + 1}`,
      name: generateFileName(random(Object.keys(FILE_TYPES))),
      size: formatSize(randomInt(1048576, 500 * 1048576)),
      progress: random(statuses) === 'completed' ? 100 : randomInt(0, 99),
      status: random(statuses),
      started: randomDate(7),
      speed: randomInt(1, 50) + ' MB/s'
    }));
  }

  function generateSharedWorkspaces(count = 24) {
    return Array.from({ length: count }, (_, i) => ({
      id: `ws-${i + 1}`,
      name: `Workspace ${random(['Alpha', 'Beta', 'Gamma', 'Delta', 'Omega', 'Prime', 'Core', 'Edge'])} ${randomInt(1, 99)}`,
      members: randomInt(3, 25),
      files: randomInt(50, 500),
      storage: formatSize(randomInt(1073741824, 100 * 1073741824)),
      role: random(['Owner', 'Editor', 'Viewer']),
      updated: randomDate(14)
    }));
  }

  function generateDevices(count = 12) {
    return Array.from({ length: count }, (_, i) => ({
      id: `dev-${i + 1}`,
      name: random(['Windows PC', 'MacBook Pro', 'iPhone 15', 'iPad Air', 'Android Phone', 'Linux Workstation', 'Surface Pro']),
      lastLogin: randomDate(30),
      location: random(['New York, US', 'London, UK', 'Tokyo, JP', 'Berlin, DE', 'Sydney, AU', 'Toronto, CA']),
      current: i === 0,
      trusted: Math.random() > 0.2
    }));
  }

  function generateAnalytics() {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return {
      storageUsed: 847,
      storageTotal: 1000,
      storagePercent: 84.7,
      filesTotal: 12847,
      foldersTotal: 892,
      sharedLinks: 342,
      uploadsThisMonth: 1247,
      downloadsThisMonth: 3891,
      monthlyUploads: months.map(m => ({ month: m, value: randomInt(800, 2000) })),
      monthlyDownloads: months.map(m => ({ month: m, value: randomInt(2000, 5000) })),
      fileTypes: [
        { type: 'Images', percent: 32, size: '271 GB', color: '#06B6D4' },
        { type: 'Videos', percent: 28, size: '237 GB', color: '#7C3AED' },
        { type: 'Documents', percent: 18, size: '152 GB', color: '#3B82F6' },
        { type: 'Archives', percent: 12, size: '102 GB', color: '#F59E0B' },
        { type: 'Audio', percent: 6, size: '51 GB', color: '#EC4899' },
        { type: 'Other', percent: 4, size: '34 GB', color: '#64748B' }
      ],
      topFiles: generateFiles(20).sort((a, b) => b.downloads - a.downloads),
      activityByHour: Array.from({ length: 24 }, (_, h) => ({ hour: h, activity: randomInt(10, 200) }))
    };
  }

  function generateTrash(count = 95) {
    return generateFiles(count).map((f, i) => ({
      ...f,
      deletedAt: randomDate(30),
      expiresIn: randomInt(1, 30) + ' days',
      originalPath: `/` + random(FOLDER_NAMES) + `/` + f.name
    }));
  }

  function generateMedia(count = 120) {
    return Array.from({ length: count }, (_, i) => ({
      id: `media-${i + 1}`,
      title: `Media_${random(PREFIXES)}_${randomInt(100, 999)}`,
      type: random(['image', 'video', 'audio']),
      album: random(['Vacation 2025', 'Product Shots', 'Team Events', 'Nature', 'Urban', 'Portfolio', 'Screenshots', 'Recordings']),
      size: formatSize(randomInt(1048576, 100 * 1048576)),
      date: randomDate(200),
      dimensions: random(['1920x1080', '3840x2160', '1280x720', '800x600'])
    }));
  }

  function generateDownloads(count = 60) {
    return Array.from({ length: count }, (_, i) => ({
      id: `dl-${i + 1}`,
      name: generateFileName(random(Object.keys(FILE_TYPES))),
      size: formatSize(randomInt(1048576, 200 * 1048576)),
      progress: randomInt(0, 100),
      status: random(['completed', 'downloading', 'paused', 'queued']),
      started: randomDate(3)
    }));
  }

  const files = generateFiles(400);
  const folders = generateFolders(3, 95);
  const users = generateUsers(48);
  const notifications = generateNotifications(130);
  const activities = generateActivities(180);
  const uploads = generateUploads(90);
  const workspaces = generateSharedWorkspaces(28);
  const devices = generateDevices(14);
  const analytics = generateAnalytics();
  const trash = generateTrash(110);
  const media = generateMedia(140);
  const downloads = generateDownloads(70);

  return {
    FILE_TYPES,
    files,
    folders,
    users,
    notifications,
    activities,
    uploads,
    workspaces,
    devices,
    analytics,
    trash,
    media,
    downloads,
    favorites: files.filter(f => f.favorite),
    shared: files.filter(f => f.shared),
    recent: [...files].sort((a, b) => new Date(b.uploaded) - new Date(a.uploaded)).slice(0, 80),
    formatSize,
    random,
    randomInt
  };
})();

if (typeof module !== 'undefined') module.exports = NexusData;
