import React from "react"
import MyHappyHours from "./happy-hours/MyHappyHours"

const Home = (props) => {
	const { msgAlert, user } = props
	console.log('props in home', props)
	let userPage = <p>click around</p>
	if(user) {
		if(!user.isGuest){
			userPage = <MyHappyHours user={user} />
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
