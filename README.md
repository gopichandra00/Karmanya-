# Karmanya

A task management app built with React and Next.js, now as a Progressive Web App (PWA) for mobile installation.

## Features

- Add tasks with time ranges (e.g., 02:00 to 04:00)
- View active tasks with green indicators
- Track completed tasks with time taken and deadline status (Within/Out of deadline)
- Hierarchical organization: Add Task, Active Tasks, Completed Tasks
- Persistent storage using `localStorage`
- Installable as PWA on mobile devices

## Run locally

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open the app in your browser:

```text
http://localhost:3000
```

## Mobile Installation

The app is now a Progressive Web App (PWA). On mobile browsers (Chrome, Safari, etc.):

1. Open the app in your browser
2. Look for the "Add to Home Screen" option in the browser menu
3. Follow the prompts to install the app

The app will then appear as a native app on your home screen and can be used offline.

**Note:** For full PWA functionality, add icon files (`icon-192.png` and `icon-512.png`) to the `public` folder. You can generate these from online tools or create simple icons.

## Project files

- `pages/index.js` — main Next.js page
- `components/TodoApp.js` — React component with task management
- `styles/globals.css` — global page styles
- `styles/Home.module.css` — component-specific styles
- `public/manifest.json` — PWA manifest
- `next.config.js` — Next.js configuration with PWA support
- `package.json` — app dependencies and scripts

## Notes

Tasks are saved in browser storage using `localStorage`, so they persist across sessions.
