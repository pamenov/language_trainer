import styles from './styles.module.css'
import { AuthContext, UserContext } from '../../Contexts'

const SessionCounters = ({totalCounter, correctCounter}) => {
  return <div className={styles.counter_container}>
    <p className={styles.counters}>
      Current statistics {correctCounter}/{totalCounter}
    </p>
  
  </div>
}

export default SessionCounters