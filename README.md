# 🌸 Birthday Surprise — For Diya ♡

A dreamy, cinematic birthday website built with React + Framer Motion + Tailwind CSS v4.

## Quick Start

### 1. Install dependencies
Double-click `install.bat` **or** open a terminal here and run:
```bash
npm install
```

### 2. Add her photo
Put Diya's photo at:
```
public/her-photo.jpg
```

### 3. Run the website
Double-click `start.bat` **or** run:
```bash
npm run dev
```
Then open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Personalizing the Content

Open `src/App.tsx` and find these sections to customize:

| Section | What to edit |
|---|---|
| **Hero** | The birthday quote under her photo |
| **memories** array | Replace with your real dates and stories |
| **reasons** array | Add your own personal reasons |
| **Love Letter** | The letter text inside the `<p>` tags |
| **Final Surprise** | The closing message |

### Adding Real Memory Photos
In `src/App.tsx`, find the `memories` array and set `image: "/your-photo.jpg"` for each memory. Add those images to the `/public` folder.

---

## Project Structure
```
Birthday/
├── public/
│   ├── her-photo.jpg    ← Add Diya's photo here!
│   └── heart.svg
├── src/
│   ├── App.tsx          ← Main website code
│   ├── index.css        ← Styles & animations
│   └── main.tsx
├── index.html
├── package.json
├── install.bat          ← Run this first!
└── start.bat            ← Run to launch site
```

---

Made with love. ♡
