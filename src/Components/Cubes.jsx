
import React, { useEffect, useRef, useState } from 'react';
import {useFrame } from '@react-three/fiber';
import '../Assets/styles/cubeField.css';

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
        ref.current.position.y = position[1];
      }
      const x=ref.current.position.x >=0 ? ref.current.position.x*-1 :ref.current.position.x;
     
      const distancex = ((x-cameraPosition.toArray()[0])+16)/3;
      const dinstancez= ((ref.current.position.z)-cameraPosition.toArray()[2])+16;
      const distance = distancex+dinstancez;
      //console.log("Distancia en dx:: ",distancex)


      if(scroll>(window.innerHeight*0.05))
      ref.current.position.y -= (scroll-(window.innerHeight*0.05)) * 0.0009 * Math.exp(distance/1.3);

      ref.current.material.opacity = Math.max(1 - (scroll) * 0.0005, 0);
      ref.current.material.transparent = true;
    
    });
  
    return (
      <mesh ref={ref} position={position}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="green" />
      </mesh>
    );
  };

  export default Cube;