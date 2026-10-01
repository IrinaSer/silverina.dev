import { site } from '../../data/site';
import { Wordmark } from '../Wordmark/Wordmark';
import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a className={styles.logo} href="#top">
          <Wordmark />
        </a>

        <nav aria-label="Primary">
          <ul className={styles.nav}>
            <li>
              <a href="#work">Work</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            {site.links.github && (
              <li>
                <a href={site.links.github} target="_blank" rel="noreferrer">
                  GitHub <span aria-hidden="true">↗</span>
                </a>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
