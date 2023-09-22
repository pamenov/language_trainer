import styles from './styles.module.css'

const Wordlist = ({ words }) => {
  if (!words) { return null }
  return <div className={styles.words}>
    <h3 className={styles['words__title']}>Words:</h3>
    <div className={styles['words__list']}>
      {words.map(({
        hebrew,
        english,
        // measurement_unit
      }) => <p
        key={`${hebrew}${english}`}
        className={styles['words__list-item']}
      >
        {hebrew} - {english}
      </p>)}
    </div>
  </div>
}

export default Wordlist

