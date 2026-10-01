import { site } from './data/site';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <a className={styles.logo} href="#top">
          {site.name}
        </a>
      </header>

      <main id="top" className={styles.main}>
        <h1 className={styles.title}>{site.name}</h1>
        <p className={styles.note}>silverina.dev is alive.</p>
      </main>

      <footer className={styles.footer}>
        <p>© 2026</p>
      </footer>
    </div>
  );
}

export default App;
