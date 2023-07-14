import { Container, Input, Title, Main, Form, Button } from '../../Components'
import styles from './styles.module.css'
import { useFormWithValidation } from '../../Utils'
import { AuthContext } from '../../Contexts'
// import { Redirect } from 'react-router-dom'
import { useContext } from 'react'
// import MetaTags from 'react-meta-tags'

const ResetPassword = () => {
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation()
  const authContext = useContext(AuthContext)

  return <Main>
    <Container>
      {/* <MetaTags>
        <title>Change password</title>
        <meta name="description" content="Продуктовый помощник - Изменить пароль" />
        <meta property="og:title" content="Изменить пароль" />
      </MetaTags> */}
      <Title title='Reset passwword' />
      <p>We've send you link on your e-mail</p>


    </Container>
  </Main>
}

export default ResetPassword