import React, { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { Orbit } from 'lucide-react'
import LazyImage from '../components/LazyImage'
import useReducedMotion from '../hooks/useReducedMotion'
import { useLanguage } from '../i18n/LanguageContext'

/**
 * COSMOS Phase 2 — real-time WebGL planet viewer.
 *
 * This module is intentionally lazy-loaded (`React.lazy` in the pages that
 * use it) so Three.js never blocks the first paint. The page renders a flat
 * photograph underneath; this scene fades in over it, and the photo simply
 * remains if WebGL or the texture is unavailable.
 */

/* Axial tilts (radians) — Uranus rolls on its side, Saturn carries its rings. */
const TILT = {
  sun: 0.13,
  mercury: 0.03,
  venus: 3.09,
  earth: 0.41,
  mars: 0.44,
  jupiter: 0.05,
  saturn: 0.47,
  uranus: 1.71,
  neptune: 0.49,
}

/* Bodies drawn with procedural ice/rock rings: [inner, outer, alpha, tint] */
const RINGS = {
  saturn: { inner: 1.62, outer: 2.5, alpha: 0.9, tint: [226, 205, 160] },
  uranus: { inner: 1.78, outer: 2.12, alpha: 0.3, tint: [168, 216, 220] },
}

const EMISSIVE = new Set(['sun'])

const SPIN = { sun: 0.02, default: 0.09 }

/* ------------------------------------------------------------------ */
/* Procedural ring texture — concentric icy bands on an offscreen canvas */
/* ------------------------------------------------------------------ */
function makeRingTexture([r, g, b], alpha) {
  const size = 512
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  const image = ctx.createImageData(size, size)
  const inner = 0.648 // inner ring / outer ring in UV space
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const i = (y * size + x) * 4
      const dx = x - size / 2
      const dy = y - size / 2
      const f = Math.sqrt(dx * dx + dy * dy) / (size / 2)
      let a = 0
      if (f >= inner && f <= 1) {
        const band =
          0.55 +
          0.45 * Math.sin(f * 64) * Math.sin(f * 17.3 + 1.7) +
          0.18 * Math.sin(f * 130 + 0.6)
        const edge = Math.min(1, (f - inner) / 0.05, (1 - f) / 0.08)
        a = Math.max(0, Math.min(1, band * edge)) * alpha
      }
      image.data[i] = r
      image.data[i + 1] = g
      image.data[i + 2] = b
      image.data[i + 3] = Math.round(a * 255)
    }
  }
  ctx.putImageData(image, 0, 0)
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

/* ------------------------------------------------------------------ */
/* Atmosphere halo — classic back-side fresnel shell                    */
/* ------------------------------------------------------------------ */
function Atmosphere({ color, strength, scale }) {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uColor: { value: new THREE.Color(color) },
          uStrength: { value: strength },
        },
        vertexShader: /* glsl */ `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: /* glsl */ `
          uniform vec3 uColor;
          uniform float uStrength;
          varying vec3 vNormal;
          void main() {
            float intensity = pow(0.66 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.6);
            gl_FragColor = vec4(uColor, 1.0) * intensity * uStrength;
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
        depthWrite: false,
      }),
    [color, strength],
  )
  return (
    <mesh material={material} scale={scale}>
      <sphereGeometry args={[1.4, 48, 48]} />
    </mesh>
  )
}

/* ------------------------------------------------------------------ */
/* The rotating body                                                    */
/* ------------------------------------------------------------------ */
function Globe({ texture, spin, emissive }) {
  const ref = useRef(null)
  useFrame((_, delta) => {
    if (ref.current && spin > 0) ref.current.rotation.y += delta * spin
  })
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1.4, 64, 64]} />
      {emissive ? (
        <meshBasicMaterial map={texture} toneMapped={false} />
      ) : (
        <meshStandardMaterial map={texture} roughness={0.95} metalness={0} />
      )}
    </mesh>
  )
}

