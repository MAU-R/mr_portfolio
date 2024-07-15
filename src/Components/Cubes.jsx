
import React, { useEffect, useRef, useState } from 'react';
import {useFrame } from '@react-three/fiber';
import '../Assets/styles/cubeField.css';
import * as THREE from 'three'
const Cube = ({ position, isActive, scroll, cameraPosition}) => {
    const ref = useRef();
    const [offset] = useState(Math.random() * 2 * Math.PI); // Aleatorio para cada cubo
    const cycleDuration = 5 * Math.PI; // Duración del ciclo completo de la animación
  
    useFrame((state, delta) => {
      if (isActive) {
        const elapsedTime = state.clock.getElapsedTime();
        const cycleTime = (elapsedTime + offset) % cycleDuration;
        ref.current.position.y = position[1] + Math.sin(cycleTime)*0.3;
      } else {
        ref.current.position.y = position[1]
      }
      const x=ref.current.position.x >=0 ? ref.current.position.x*-1 :ref.current.position.x;
     
      const distancex = ((x-cameraPosition.toArray()[0])+16)/3;
      const dinstancez= ((ref.current.position.z)-cameraPosition.toArray()[2])+16;
      const distance = distancex+dinstancez;
      //console.log("Distancia en dx:: ",distancex)


      if(scroll>(window.innerHeight*0.05))
      ref.current.position.y -= (scroll-(window.innerHeight*0.05)) * 0.0009 * Math.exp(distance/3);

      ref.current.material.opacity = Math.max(1 - (scroll) * 0.0005, 0);
      ref.current.material.transparent = true;
    
    });
    const vertexShader= `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }
  `;
    const   fragmentShader= `
    uniform vec3 color1;
    uniform vec3 color2;
  
    varying vec2 vUv;
    
    void main() {
      
      gl_FragColor = vec4(mix(color1, color2, vUv.y), 1.0);
    }
  `;
    const uniforms = {
      color1: { value: new THREE.Color('#AD004C') },
      color2: { value: new THREE.Color('#008B8B') },
    };
    return (
      <mesh ref={ref} position={position}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#008B8B" />
      </mesh>
    );
  };

  export default Cube;