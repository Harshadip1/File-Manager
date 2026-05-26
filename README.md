# NexusCloud — Premium File Manager & Cloud Storage

A futuristic, production-ready cloud file management web application built with **HTML5**, **CSS3**, and **Vanilla JavaScript**. Inspired by modern cloud storage platforms with glassmorphism UI, smooth animations, and extensive demo datasets.

![NexusCloud](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

---

## Project Information

**Project Name:** NexusCloud File Manager  
**Version:** 1.0.0  
**Type:** Front-end demo application with mock data  

### Features

- **File Management** — Upload, organize, preview, search, and filter 400+ demo files
- **Folder System** — 95 nested folders with color customization
- **Upload Center** — Drag & drop, progress bars, upload queue & history
- **File Preview** — Images, videos, PDFs, audio, documents with comments UI
- **Storage Analytics** — Pie charts, bar graphs, line charts, usage breakdown
- **Favorites & Trash** — Star files, restore or permanently delete
- **Team Workspace** — Shared projects, member lists, chat sidebar
- **Security Center** — Device management, login activity, encryption status
- **Media Gallery** — Masonry layout, albums, audio playlists
- **Theme Customization** — Dark/light mode with LocalStorage persistence
- **Advanced UI** — AI suggestions, voice search UI, QR sharing, OCR preview, keyboard shortcuts

### Technologies Used

| Technology | Purpose |
|------------|---------|
| HTML5 | Semantic structure, 25+ pages |
| CSS3 | Variables, Grid, Flexbox, animations, glassmorphism |
| Vanilla JavaScript | Modular architecture, no frameworks |
| LocalStorage | Theme, favorites, settings persistence |

---

## How to Run the Project in VS Code

### Step 1: Install Visual Studio Code

1. Download VS Code from [https://code.visualstudio.com/](https://code.visualstudio.com/)
2. Run the installer and complete setup
3. Launch Visual Studio Code

### Step 2: Open the Project Folder

1. Open VS Code
2. Go to **File → Open Folder**
3. Select the `File Manager` project folder
4. Click **Select Folder**

### Step 3: Install Live Server Extension

1. Click the **Extensions** icon in the left sidebar (or press `Ctrl+Shift+X`)
2. Search for **Live Server**
3. Install the extension by **Ritwick Dey**

### Step 4: Launch the Application

1. In the Explorer panel, locate `index.html`
2. **Right-click** on `index.html`
3. Click **"Open with Live Server"**
4. Your browser will open at `http://127.0.0.1:5500/index.html` (port may vary)

### Alternative: Open Without Live Server

You can also open `index.html` directly in a browser, but some features work best with a local server due to module loading paths.

---

## Folder Structure

```
File Manager/
├── index.html              # Home Dashboard
├── files.html              # My Files (400+ items)
├── recent.html             # Recent Files
├── favorites.html          # Favorites
├── shared.html             # Shared Files
├── uploads.html            # Upload Center
├── preview.html            # File Preview
├── folders.html            # Folder Management
├── trash.html              # Trash Bin
├── analytics.html          # Storage Analytics
├── search.html             # Search Results
├── profile.html            # User Profile
├── notifications.html      # Notifications (130 items)
├── activity.html           # Activity Logs (180 items)
├── workspace.html          # Team Workspace
├── gallery.html            # Media Gallery
├── document.html           # Document Viewer
├── video.html              # Video Player
├── settings.html           # Settings
├── about.html              # About Platform
├── contact.html            # Contact
├── backup.html             # Cloud Backup
├── security.html           # Security Center
├── downloads.html          # Download Manager
├── sharing.html            # File Sharing
├── css/
│   ├── style.css           # Core styles
│   ├── dashboard.css       # Dashboard & charts
│   ├── gallery.css         # Media & preview
│   ├── themes.css          # CSS variables & themes
│   └── responsive.css      # Mobile breakpoints
├── js/
│   ├── data.js             # Demo data generator (400+ files)
│   ├── app.js              # Core app, sidebar, navigation
│   ├── files.js            # File rendering & selection
│   ├── upload.js           # Upload simulation
│   ├── analytics.js        # Chart rendering
│   ├── preview.js          # Preview system
│   ├── search.js           # Search & filters
│   ├── storage.js          # LocalStorage API
│   └── themes.js           # Theme toggle
├── assets/
│   ├── images/
│   ├── uploads/
│   ├── documents/
│   └── media/
└── README.md
```

---

## Usage Guide

### Navigation

Use the **sidebar** to navigate between 25+ pages. The active page is highlighted automatically.

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl + K` | Focus search |
| `Ctrl + U` | Go to Upload Center |
| `Ctrl + F` | Go to Favorites |

### Upload System

1. Go to **Upload Center**
2. Drag files onto the drop zone or click to browse
3. Watch simulated progress bars in the upload queue
4. View upload history in the table below

### Preview System

- Click any file card to open **File Preview**
- Or visit `preview.html?id=file-1` with a file ID
- Supports image, video, audio, PDF, and document layouts

### Storage Analytics

Visit **Analytics** for:
- Monthly upload/download bar charts
- File type donut chart
- Storage breakdown by category
- Top downloaded files table

### Theme Customization

Click the **moon/sun** icon in the header to toggle dark/light mode. Preference is saved in LocalStorage.

### Demo Datasets

All data is generated in `js/data.js`:

| Dataset | Count |
|---------|-------|
| Files | 400 |
| Folders | 95 |
| Users | 48 |
| Notifications | 130 |
| Activities | 180 |
| Uploads | 90 |
| Trash items | 110 |
| Media items | 140 |
| Workspaces | 28 |

---

## Browser Compatibility

| Browser | Supported |
|---------|-----------|
| Chrome 90+ | ✅ |
| Firefox 88+ | ✅ |
| Safari 14+ | ✅ |
| Edge 90+ | ✅ |

Requires support for CSS Grid, Flexbox, CSS Variables, Intersection Observer, and LocalStorage.

---

## Performance Optimization

- **Lazy rendering** — File grids render in batches on scroll
- **Debounced search** — 300ms delay on filter input
- **Efficient DOM updates** — Template-based rendering
- **CSS animations** — GPU-accelerated transforms
- **Intersection Observer** — Scroll reveal effects

---

## Troubleshooting

### Live Server not opening

- Ensure the Live Server extension is installed and enabled
- Try clicking "Go Live" in the status bar (bottom-right of VS Code)

### Styles not loading

- Verify you're using Live Server (not `file://` protocol)
- Check that CSS paths are relative: `css/style.css`

### JavaScript errors

- Open DevTools (F12) → Console
- Ensure scripts load in order: `data.js` before `app.js`
- Clear browser cache and reload

### Theme not persisting

- Enable cookies/local storage in browser settings
- Check if private/incognito mode blocks LocalStorage

---

## License

This is a demo/educational project. Free to use and modify for learning and portfolio purposes.

---

**Built with ❤️ using HTML5, CSS3, and Vanilla JavaScript**
