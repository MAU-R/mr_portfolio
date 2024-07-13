import React from 'react';
import '../Components/CubeWorld'
import CubeWorld from '../Components/CubeWorld';
import '../Assets/styles/HomeStyles.css'
const HomePage = () => {
  return <>
    <CubeWorld/>
    <div className="main">
      <h1 className='main-Title'>Mauricio Ramirez Castro</h1>
      <h3 className='main-subtitle'>Web<span className='main-subtitle-span'>Developer</span></h3>
    </div>
  </>
};

export default HomePage