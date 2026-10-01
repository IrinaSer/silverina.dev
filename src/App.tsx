import { About } from './components/About/About';
import { Contact } from './components/Contact/Contact';
import { Experiments } from './components/Experiments/Experiments';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Hero } from './components/Hero/Hero';
import { SelectedWork } from './components/SelectedWork/SelectedWork';
import styles from './App.module.css';

function App() {
  return (
    <>
      <Header />

      <main id="top" className={styles.main}>
        <Hero />
        <SelectedWork />
        <Experiments />
        <About />
        <Contact />
      </main>

      <Footer />
    </>
  );
}

export default App;
