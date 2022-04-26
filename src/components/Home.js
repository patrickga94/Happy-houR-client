import React from "react"
import MyHappyHours from "./happy-hours/MyHappyHours"
import { Link } from 'react-router-dom'

const Home = (props) => {
	const { msgAlert, user } = props
	console.log('props in home', props)
	let userPage = <p>click around</p>
	if(user) {
		if(!user.isGuest){
			userPage = <MyHappyHours user={user} />
		} else {
			userPage = (
				<Link className='home-link' to={`/happy-hours/index/${user.city}`}>View happy hours in your city</Link>
			)
		}
	}


	return (
		<>
			<h2>Home Page</h2>
			{userPage}
		</>
	)
}

export default Home
