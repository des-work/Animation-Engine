import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import * as THREE from 'three'
import { BlackHole } from '../effects/BlackHole'
import { Hurricane } from '../effects/Hurricane'
import { Slime } from '../effects/Slime'

export function Orb() {
    const meshRef = useRef()

    const { effectMode } = useControls('Orb Settings', {
        effectMode: {
            value: 'Normal',
            options: ['Normal', 'Black Hole', 'Hurricane', 'Slime'],
        },
    })

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.2
        }
    })

    return (
        <group>
            {effectMode === 'Normal' && (
                <mesh ref={meshRef}>
                    <sphereGeometry args={[1.5, 64, 64]} />
                    <meshStandardMaterial
                        color="#4444ff"
                        roughness={0.1}
                        metalness={0.8}
                    />
                </mesh>
            )}
            {/* Placeholders for other effects */}
            {effectMode === 'Black Hole' && <BlackHole />}
            {effectMode === 'Hurricane' && <Hurricane />}
            {effectMode === 'Slime' && <Slime />}
        </group>
    )
}
