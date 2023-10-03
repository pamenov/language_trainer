import styles from './styles.module.css'
import { useContext, useEffect, useState } from 'react'
import { Button, LinkComponent } from '../index.js'
import { AuthContext, UserContext } from '../../Contexts'

const AccountMenu = ({ onSignOut }) => {
  // const user = useState("user")
  const authContext = useContext(AuthContext)
  const user = useContext(UserContext)

  // useEffect(_ => {

  //   }
  // )

  if (!authContext) {
    return <div className={styles.menu}>
      <LinkComponent
        className={styles.menuLink}
        href='/signin'
        title='Login'
      />
      <LinkComponent
        href='/signup'
        title='Create account'
        className={styles.menuButton}
      />
    </div>
  }
  return <div className={styles.menu}>
    <p>{`${user.name}`}</p>
    <LinkComponent
      className={styles.menuLink}
      href='/change-password'
      title='Change password'
    />
    <a
      className={styles.menuLink}
      onClick={onSignOut}
    >
      Logout
    </a>
  </div>
}


export default AccountMenu