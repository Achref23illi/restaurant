import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Header from './components/Header';
import Hero from './components/Hero';

gsap.registerPlugin(useGSAP);

function App() {
  return (
    <>
      <Header />
      <Hero />
    </>
  );
}

export default App;
