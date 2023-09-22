import { Container, Input, Title, Main, Form, Button } from '../../Components'
// import Button from '../../Components/button'
// import Input from '../../Compo'
import styles from './styles.module.css'
import { useFormWithValidation } from '../../Utils'
import { AuthContext, useState } from '../../Contexts'
import { Link, Navigate } from 'react-router-dom'
import { useContext } from 'react'
// import MetaTags from 'react-meta-tags'

const ResetPasswordConfirm = ({ onResetPasswordConfirm }) => {
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation()
  const authContext = useContext(AuthContext)

  return <Main>
    {authContext && <Navigate to='/' />}
    <Container>
      {/* <MetaTags>
        <title>Login</title>
        <meta name="description" content="Vocebrew - Login" />
        <meta property="og:title" content="Login" />
      </MetaTags> */}
      <Title title='Confirm reset password' />
      <Form
        className={styles.form}
        onSubmit={e => {
          e.preventDefault()
          const url_parts = e.target.action.split('/')
          const uid = url_parts[url_parts.length - 2]
          const token = url_parts[url_parts.length - 1]
          onResetPasswordConfirm({...values, uid, token})
        }}
      >
        <Input
          required
          label='Password'
          name='new_password'
          onChange={handleChange}
        />
        <Input
          required
          label='Repeat password'
          type='password'
          name='re_new_password'
          onChange={handleChange}
        />
        <Button
          modifier='style_dark-blue'
          disabled={!isValid}
          type='submit'
          className={styles.button}
        >
          Reset Password
        </Button>
      </Form>
    </Container>
  </Main>
}

export default ResetPasswordConfirm
