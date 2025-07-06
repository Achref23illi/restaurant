import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Gallery from './components/Gallery';
import Menu from './components/Menu';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './i18n';

gsap.registerPlugin(useGSAP);

function App() {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <Gallery />
      <Menu />
      <Reviews />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
