import React from 'react'
import LoginForm from '../component/auth/LoginForm'
import RegisterForm from '../component/auth/RegisterForm'
import { useContext } from 'react'
import { Navigate  } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
import { AuthContext } from '../contexts/AuthContext'

const Auth = ({ authRoute }) => {
	const {
		authState: { authLoading, isAuthenticated }
	} = useContext(AuthContext)

	let body

	if (authLoading)
		body = (
			<div className='d-flex justify-content-center mt-2'>
				<Spinner animation='border' variant='info' />
			</div>
		)
	else if (isAuthenticated) return <Navigate to='/dashboard' />
	else
		body = (
			<>
				{authRoute === 'login' && <LoginForm />}
				{authRoute === 'register' && <RegisterForm />}
			</>
		)

    return (
        <div className="login">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://www.freelogoservices.com/api/main/images/1j+ojVNGOMkX9W2+J1iwiGKshvKEpRZJnQiIiWcqL2VE9AlvlyQvhPFj...Q=="
            alt=""
          />
        </div>
      </div>
      <div className="container">
       {body}
      </div>
    </div>
    )
}

export default Auth
