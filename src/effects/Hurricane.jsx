import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useControls } from 'leva'

const HurricaneShader = {
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
    uniform vec3 uColorHigh;
    uniform vec3 uColorLow;
    varying vec2 vUv;
    varying vec3 vPos;

    // Simplex noise
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

    // FBM
    float fbm(vec2 st) {
        float value = 0.0;
        float amplitude = 0.5;
        for (int i = 0; i < 5; i++) {
            value += amplitude * snoise(st);
            st *= 2.0;
            amplitude *= 0.5;
        }
        return value;
    }

    void main() {
      // Polar coordinates for swirling
      float angle = atan(vPos.y, vPos.x);
      float dist = length(vPos.xy);
      
      // Swirl distortion
      float swirl = angle + 2.0 * snoise(vec2(dist * 2.0 - uTime * 0.2, uTime * 0.1));
      
      // Cloud noise
      float n = fbm(vec2(swirl * 3.0, dist * 3.0 - uTime * 0.5));
      
      // Eye hole
      float eye = smoothstep(0.2, 0.5, dist);
      
      // Mix colors
      vec3 color = mix(uColorLow, uColorHigh, n + 0.5);
      
      // Alpha
      float alpha = eye * (0.6 + n * 0.4);
      
      // Edge fade
      alpha *= smoothstep(1.0, 0.8, dist);

      gl_FragColor = vec4(color, alpha);
    }
  `
}

export function Hurricane() {
    const meshRef = useRef()

    const { highColor, lowColor, speed } = useControls('Hurricane', {
        highColor: '#ffffff',
        lowColor: '#0044aa',
        speed: { value: 1, min: 0, max: 5 }
    })

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uColorHigh: { value: new THREE.Color(highColor) },
        uColorLow: { value: new THREE.Color(lowColor) }
    }), [])

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.material.uniforms.uTime.value = state.clock.elapsedTime * speed
            meshRef.current.material.uniforms.uColorHigh.value.set(highColor)
            meshRef.current.material.uniforms.uColorLow.value.set(lowColor)

            // Rotate the whole system slowly
            meshRef.current.rotation.z = state.clock.elapsedTime * 0.1 * speed
        }
    })

    return (
        <group>
            <mesh ref={meshRef}>
                <planeGeometry args={[4, 4, 64, 64]} />
                <shaderMaterial
                    vertexShader={HurricaneShader.vertexShader}
                    fragmentShader={HurricaneShader.fragmentShader}
                    uniforms={uniforms}
                    transparent
                    side={THREE.DoubleSide}
                    depthWrite={false}
                />
            </mesh>
            {/* Particles for debris could be added here */}
        </group>
    )
}
