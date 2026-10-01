import { site } from '../../data/site';
import styles from './About.module.css';

const currently = ['Building Hushfeed', 'Learning React', 'Making things'];

export function About() {
  return (
    <section id="about" className={styles.section} aria-labelledby="about-title">
      <h2 id="about-title" className="section-label">
        About
      </h2>

      <p className={styles.bio}>
        I’m Irina, a frontend developer interested in interfaces, systems and the small details that
        make software feel good to use.
      </p>

      <dl className={styles.facts}>
        <div>
          <dt>Role</dt>
          <dd>Frontend Developer</dd>
        </div>

        <div>
          <dt>Stack</dt>
          {site.stack.map((item) => (
            <dd key={item}>{item}</dd>
          ))}
        </div>

        <div>
          <dt>Currently</dt>
          {currently.map((item) => (
            <dd key={item}>{item}</dd>
          ))}
        </div>
      </dl>
    </section>
  );
}
