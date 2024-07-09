import React, {useState, useEffect}from 'react';
import { Canvas, useThree} from '@react-three/fiber';
import '../Assets/styles/cubeField.css';
import CubesField from './CubeField';



const CubeWorld = () => {

  const [scroll, setScroll] = useState(0);

  const handleScroll = () => {

    setScroll(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);



  return (
   
    <div className='main-canvas'>
    <Canvas  camera={{ position: [1.1, 1.7, 8], rotation:[-0.15,0,0]}}>
      <ambientLight intensity={0} />
      <pointLight position={[1, 2, 1]} intensity={15} />
      <pointLight position={[1, 2, 8]} intensity={15} />
      <pointLight position={[1, 2, -8]} intensity={15} />
      <CubesField scroll={scroll} />
    </Canvas>
    </div>
  );
};

export default CubeWorld