// import React, { Component, Fragment } from 'react'
import React, { useState, Fragment } from 'react'
import { Route, Routes } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

// import AuthenticatedRoute from './components/shared/AuthenticatedRoute'
import AutoDismissAlert from './components/shared/AutoDismissAlert/AutoDismissAlert'
import Header from './components/shared/Header'
import RequireAuth from './components/shared/RequireAuth'
import Home from './components/Home'
import GuestSignUp from './components/guest-auth/GuestSignUp'
import GuestSignIn from './components/guest-auth/GuestSignIn'
import GuestSignOut from './components/guest-auth/GuestSignOut'
import GuestChangePassword from './components/guest-auth/GuestChangePassword'
import EstabSignUp from './components/establishment-auth/EstabSignup'
import EstabSignIn from './components/establishment-auth/EstabSignin'
import EstabSignOut from './components/establishment-auth/EstabSignout'
import EstabChangePassword from './components/establishment-auth/EstabChangePassword'
import IndexHappyHours from './components/happy-hours/IndexHappyHours'
import ShowHappyHour from './components/happy-hours/ShowHappyHour'
import CreateHappyHour from './components/happy-hours/CreateHappyHour'
import CityHappyHours from './components/happy-hours/CityHappyHours'
import TaggedCityHappyHours from './components/happy-hours/TaggedCityHappyHours'

const App = () => {

  const [user, setUser] = useState(null)
  const [msgAlerts, setMsgAlerts] = useState([])

  console.log('user in app', user)
  console.log('message alerts', msgAlerts)
  const clearUser = () => {
    console.log('clear user ran')
    setUser(null)
  }

	const deleteAlert = (id) => {
		setMsgAlerts((prevState) => {
			return (prevState.filter((msg) => msg.id !== id) )
		})
	}

	const msgAlert = ({ heading, message, variant }) => {
		const id = uuid()
		setMsgAlerts(() => {
			return (
				[{ heading, message, variant, id }]
      )
		})
	}

		return (
			<Fragment>
				<Header user={user} />
				<Routes>
					<Route path='/' element={<Home msgAlert={msgAlert} user={user} />} />
					<Route
						path='/guest/sign-up'
						element={<GuestSignUp msgAlert={msgAlert} setUser={setUser} />}
					/>
					<Route
						path='/guest/sign-in'
						element={<GuestSignIn msgAlert={msgAlert} setUser={setUser} />}
					/>
					<Route
						path='/guest/sign-out'
						element={
						<RequireAuth user={user}>
							<GuestSignOut msgAlert={msgAlert} clearUser={clearUser} user={user} />
						</RequireAuth>
						}
					/>
					<Route
						path='/guest/change-password'
						element={
						<RequireAuth user={user}>
							<GuestChangePassword msgAlert={msgAlert} user={user} />
						</RequireAuth>}
					/>
										<Route
						path='/establishment/sign-up'
						element={<EstabSignUp msgAlert={msgAlert} setUser={setUser} />}
					/>
					<Route
						path='/establishment/sign-in'
						element={<EstabSignIn msgAlert={msgAlert} setUser={setUser} />}
					/>
					<Route
						path='/establishment/sign-out'
						element={
						<RequireAuth user={user}>
							<EstabSignOut msgAlert={msgAlert} clearUser={clearUser} user={user} />
						</RequireAuth>
						}
					/>
					<Route
						path='/establishment/change-password'
						element={
						<RequireAuth user={user}>
							<EstabChangePassword msgAlert={msgAlert} user={user} />
						</RequireAuth>}
					/>
					<Route
						path='/happy-hours'
						element={
							<RequireAuth user={user}>
								<IndexHappyHours msgAlert={msgAlert} user={user} />
							</RequireAuth>
							}
					/>
					<Route
						path='/happy-hours/index/:city/:tag'
						element={
							<RequireAuth user={user}>
								<TaggedCityHappyHours msgAlert={msgAlert} user={user} />
							</RequireAuth>
							}
					/>
					<Route
						path='/happy-hours/index/:city'
						element={
							<RequireAuth user={user}>
								<CityHappyHours msgAlert={msgAlert} user={user} />
							</RequireAuth>
							}
					/>
					<Route
						path='/happy-hours/mine'
						element={
							<RequireAuth user={user}>
								<IndexHappyHours msgAlert={msgAlert} user={user} />
							</RequireAuth>
							}
					/>
					<Route
						path='/happy-hours/:id'
						element={
							<RequireAuth user={user}>
								<ShowHappyHour msgAlert={msgAlert} user={user} />
							</RequireAuth>
							}
					/>
					<Route
						path='/add-happy-hour'
						element={
							<RequireAuth user={user}>
								<CreateHappyHour msgAlert={msgAlert} user={user} />
							</RequireAuth>
							}
					/>
				</Routes>
				{msgAlerts.map((msgAlert) => (
					<AutoDismissAlert
						key={msgAlert.id}
						heading={msgAlert.heading}
						variant={msgAlert.variant}
						message={msgAlert.message}
						id={msgAlert.id}
						deleteAlert={deleteAlert}
					/>
				))}
			</Fragment>
		)
}

export default App
