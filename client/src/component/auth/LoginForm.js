import React from 'react'
import { Link } from 'react-router-dom'
import { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import AlertMessage from '../layouts/Alert'

const LoginForm = () => {
  const { loginUser } = useContext(AuthContext)

	// Local state
	const [loginForm, setLoginForm] = useState({
		username: '',
		password: ''
	})

	const [alert, setAlert] = useState(null)

	const { username, password } = loginForm

	const onChangeLoginForm = event =>
		setLoginForm({ ...loginForm, [event.target.name]: event.target.value })

	const login = async event => {
		event.preventDefault()

		try {
			const loginData = await loginUser(loginForm)
			if (!loginData.success) {
				setAlert({ type: 'danger', message: loginData.message })
				setTimeout(() => setAlert(null), 5000)
			}
		} catch (error) {
			console.log(error)
		}
	}
    return (
        <form onSubmit={login}>
      	<AlertMessage info={alert} />
          <h1>Sign In</h1>
          <input type="username" name='username' placeholder="Username" required  value={username} onChange={onChangeLoginForm}/>
          <input type="password" name='password' placeholder="Password" required value={password} onChange={onChangeLoginForm} />
          <input type='submit' variant='success' className="loginButton" value='Sign in' />
          <span>
            New to Netflix? 
            <Link to='/register'>
                Register
            </Link>
          </span>
          <small>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot. 
          </small>
        </form>
    )
}

export default LoginForm
