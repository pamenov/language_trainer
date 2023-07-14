// import React, { useState } from 'react';

// const RegistrationForm = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     first_name: '',
//     last_name: '',
//     email: '',
//     password: '',
//     password2: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // TODO: Perform registration API call or further validation
//     fetch('http://127.0.0.1:8000/auth/users', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(formData),
//     //   mode: 'cors'
//     })
//     .then(response => console.log("then", response))
//     .catch(error => console.log("catch", error))
//     console.log(JSON.stringify(formData), "stringify")
//     console.log(formData);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label htmlFor="username">Username</label>
//         <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} />
//       </div>
//       <div>
//         <label htmlFor="name">Name</label>
//         <input type="text" id="name" name="first_name" value={formData.first_name} onChange={handleChange} />
//       </div>
//       <div>
//         <label htmlFor="lastName">Last Name</label>
//         <input type="text" id="lastName" name="last_name" value={formData.last_name} onChange={handleChange} />
//       </div>
//       <div>
//         <label htmlFor="email">Email</label>
//         <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
//       </div>
//       <div>
//         <label htmlFor="password">Password</label>
//         <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
//       </div>
//       <div>
//         <label htmlFor="confirmPassword">Confirm Password</label>
//         <input
//           type="password"
//           id="confirmPassword"
//           name="password2"
//           value={formData.password2}
//           onChange={handleChange}
//         />
//       </div>
//       <button type="submit">Register</button>
//     </form>
//   );
// };

// export default RegistrationForm;

import { Container, Input, Title, Main, Form, Button } from '../../Components'
import styles from './styles.module.css'
import { useFormWithValidation } from '../../Utils'
import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../Contexts'
// import MetaTags from 'react-meta-tags'

const SignUp = ({ onSignUp }) => {
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
      </Form>
    </Container>
  </Main>
}

export default SignUp
