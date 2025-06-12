import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

function App() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(container.current, { opacity: 1, duration: 1 });
  }, { scope: container, dependencies: [] });

  return (
    <div ref={container} className="opacity-0">
      <h1 className="text-4xl font-bold text-center text-[color:var(--color-primary)]">
        Bienvenue au Restaurant
      </h1>
    </div>
  );
}

export default App;
