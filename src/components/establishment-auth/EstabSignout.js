import { useNavigate } from 'react-router-dom'

import {Button, ButtonGroup} from 'react-bootstrap'

import { signOut } from '../../api/establishment-auth'
import messages from '../shared/AutoDismissAlert/messages'

const EstabSignOut = (props) => {
	const { msgAlert, clearUser, user } = props
    console.log(props)

    const navigate = useNavigate()

    const onSignOut = () => {
		signOut(user)
			.finally(() =>
				msgAlert({
					heading: 'Signed Out Successfully',
					message: messages.signOutSuccess,
					variant: 'success',
				})
			)
			.finally(() => navigate('/'))
			.finally(() => clearUser())
    }

    const onCancel = () => {
        navigate('/')
    }

	return (
		<>
            <div className='row'>
                <div className='signout'>
                    <h2>Are you sure you want to sign out?</h2>
                    <small>We hate to see you go...</small><br/>

                    <div className="d-grid gap-2">
                        <Button variant='danger' onClick={onSignOut}>
                            Sign Out
                        </Button>
                        <Button variant='warning' onClick={onCancel}>
                            Cancel
                        </Button>
                    </div>
                </div>
            </div>
		</>
	)
}

export default EstabSignOut
