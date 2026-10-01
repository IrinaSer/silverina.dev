import { Header } from './components/Header/Header';
import { Hero } from './components/Hero/Hero';
import styles from './App.module.css';

function App() {
  return (
    <>
      <Header />

      <main id="top" className={styles.main}>
        <Hero />
      </main>

      <footer className={styles.footer}>
        <p>© 2026</p>
      </footer>
    </>
  );
}

export default App;
