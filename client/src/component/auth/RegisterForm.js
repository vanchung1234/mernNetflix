import React from 'react'
import { Link } from 'react-router-dom'
import { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import AlertMessage from '../layouts/Alert'

const RegisterForm = () => {
const { registerUser } = useContext(AuthContext)

	// Local state
	const [registerForm, setRegisterForm] = useState({
		username: '',
		password: '',
		repassword: ''
	})

	const [alert, setAlert] = useState(null)

	const { username, password, repassword } = registerForm

	const onChangeRegisterForm = event =>
		setRegisterForm({
			...registerForm,
			[event.target.name]: event.target.value
		})

	const register = async event => {
		event.preventDefault()

		if (password !== repassword) {
			setAlert({ type: 'danger', message: 'Passwords do not match' })
			setTimeout(() => setAlert(null), 5000)
			return
		}

		try {
			const registerData = await registerUser(registerForm)
			if (!registerData.success) {
				setAlert({ type: 'danger', message: registerData.message })
				setTimeout(() => setAlert(null), 5000)
			}
		} catch (error) {
			console.log(error)
		}
	}

    return (
        <form onSubmit={register}>
          <AlertMessage info={alert} />
        <h1>Register</h1>
        <input type="username" name='username' placeholder="Username" value={username} onChange={onChangeRegisterForm} required/>
        <input type="password" name='password' placeholder="Password" value={password} onChange={onChangeRegisterForm} required />
        <input type="password" name='repassword' placeholder="Repassword" value={repassword} onChange={onChangeRegisterForm} required />
        <input type='submit' className="loginButton" value='Sign Up' />
        <span>
          Have a account? 
          <Link to='/login'>
              Login
          </Link>
        </span>
       
      </form>
    )
}

export default RegisterForm
