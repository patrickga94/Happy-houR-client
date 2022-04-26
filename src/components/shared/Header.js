import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'
const linkStyle = {
    color: 'white',
    textDecoration: 'none'
}



const unauthenticatedOptions = (
	<>
        <Nav.Item className='m-2' >
		    <Link to='guest/sign-up' style={linkStyle}>Guest Sign Up</Link>
        </Nav.Item>
        <Nav.Item className='m-2' >
		    <Link to='guest/sign-in' style={linkStyle}>Guest Sign In</Link>
        </Nav.Item>
		<Nav.Item className='m-2' >
		    <Link to='establishment/sign-up' style={linkStyle}>Establishment Sign Up</Link>
        </Nav.Item>
        <Nav.Item className='m-2' >
		    <Link to='establishment/sign-in' style={linkStyle}>Establishment Sign In</Link>
        </Nav.Item>
	</>
)


const alwaysOptions = (
	<>
		<Nav.Link>
			<Link to='/' style={linkStyle}>
				Home
			</Link>
		</Nav.Link>
	</>
)

const Header = ({ user }) => {
	let authenticatedOptions
	if(user){
		const guestAuthenticatedOptions = (
			<>
				<Nav.Item className='m-2'>
					<Link to={`happy-hours/index/${user.city}`} style={linkStyle}>
						Local Happy Hours
					</Link>
				</Nav.Item>
				<Nav.Item className='m-2'>
					<Link to={`happy-hours/favorites`} style={linkStyle}>
						Favorites
					</Link>
				</Nav.Item>
				<Nav.Item className='m-2'>
					<Link to='guest/change-password' style={linkStyle}>
						Change Password
					</Link>
				</Nav.Item>
				<Nav.Item className='m-2' >
					<Link to='guest/sign-out' style={linkStyle}>
						Sign Out
					</Link>
				</Nav.Item>
			</>
		)
		
		const estabAuthenticatedOptions = (
			<>
				<Nav.Item className='m-2' >
					<Link to='happy-hours' style={linkStyle}>
						All happy hours
					</Link>
				</Nav.Item>
				<Nav.Item className='m-2' >
					<Link to='/add-happy-hour' style={linkStyle}>
						Create Happy Hour
					</Link>
				</Nav.Item>
				<Nav.Item className='m-2' >
					<Link to='establishment/change-password' style={linkStyle}>
						Change Password
					</Link>
				</Nav.Item>
				<Nav.Item className='m-2' >
					<Link to='establishment/sign-out' style={linkStyle}>
						Sign Out
					</Link>
				</Nav.Item>
			</>
		)
		authenticatedOptions = (user.isGuest ? guestAuthenticatedOptions : estabAuthenticatedOptions)
	}
	return (
		<Navbar bg='primary' variant='dark' expand='md'>
			<Navbar.Brand>
				<Link to='/' className='m-2' style={linkStyle}>
					Happy houR
				</Link>
			</Navbar.Brand>
			<Navbar.Toggle aria-controls='basic-navbar-nav' />
			<Navbar.Collapse id='basic-navbar-nav'>
				<Nav className='ml-auto'>
					{user && (
						<span className='navbar-text mr-2'>{user.username}</span>
					)}
					{alwaysOptions}
					{user ? authenticatedOptions : unauthenticatedOptions}
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	)
}

export default Header
