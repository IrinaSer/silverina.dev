import styles from './Experiments.module.css';

// Categories, not projects: they stay non-interactive until they have a real destination.
const experiments = ['Chrome extensions', 'UI experiments', 'Creative coding', 'Tiny tools'];

export function Experiments() {
  return (
    <section id="experiments" className={styles.section} aria-labelledby="experiments-title">
      <h2 id="experiments-title" className="section-label">
        Experiments
      </h2>

      <div className={styles.content}>
        <p className={styles.intro}>
          Small things I make when I want to understand how something works.
        </p>

        <ol className={styles.list}>
          {experiments.map((name, index) => (
            <li key={name} className={styles.item}>
              <span className={styles.number} aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              {name}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
