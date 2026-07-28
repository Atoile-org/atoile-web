import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {useReducedMotion} from "framer-motion";
import useIsMobile from "useismobile";
import {Canvas, useFrame} from "@react-three/fiber";
import {CanvasTexture} from "three";
import footerVertexShader from "../assets/shaders/footerVertexShader.glsl";
import footerFragShader from "../assets/shaders/footerFragShader.glsl";
import * as THREE from 'three';

const textShader = {
  vertexShader: footerVertexShader,
  fragmentShader: footerFragShader
};

function InnerQuantumField({ texture, observed, noiseTexture }) {
  const materialRef = useRef(null);

  useFrame((state, delta) => {
    const mat = materialRef.current;
    if (!mat) return;

    mat.uniforms.uTime.value += delta;
  });

  return (
    <mesh>
      <planeGeometry args={[2, 1]} />
      <shaderMaterial
        ref={materialRef}
        {...textShader}
        uniforms={{
          uTime: { value: 0 },
          uObserved: { value: observed },
          tNoise: { value: noiseTexture },
          tDiffuse: { value: texture }
        }}
        transparent
      />
    </mesh>
  )
}

export default function QuantumField({ text, observed, invisible }) {
  const reduceMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const [texture, setTexture] = useState(null);
  const [noiseTexture, setNoiseTexture] = useState(null);
  const canvasRef = useRef(null);

  const createNoiseTexture = useCallback(() => {
    if (!canvasRef.current) return null;
    const w = canvasRef.current.width;
    const h = canvasRef.current.height;
    const data = new Uint8Array(w * h * 4); // RGBA

    for (let i = 0; i < w * h; i++) {
      const value = Math.floor(Math.random() * 255);
      data[i * 4] = value;
      data[i * 4 + 1] = value;
      data[i * 4 + 2] = value;
      data[i * 4 + 3] = value;
    }

    const texture = new THREE.DataTexture(data, w, h, THREE.RGBAFormat);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;
    texture.needsUpdate = true;

    return texture;
  }, [canvasRef]);

  const generateTexture = useCallback((text) => {
    if (!canvasRef.current) return null;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.style.width = canvasRef.current.width;
    canvas.style.height = canvasRef.current.height;

    ctx.fillStyle = 'white';
    ctx.font = '2rem vt323';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    if (isMobile) ctx.fillText(text, canvas.width / 1.5, canvas.height / 1.8);
    else ctx.fillText(text, canvas.width / 2, canvas.height * 0.1);

    const ct = new CanvasTexture(canvas);
    canvas.remove();
    return ct;
  }, [canvasRef, isMobile]);

  useEffect(() => {
    if (!observed) return;

    const regenTexture = () => {
      setNoiseTexture(createNoiseTexture());
      setTexture(generateTexture(text));
    }
    regenTexture();
    const ro = new ResizeObserver(regenTexture);
    ro.observe(canvasRef.current);
    return () => ro.disconnect();
  }, [createNoiseTexture, generateTexture, canvasRef, observed, text]);

  if (reduceMotion || invisible) return null;

  return (
    <div className="footer-qf-wrap" aria-hidden="true">
      <Canvas ref={canvasRef}>
        <InnerQuantumField texture={texture} observed={observed} noiseTexture={noiseTexture} />
      </Canvas>
    </div>
  );
}