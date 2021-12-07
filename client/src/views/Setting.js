import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
const Setting = () => {
    return (
		<>
			<Form className='container' >
				<Form.Group>
					<Form.Control
						type='text'
						placeholder='Username'
						name='username'
						required
						
					/>
				</Form.Group>
				<Form.Group>
					<Form.Control
						type='password'
						placeholder='Password'
						name='password'
						required
					
					/>
				</Form.Group>
				<Button variant='success' type='submit'>
					Login
				</Button>
			</Form>
		
		</>
	)
}

export default Setting
