
import React, { useEffect, useRef, useState } from 'react';
import {useFrame } from '@react-three/fiber';
import '../Assets/styles/cubeField.css';

const Cube = ({ position, isActive, scroll}) => {
    const ref = useRef();
    const [offset] = useState(Math.random() * 2 * Math.PI); // Aleatorio para cada cubo
    const cycleDuration = 5 * Math.PI; // Duración del ciclo completo de la animación
  
    useFrame((state, delta) => {
      if (isActive) {
        const elapsedTime = state.clock.getElapsedTime();
        const cycleTime = (elapsedTime + offset) % cycleDuration;
        ref.current.position.y = position[1] + Math.sin(cycleTime)*0.3;
      } else {
        ref.current.position.y = position[1];
      }
      if(scroll>(window.innerHeight*0.40)){ 
      ref.current.position.y -= (scroll-(window.innerHeight*0.40)) * 0.01;
      ref.current.material.opacity = Math.max(1 - scroll * 0.001, 0);
      ref.current.material.transparent = true;}
    
    });
  
    return (
      <mesh ref={ref} position={position}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="green" />
      </mesh>
    );
  };

  export default Cube;