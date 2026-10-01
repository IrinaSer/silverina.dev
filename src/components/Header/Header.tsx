import { site } from '../../data/site';
import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a className={styles.logo} href="#top">
          {site.name}
        </a>

        <nav aria-label="Primary">
          <ul className={styles.nav}>
            <li>
              <a href="#work">Work</a>
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
