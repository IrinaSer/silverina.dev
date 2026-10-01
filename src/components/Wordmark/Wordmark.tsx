import { site } from '../../data/site';
import styles from './Wordmark.module.css';

// The brand mark as live text. Its size comes from the parent's font-size.
export function Wordmark() {
  return <span className={styles.wordmark}>{site.name}</span>;
}
