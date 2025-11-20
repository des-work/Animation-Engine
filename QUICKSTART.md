# Quick Start Guide

## 🚀 Running the Project

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

### Step 3: Open in Browser
The terminal will show a local URL like:
```
➜  Local:   http://localhost:5173/
```
Click the link or copy it to your browser.

## 🎮 Using the Animation Engine

### Switching Effects
1. Look for the **Leva control panel** on the right side of the screen
2. Find the **"Orb Settings"** section
3. Click the **"effectMode"** dropdown
4. Select from:
   - **Normal**: Simple metallic orb
   - **Black Hole**: Gravitational disk effect
   - **Hurricane**: Swirling storm simulation
   - **Slime**: Organic blob animation

### Adjusting Parameters
Each effect has its own controls that appear when selected:

#### 🌀 Hurricane Controls
- **highColor**: Bright cloud areas (click to pick color)
- **lowColor**: Dark storm base (click to pick color)
- **speed**: Drag slider (0-5) for rotation speed

#### 🧪 Slime Controls
- **color**: Main slime color (click to pick color)
- **rimColor**: Edge glow color (click to pick color)
- **speed**: Animation speed (0-5)
- **distortion**: Morphing intensity (0-1)

#### 🕳️ Black Hole Controls
- **innerColor**: Hot disk center (click to pick color)
- **outerColor**: Cool outer regions (click to pick color)
- **speed**: Rotation speed (0-5)

### Camera Controls
- **Rotate**: Left-click and drag
- **Pan**: Right-click and drag
- **Zoom**: Mouse wheel scroll

## 🔧 Common Issues

### Server Won't Start
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Black Screen
- Check browser console (F12) for errors
- Verify WebGL is enabled in browser settings
- Try refreshing the page (Ctrl+R or Cmd+R)

### Low Performance
- Close the Leva panel to gain FPS
- Use a more powerful GPU if available
- Close other browser tabs

## 📦 Build for Production
```bash
npm run build
npm run preview
```

## 🎨 Customization Tips

### Change Background Color
Edit `src/Scene.jsx` line 13:
```jsx
<color attach="background" args={['#050505']} />
//                                  ^^^^^^^^ Change this hex color
```

### Adjust Camera Position
Edit `src/Scene.jsx` line 9:
```jsx
camera={{ position: [0, 0, 6], fov: 45 }}
//                   ^  ^  ^
//                   x  y  z coordinates
```

### Modify Bloom Effect
Edit `src/Scene.jsx` line 25:
```jsx
<Bloom 
  luminanceThreshold={0.2}  // Lower = more glow
  luminanceSmoothing={0.9}  // Higher = smoother
  intensity={1.5}           // Higher = brighter
/>
```

---

**Enjoy creating stunning 3D animations! 🎉**

