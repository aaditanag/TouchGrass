import { useRef } from 'react';
import Hero from './components/Hero';
import PaperFlip from './components/PaperFlip';
import StampsSection from './components/StampsSection';
import CoffeeMug from './components/CoffeeMug';
import ColoringSection from './components/ColoringSection';
import BouquetSection from './components/BouquetSection';
import Contact from './components/Contact';
import PathButterfly from './components/PathButterfly';
import { useAudio } from './hooks/useAudio';
import './App.css';

function App() {
  const aboutRef   = useRef(null);
  const coffeeRef  = useRef(null);
  const bouquetRef = useRef(null);
  const { playing, toggle } = useAudio();

  const scrollToAbout   = () => aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
  const scrollToCoffee  = () => coffeeRef.current?.scrollIntoView({ behavior: 'smooth' });
  const scrollToBouquet = () => bouquetRef.current?.scrollIntoView({ behavior: 'smooth' });

  return (
    <>
      <PathButterfly />
      <button
        className="audio-toggle"
        onClick={toggle}
        aria-label={playing ? 'Mute bird sounds' : 'Play bird sounds'}
        title={playing ? 'Mute bird ambience' : 'Play bird ambience 🐦'}
      >
        {playing ? '🔊' : '🔇'}
      </button>

      <main>
        <Hero
          onPaperClick={scrollToAbout}
          onCoffeeClick={scrollToCoffee}
          onBouquetClick={scrollToBouquet}
        />
        <PaperFlip forwardRef={aboutRef} />
        <StampsSection />
        <BouquetSection bouquetRef={bouquetRef} />
        <CoffeeMug coffeeRef={coffeeRef} />
        <ColoringSection />
        <Contact />
      </main>
    </>
  );
}

export default App;
