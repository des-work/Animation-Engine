import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useControls } from 'leva'

const BlackHoleShader = {
    vertexShader: `
    varying vec2 vUv;
    varying vec3 vPos;
    void main() {
      vUv = uv;
      vPos = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    fragmentShader: `
    uniform float uTime;
    uniform vec3 uColorInner;
    uniform vec3 uColorOuter;
    varying vec2 vUv;
    varying vec3 vPos;

    // Simplex noise function
    vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
    float snoise(vec2 v){
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
               -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod(i, 289.0);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      float dist = length(vPos.xy);
      float angle = atan(vPos.y, vPos.x);
      
      // Swirling effect
      float noiseVal = snoise(vec2(dist * 3.0 - uTime * 0.5, angle * 2.0 + uTime * 0.2));
      
      // Ring pattern
      float ring = smoothstep(0.4, 0.6, dist) * smoothstep(0.9, 0.6, dist);
      
      // Color mixing
      vec3 color = mix(uColorInner, uColorOuter, dist + noiseVal * 0.2);
      
      // Alpha fade
      float alpha = ring * (0.8 + noiseVal * 0.2);
      
      gl_FragColor = vec4(color, alpha);
    }
  `
}

export function BlackHole() {
    const diskRef = useRef()

    const { innerColor, outerColor, speed } = useControls('Black Hole', {
        innerColor: '#ff6600',
        outerColor: '#000000',
        speed: { value: 1, min: 0, max: 5 }
    })

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uColorInner: { value: new THREE.Color(innerColor) },
        uColorOuter: { value: new THREE.Color(outerColor) }
    }), [])

    useFrame((state) => {
        if (diskRef.current) {
            diskRef.current.material.uniforms.uTime.value = state.clock.elapsedTime * speed
            diskRef.current.material.uniforms.uColorInner.value.set(innerColor)
            diskRef.current.material.uniforms.uColorOuter.value.set(outerColor)
        }
    })

    return (
        <group>
            {/* Event Horizon */}
            <mesh>
                <sphereGeometry args={[1, 64, 64]} />
                <meshBasicMaterial color="black" />
            </mesh>

            {/* Accretion Disk */}
            <mesh ref={diskRef} rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[1.2, 3, 64]} />
                <shaderMaterial
                    vertexShader={BlackHoleShader.vertexShader}
                    fragmentShader={BlackHoleShader.fragmentShader}
                    uniforms={uniforms}
                    transparent
                    side={THREE.DoubleSide}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>

            {/* Glow/Halo */}
            <mesh scale={[1.05, 1.05, 1.05]}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshBasicMaterial color={innerColor} transparent opacity={0.1} side={THREE.BackSide} />
            </mesh>
        </group>
    )
}
