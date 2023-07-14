import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './style.module.css'
import cn from 'classnames'

const LinkComponent = ({ href, title, className }) => {
  return <NavLink className={cn(styles.link, className)} to={href}>
    {title}
  </NavLink>
}

export default LinkComponent


// href
// title
// class

// const LinkComponent = ({ exact, href, title, className, activeClassName }) => {
//   return <NavLink exact={exact} activeClassName={activeClassName} className={cn(styles.link, className)} to={href}>
//     {title}
//   </NavLink>
// }