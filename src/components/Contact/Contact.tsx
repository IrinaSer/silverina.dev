import { site } from '../../data/site';
import styles from './Contact.module.css';

const links = [
  { label: 'GitHub', url: site.links.github },
  { label: 'LinkedIn', url: site.links.linkedin },
  { label: 'CV', url: site.links.cv },
].filter((link) => link.url);

export function Contact() {
  return (
    <section id="contact" className={styles.section} aria-labelledby="contact-title">
      <p className="section-label">Contact</p>

      <h2 id="contact-title" className={styles.title}>
        Let’s talk.
      </h2>

      <div className={styles.details}>
        <a className={styles.email} href={`mailto:${site.email}`}>
          {site.email}
        </a>

        {links.length > 0 && (
          <ul className={styles.links}>
            {links.map((link) => (
              <li key={link.label}>
                <a href={link.url} target="_blank" rel="noreferrer">
                  {link.label} <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
