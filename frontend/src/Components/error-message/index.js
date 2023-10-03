import styles from './styles.module.css'
import cn from 'classnames'

const ErrorMessage = ({ message, className }) => {
  return <p className={cn(styles.message, className)}>
    {message}
  </p>
}

export default ErrorMessage