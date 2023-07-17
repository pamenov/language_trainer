import { Container, Input, Title, Main, Form, Button } from '../../Components'
import styles from './styles.module.css'
import { useFormWithValidation } from '../../Utils'
import { AuthContext } from '../../Contexts'
// import { Redirect } from 'react-router-dom'
import { useContext } from 'react'
// import MetaTags from 'react-meta-tags'

const ChangePassword = ({ onPasswordChange }) => {
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation()
  const authContext = useContext(AuthContext)

  return <Main>
    <Container>
      {/* <MetaTags>
        <title>Change password</title>
        <meta name="description" content="Продуктовый помощник - Изменить пароль" />
        <meta property="og:title" content="Изменить пароль" />
      </MetaTags> */}
      <Title title='Change password' />
      <Form
        className={styles.form}
        onSubmit={e => {
          e.preventDefault()
          onPasswordChange(values)
        }}
      >
        <Input
          required
          label='Current password'
          type='password'
          name='current_password'
          onChange={handleChange}
        />
        <Input
          required
          label='New password'
          type='password'
          name='new_password'
          onChange={handleChange}
        />
        <Input
          required
          label='Confirm password'
          type='password'
          name='re_new_password'
          onChange={handleChange}
        />
        <Button
          modifier='style_dark-blue'
          type='submit'
          // disabled={!isValid || values.new_password !== values.repeat_password}
        >
          Change
        </Button>
      </Form>
    </Container>
  </Main>
}

export default ChangePassword