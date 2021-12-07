import Alert from 'react-bootstrap/Alert'

import "./scss/Alert.scss"
const AlertMessage = ({ info }) => {
	return info === null ? null : (
		<Alert className="alertms" variant={info.type}>{info.message}</Alert>
	)
}

export default AlertMessage