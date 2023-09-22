import { Container, Input, Title, Main, Form, Button } from '../../Components'
import styles from './styles.module.css'
import { useFormWithValidation } from '../../Utils'
import { AuthContext } from '../../Contexts'
// import { Redirect } from 'react-router-dom'
import { useContext, useState} from 'react'
import { Navigate } from 'react-router-dom'
// import MetaTags from 'react-meta-tags'

const ResetPassword = ({sendResetEmail}) => {
  const [requestHasBeenSent, setRequestHasBeenSent] = useState(false)
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation()
  const authContext = useContext(AuthContext)

  if (requestHasBeenSent) {
    return <Navigate to='/check-your-email' />
  }

  return <Main>
    {/* {authContext && <Navigate to='/' />} */}
    <Container>
      {/* <MetaTags>
        <title>Login</title>
        <meta name="description" content="Vocebrew - Login" />
        <meta property="og:title" content="Login" />
      </MetaTags> */}
      <Title title='Reset password' />
      <Form
        className={styles.form}
        onSubmit={e => {
          e.preventDefault()
          sendResetEmail(values)
          setRequestHasBeenSent(true)
        }}
      >
        <Input
          required
          label='Email'
          name='email'
          onChange={handleChange}
        />
        <Button
          modifier='style_dark-blue'
          disabled={!isValid}
          type='submit'
          className={styles.button}
        >
          Send me email
        </Button>
        {/* <p className={styles.reset}> 
          Forgot your password? <Link to='/resetpassword'> Reset </Link>
        </p> */}
      </Form>
    </Container>
  </Main>
}

export default ResetPassword
