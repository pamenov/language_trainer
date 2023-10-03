import styles from './style.module.css'
import { LinkComponent, Icons, Button} from '../index'
import { useState, useContext } from 'react'
import { AuthContext, UserContext } from '../../Contexts'

const WordCard = ({
  word
}) => {
    return <div className={styles.word}>
      <p>{word}</p>  
    </div>
}

export default WordCard