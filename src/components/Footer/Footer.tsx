import { site } from '../../data/site';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.name}>{site.name}</p>
        <p>© 2026</p>
        <p>Built with React · TypeScript</p>
      </div>
    </footer>
  );
}
