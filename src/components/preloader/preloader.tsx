import styles from './styles.module.css'

export function Preloader() {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.spinner}></div>
    </div>
  );
}
