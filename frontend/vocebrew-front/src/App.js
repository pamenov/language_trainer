import './App.css';
import {Route, Link, Routes, NavLink, useNavigate} from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import Word from './Pages/word/Word';
import Login from './Pages/login/Login';
// import Logout from './Components/auth/Logout'
import Register from './Pages/register/Register'
import { Header, Footer, ProtectedRoute } from './Components'
import auth_api from './Api/auth_api'
import styles from './styles.module.css'
import cn from 'classnames'

import {
  // Main,
  // Cart,
  SignIn,
  // Subscriptions,
  // Favorites,
  WordsetDetail,
  SignUp,
  // RecipeEdit,
  // RecipeCreate,
  // User,
  ChangePassword,
  ResetPassword,
  CheckEmailForResetLink,
  ListsPage,
} from './Pages'
import { AuthContext, UserContext } from './Contexts'
import ResetPasswordConfirm from './Pages/confirm-reset-password';


function App() {
  const navigate = useNavigate()

  const [ loggedIn, setLoggedIn ] = useState(false)
  const [ user, setUser ] = useState(null)
  const [ menuToggled, setMenuToggled ] = useState(false)

  useEffect(() => {
    async function tryToGetUser() {
      const token = localStorage.getItem('access_token')
      if (token) {
        try {
          let res = await auth_api.load_user()
          if (res.code === "token_not_valid") {
            const new_access = await auth_api.refresh_token()
            localStorage.setItem("access_token", new_access)
            res = await auth_api.load_user()
          }
          setUser(res)
          setLoggedIn(true)
            // getOrders()
        }
        catch(err) {
          setLoggedIn(false)
          navigate('/signin')
        }
      }
    }
    tryToGetUser();
  }, [])


  async function registration({
    email, password, name, re_password
  }) {
    try {
      const reg_response = await auth_api.signup({ email, password, name, re_password });
      try {
        await authorization({ email, password });
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const onSignOut = () => {
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
    setLoggedIn(false)
    setUser(null)
  }

  const changePassword = async ({
    new_password,
    re_new_password,
    current_password
  }) => {
    try {
      const response = await auth_api.changePassword({ new_password, current_password, re_new_password })
      navigate('/wordsets')
    } catch(error) {
      console.log(error)
    }
  }

  const sendResetEmail = async ({email}) => {
    try{
      const response = await auth_api.reset_password(email)
      return response
    } catch(error) {
      console.error(error)
    }
  }

  const confirmResetPassword = async ({uid, token, new_password, re_new_password}) => {
    try {
      const response = await auth_api.confirm_reset_password({uid, token, new_password, re_new_password})
      navigate('/signin')
      return response
    } catch(error) {
      console.error(error)
    }
  }

  const authorization = async ({
    email, password
  }) => {
    try {
      const res = await auth_api.signin({email, password})
      localStorage.setItem('access_token', res.access)
      localStorage.setItem('refresh_token', res.refresh)
      try {
        const user_res = await auth_api.load_user()
        setUser(user_res)
        setLoggedIn(true)
        navigate("/")
      } catch(error) {
        console.error(error)
      }
    } catch(error) {
      console.error(error)
    }
  }

  return (
    <AuthContext.Provider value={loggedIn}>
    <UserContext.Provider value={user}>
      <div className={cn("App", {
        [styles.appMenuToggled]: menuToggled
      })}>
        <div
          className={styles.menuButton}
          onClick={_ => setMenuToggled(!menuToggled)}
        >
        </div>
        <Header loggedIn={loggedIn} onSignOut={onSignOut} />
        <Routes>
          <Route
            exact
            path='/wordsets'
            element = {<ListsPage/>}
          />
          <Route
            exact
            path='/wordset/:id'
            element = {<WordsetDetail/>}
          />

          <Route 
            exact 
            path='/signin'
            element = {<SignIn
              onSignIn={authorization}
            />}
          />
          <Route 
            exact 
            path='/signup'
            element={<SignUp
              onSignUp={registration}
            />}
          />
          <Route 
            exact 
            path='/resetpassword'
            element={<ResetPassword sendResetEmail={sendResetEmail}/>}
          />
          <Route
            exact
            path='/check-your-email'
            element = {<CheckEmailForResetLink/>}
          />
          <Route 
            exact 
            path='/password/reset/confirm/:uid/:token'
            element={<ResetPasswordConfirm onResetPasswordConfirm={confirmResetPassword} />}
          />          
          <Route
            exact
            path='/change-password'
            element={
              <ProtectedRoute isSignedIn={loggedIn}>
                <ChangePassword onPasswordChange={changePassword}/>
              </ProtectedRoute>
            }
            loggedIn={loggedIn}
            onPasswordChange={changePassword}
          />
        </Routes>
        <Footer />
      </div>
    </UserContext.Provider>
  </AuthContext.Provider>
  );
}

export default App;


          {/* <ProtectedRoute
            exact
            path='/cart'
            component={Cart}
            orders={orders}
            loggedIn={loggedIn}
            updateOrders={updateOrders}
          /> */}
          {/* <ProtectedRoute
            exact
            path='/subscriptions'
            component={Subscriptions}
            loggedIn={loggedIn}
          /> */}

          {/* <ProtectedRoute
            exact
            path='/favorites'
            component={Favorites}
            loggedIn={loggedIn}
            updateOrders={updateOrders}
          /> */}

          {/* <ProtectedRoute
            exact
            path='/recipes/create'
            component={RecipeCreate}
            loggedIn={loggedIn}
          /> */}

          {/* <ProtectedRoute
            exact
            path='/recipes/:id/edit'
            component={RecipeEdit}
            loggedIn={loggedIn}
            loadItem={loadSingleItem}
          /> */}


          {/* <Route
            exact
            path='/recipes/:id'
          > */}
            {/* <SingleCard
              loggedIn={loggedIn}
              loadItem={loadSingleItem}
              updateOrders={updateOrders}
          </Route>
            /> */}



{/* <div className="App"> */}
{/* <nav className="navbar navbar-light bg-light"> */}
    // <ul className="navbar-nav flex-row mr-auto">
      // <li>
        // <NavLink to="/" className="nav-link mx-2">Home</NavLink>
      // </li>
      // <li>
        // <NavLink to="/profile" className="nav-link mx-2">Profile</NavLink>
      // </li>
      // <li>
        // <NavLink to="/shop" className="nav-link mx-2">Shop</NavLink>
      // </li>
    // </ul>
// </nav>
{/* <Routes> */}
  // <Route path="/" element={<Word/>}/>
  // <Route path="/word/:id" element={<Word/>}/>
  // <Route path="/auth/token/login" element={<Login/>}/>
  {/* <Route path="/auth/token/logout" element={<Logout/>}/> */}
  // <Route path="/auth/users" element={<Register/>}/>

// </Routes>

// </div>