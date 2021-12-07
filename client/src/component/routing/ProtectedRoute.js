import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import Spinner from 'react-bootstrap/Spinner'
import { Navigate } from 'react-router-dom'
import NavbarMenu from '../layouts/NavbarMenu'

const ProtectedRoute = ({ children }) => {
	
	const {
		authState: { authLoading, isAuthenticated }
	} = useContext(AuthContext)

	if (authLoading)
		return (
			<div className='spinner-container'>
				<Spinner animation='border' variant='info' />
			</div>
		)
	return (
		isAuthenticated ? (
			<div className="home">
				<NavbarMenu />
				{children}
			</div>
		) : <Navigate to="/login" />
	)
}

export default ProtectedRoute