function Scene({ bodyId, texture, accent, spin }) {
  const emissive = EMISSIVE.has(bodyId)
  const ring = RINGS[bodyId]
  const ringTexture = useMemo(
    () => (ring ? makeRingTexture(ring.tint, ring.alpha) : null),
    [ring],
  )
  useEffect(() => () => ringTexture?.dispose(), [ringTexture])

  return (
    <>
      {!emissive && <ambientLight intensity={0.5} />}
      {!emissive && <directionalLight position={[5, 2.5, 4]} intensity={2.3} />}
      {!emissive && (
        <directionalLight position={[-4, -1.5, -3]} intensity={0.4} color="#8ab4ff" />
      )}
      <group rotation={[0, 0, TILT[bodyId] ?? 0]}>
        <Globe texture={texture} spin={spin} emissive={emissive} />
        <Atmosphere
          color={accent}
          strength={emissive ? 2.1 : 0.85}
          scale={emissive ? 1.3 : 1.16}
        />
        {ring && (
          <mesh rotation={[Math.PI / 2 - 0.1, 0, 0]}>
            <ringGeometry args={[ring.inner, ring.outer, 128]} />
            <meshBasicMaterial
              map={ringTexture}
              transparent
              side={THREE.DoubleSide}
              depthWrite={false}
              opacity={0.95}
            />
          </mesh>
        )}
      </group>
      <Stars radius={46} depth={32} count={1400} factor={2.3} saturation={0} fade speed={spin > 0 ? 0.5 : 0} />
    </>
  )
}

/* ------------------------------------------------------------------ */
/* Error boundary — falls back to the photo if WebGL fails at runtime   */
/* ------------------------------------------------------------------ */
class SceneBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { failed: false }
  }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}

function webglSupported() {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl2') || canvas.getContext('webgl')),
    )
  } catch {
    return false
  }
}

/* ------------------------------------------------------------------ */
/* Public shell — WebGL check, texture preload, visibility gating       */
/* ------------------------------------------------------------------ */
export default function PlanetViewer({
  bodyId,
  textureUrl,
  accent,
  fallbackSrc,
  fallbackAlt,
  variant = 'overlay', // 'overlay' sits above a photo; 'standalone' renders its own frame
  className = '',
}) {
  const { t } = useLanguage()
  const reducedMotion = useReducedMotion()
  const frameRef = useRef(null)
  const [texture, setTexture] = useState(null)
  const [active, setActive] = useState(false) // canvas near viewport → run rAF
  const webgl = useMemo(webglSupported, [])

  const ready = Boolean(texture) && webgl
  const spin = reducedMotion ? 0 : (SPIN[bodyId] ?? SPIN.default)

  /* Preload the equirectangular map; the photo shows until it arrives. */
  useEffect(() => {
    let alive = true
    setTexture(null)
    if (!webgl) return undefined
    new THREE.TextureLoader().load(
      textureUrl,
      (loaded) => {
        if (!alive) return
        loaded.colorSpace = THREE.SRGBColorSpace
        loaded.anisotropy = 4
        setTexture(loaded)
      },
      undefined,
      () => {
        /* texture failure → keep the photograph */
      },
    )
    return () => {
      alive = false
    }
  }, [textureUrl, webgl])

  /* Only run the render loop while the viewer is near the viewport. */
  useEffect(() => {
    const el = frameRef.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setActive(true)
      return undefined
    }
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: '120px 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const fallback = (
    <LazyImage
      src={fallbackSrc}
      alt={fallbackAlt}
      width={880}
      height={880}
      eager
      className="viewer-photo"
    />
  )

  return (
    <div
      ref={frameRef}
      className={`viewer-frame viewer-frame--${variant} ${ready ? 'is-ready' : ''} ${className}`}
      style={{ '--viewer-glow': accent }}
      role="group"
      aria-label={t.viewer.aria.replace('{name}', fallbackAlt)}
    >
      {ready ? (
        <SceneBoundary fallback={fallback}>
          <Canvas
            frameloop={active ? 'always' : 'never'}
            dpr={[1, 2]}
            camera={{ fov: 38, position: [0, 0.9, RINGS[bodyId] ? 5.9 : 4.7], near: 0.1, far: 140 }}
            gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            className="viewer-canvas"
          >
            <Scene bodyId={bodyId} texture={texture} accent={accent} spin={spin} />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              enableDamping
              dampingFactor={0.08}
              rotateSpeed={0.55}
            />
          </Canvas>
        </SceneBoundary>
      ) : (
        fallback
      )}
      <span className="viewer-badge" aria-hidden="true">
        <Orbit size={13} strokeWidth={1.8} />
        {ready ? t.viewer.hint : t.viewer.fallbackBadge}
      </span>
    </div>
  )
}
