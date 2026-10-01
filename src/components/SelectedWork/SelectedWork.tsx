import { site } from '../../data/site';
import styles from './SelectedWork.module.css';

type Project = (typeof site.projects)[number];

function ProjectFeature({ project }: { project: Project }) {
  const content = (
    <>
      <div className={styles.intro}>
        <h3 className={styles.name}>{project.name}</h3>

        <div className={styles.summary}>
          <p className={styles.description}>{project.description}</p>
          <p className={styles.meta}>{[project.type, ...project.technologies].join(' · ')}</p>
        </div>
      </div>

      {project.url && (
        <p className={styles.cta}>
          View project{' '}
          <span className={styles.arrow} aria-hidden="true">
            →
          </span>
        </p>
      )}
    </>
  );

  return project.url ? (
    <a className={`${styles.project} ${styles.linked}`} href={project.url} target="_blank" rel="noreferrer">
      {content}
    </a>
  ) : (
    <div className={styles.project}>{content}</div>
  );
}

export function SelectedWork() {
  return (
    <section id="work" className={styles.section} aria-labelledby="work-title">
      <h2 id="work-title" className="section-label">
        Selected work
      </h2>

      {site.projects.map((project) => (
        <article key={project.name}>
          <ProjectFeature project={project} />
        </article>
      ))}
    </section>
  );
}
