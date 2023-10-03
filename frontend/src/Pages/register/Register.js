import { Container, Input, Title, Main, Form, Button, ErrorMessage } from '../../Components'
import styles from './styles.module.css'
import { useFormWithValidation } from '../../Utils'
import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../Contexts'
// import MetaTags from 'react-meta-tags'

const SignUp = ({ loginError, onSignUp }) => {
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation()
  const authContext = useContext(AuthContext)

  return <Main>
    {authContext && <Navigate to='/' />}
    <Container>
      {/* <MetaTags>
        <title>Registration</title>
        <meta name="description" content="Vocebrew registration" />
        <meta property="og:title" content="Registration" />
      </MetaTags> */}
      <Title title='Registration' />
      <Form className={styles.form} onSubmit={e => {
        e.preventDefault()
        onSignUp(values)
      }}>
        <Input
          label='Name'
          name='name'
          required
          onChange={handleChange}
        />

        <Input
          label='Email'
          name='email'
          required
          onChange={handleChange}
        />
        <Input
          label='Password'
          type='password'
          name='password'
          required
          onChange={handleChange}
        />
         <Input
          label='Repeat password'
          type='password'
          name='re_password'
          required
          onChange={handleChange}
        />       <Button
          modifier='style_dark-blue'
          type='submit'
          className={styles.button}
          disabled={!isValid}
        >
          Create account
        </Button>
        <ErrorMessage message={loginError}/>
      </Form>
    </Container>
  </Main>
}

export default SignUp
