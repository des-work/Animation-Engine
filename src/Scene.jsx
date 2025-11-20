import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { EffectComposer, Bloom, ToneMapping } from '@react-three/postprocessing'
import { Orb } from './components/Orb'

export function Scene() {
    return (
        <Canvas
            camera={{ position: [0, 0, 6], fov: 45 }}
            dpr={[1, 2]} // Handle high-DPI screens
            gl={{ antialias: true }}
        >
            <color attach="background" args={['#050505']} />

            <OrbitControls makeDefault enablePan={false} />

            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />

            <Orb />

            <Environment preset="city" />

            <EffectComposer>
                <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} intensity={1.5} />
                <ToneMapping adaptive />
            </EffectComposer>
        </Canvas>
    )
}
