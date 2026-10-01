import { site } from '../../data/site';
import styles from './Experiments.module.css';

// Areas of interest, not projects: plain text until one of them has something real to link to.
const topics = ['Chrome extensions', 'UI experiments', 'Creative coding', 'Tiny tools'];

export function Experiments() {
  return (
    <section id="experiments" className={styles.section} aria-labelledby="experiments-title">
      <h2 id="experiments-title" className="section-label">
        Experiments
      </h2>

      <div className={styles.content}>
        <div className={styles.intro}>
          <p className={styles.lead}>
            Small things I make when I want to understand how something works.
          </p>
          <p className={styles.topics}>{topics.join(' · ')}</p>
        </div>

        <ol className={styles.list}>
          {site.experiments.map((experiment, index) => (
            <li key={experiment.name} className={styles.item}>
              <a className={styles.link} href={experiment.url} target="_blank" rel="noreferrer">
                <span className={styles.number} aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <span className={styles.body}>
                  <span className={styles.name}>{experiment.name}</span>
                  <span className={styles.description}>{experiment.description}</span>
                  <span className={styles.meta}>{experiment.technologies.join(' · ')}</span>
                </span>

                <span className={styles.arrow} aria-hidden="true">
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
