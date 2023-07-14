import { Container, Input, Title, Main, Form, Button } from '../../Components'
// import Button from '../../Components/button'
// import Input from '../../Compo'
import styles from './styles.module.css'
import { useFormWithValidation } from '../../Utils'
import { AuthContext } from '../../Contexts'
import { Link, Navigate } from 'react-router-dom'
import { useContext } from 'react'
// import MetaTags from 'react-meta-tags'

const SignIn = ({ onSignIn }) => {
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
      <Title title='Login' />
      <Form
        className={styles.form}
        onSubmit={e => {
          e.preventDefault()
          onSignIn(values)
        }}
      >
        <Input
          required
          label='Email'
          name='email'
          onChange={handleChange}
        />
        <Input
          required
          label='Password'
          type='password'
          name='password'
          onChange={handleChange}
        />
        <Button
          modifier='style_dark-blue'
          disabled={!isValid}
          type='submit'
          className={styles.button}
        >
          Login
        </Button>
        <p className={styles.reset}> 
          Forgot your password? <Link to='/resetpassword'> Reset </Link>
        </p>
      </Form>
    </Container>
  </Main>
}

export default SignIn
