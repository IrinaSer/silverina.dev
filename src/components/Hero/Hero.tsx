import { site } from '../../data/site';
import styles from './Hero.module.css';

const stack = ['TypeScript', 'Angular', 'React'];

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <h1 id="hero-title" className={styles.title}>
        <span className={styles.line}>Frontend</span>{' '}
        <span className={styles.line}>Developer</span>
      </h1>

      <div className={styles.details}>
        <p className={styles.lead}>I build thoughtful interfaces and useful little things.</p>

        <div className={styles.meta}>
          <p className={styles.stack}>{stack.join(' · ')}</p>

          <div className={styles.actions}>
            <a className={styles.link} href="#work">
              Explore work <span aria-hidden="true">↓</span>
            </a>

            {site.links.github && (
              <a
                className={`${styles.link} ${styles.secondary}`}
                href={site.links.github}
                target="_blank"
                rel="noreferrer"
              >
                GitHub <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
