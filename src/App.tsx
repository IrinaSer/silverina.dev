import { About } from './components/About/About';
import { Experiments } from './components/Experiments/Experiments';
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
      </main>

      <footer className={styles.footer}>
        <p>© 2026</p>
      </footer>
    </>
  );
}

export default App;
