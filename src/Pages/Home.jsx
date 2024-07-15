import React, { useRef } from 'react';
import '../Components/CubeWorld'
import CubeWorld from '../Components/CubeWorld';
import '../Assets/styles/HomeStyles.css'
import Typed from 'typed.js';
const HomePage = () => {
  const span = useRef(null);

  React.useEffect(() => {
    const typed = new Typed(span.current, {
      strings: ['Developer','Designer', 'Programmer'],
      typeSpeed: 150,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return <>
    <CubeWorld/>
    <section className='first-section'>
      <div className="main">
      <h1 className='main-title'>Mauricio Ramirez Castro</h1>
      <h3 className='main-subtitle'>Web <span ref={span} className='main-subtitle-span'></span></h3>
      </div>

    </section>
  </>
};

export default HomePage