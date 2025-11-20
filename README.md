# 🌀 Animation Engine

An interactive 3D animation engine built with React Three Fiber featuring stunning visual effects including Hurricane Simulator, Slime Animation, and Black Hole effects.

## ✨ Features

- **🌀 Hurricane Simulator**: Realistic hurricane visualization with swirling clouds and customizable parameters
- **🧪 Slime Animation**: Organic, morphing slime with viscous physics and bubble effects
- **🕳️ Black Hole**: Gravitational accretion disk with event horizon visualization
- **🔮 Normal Orb**: Standard metallic sphere with reflective properties

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/des-work/Animation-Engine.git
cd Animation-Engine
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to the local URL shown in the terminal (typically `http://localhost:5173`)

## 🎮 Usage

### Controls

- **Effect Mode Selector**: Use the Leva control panel on the right side of the screen to switch between different effects:
  - Normal
  - Black Hole
  - Hurricane
  - Slime

- **Mouse Controls**:
  - **Left Click + Drag**: Rotate the camera
  - **Right Click + Drag**: Pan the view
  - **Scroll Wheel**: Zoom in/out

### Effect-Specific Controls

#### Hurricane
- **High Color**: Color of the bright cloud areas
- **Low Color**: Base color of the hurricane
- **Speed**: Rotation and animation speed (0-5)

#### Slime
- **Color**: Main slime body color
- **Rim Color**: Edge/fresnel highlight color
- **Speed**: Animation speed (0-5)
- **Distortion**: Amount of morphing effect (0-1)

#### Black Hole
- **Inner Color**: Color of the hot accretion disk center
- **Outer Color**: Color of the outer disk regions
- **Speed**: Rotation speed (0-5)

## 🛠️ Technologies Used

- **React 19**: UI framework
- **Three.js**: 3D graphics library
- **React Three Fiber**: React renderer for Three.js
- **React Three Drei**: Helper components and utilities
- **React Three Postprocessing**: Post-processing effects (Bloom, Tone Mapping)
- **Leva**: GUI controls for real-time parameter adjustment
- **Vite**: Build tool and dev server

## 📁 Project Structure

```
Animation-Engine/
├── src/
│   ├── components/
│   │   └── Orb.jsx           # Main component that switches between effects
│   ├── effects/
│   │   ├── BlackHole.jsx     # Black hole effect with accretion disk
│   │   ├── Hurricane.jsx     # Hurricane simulator with swirling clouds
│   │   └── Slime.jsx         # Organic slime animation
│   ├── App.jsx               # Main app component
│   ├── Scene.jsx             # 3D scene setup with camera and lighting
│   ├── main.jsx              # App entry point
│   ├── App.css               # App styles
│   └── index.css             # Global styles
├── public/
│   └── vite.svg
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🔧 Building for Production

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## 🎨 Shader Details

### Hurricane Shader
- Uses simplex noise for cloud generation
- Implements swirling distortion based on polar coordinates
- Features an eye hole in the center with smooth transitions
- Multi-octave fractal Brownian motion (FBM) for realistic cloud patterns

### Slime Shader
- 3D simplex noise for vertex displacement
- Fresnel effect for rim lighting
- Specular highlights for glossy appearance
- Real-time vertex animation for organic movement

### Black Hole Shader
- Accretion disk with ring geometry
- Swirling noise pattern for disk turbulence
- Additive blending for glowing effect
- Event horizon represented as black sphere

## 🐛 Troubleshooting

### Development Server Won't Start
- Make sure all dependencies are installed: `npm install`
- Check that you're using Node.js v16 or higher
- Try clearing the cache: `rm -rf node_modules package-lock.json` then `npm install`

### Effects Not Displaying
- Check browser console for errors
- Ensure WebGL is enabled in your browser
- Try a different browser (Chrome, Firefox, or Edge recommended)

### Performance Issues
- Lower the geometry resolution in the effect files
- Reduce the number of post-processing effects in Scene.jsx
- Close other resource-intensive applications

## 📝 License

This project is open source and available for educational purposes.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Author

Created with passion for 3D graphics and web technologies.

## 🌟 Acknowledgments

- Three.js community for excellent documentation
- React Three Fiber team for the amazing React integration
- Simplex noise algorithms by Stefan Gustavson
