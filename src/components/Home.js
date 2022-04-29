import React, {useState} from "react"
import MyHappyHours from "./happy-hours/MyHappyHours"
import { Link, useNavigate } from 'react-router-dom'
import {Container, Form, Button} from 'react-bootstrap'

const Home = (props) => {
	const { msgAlert, user } = props
	const navigate = useNavigate()
	const [search, setSearch] = useState('')
	console.log('props in home', props)
	const handleChange = (e) => {
        // e === event
        e.persist()
        //sets the search to the value of the input field
        setSearch(prevSearch => {
            const name = e.target.name
            let value = e.target.value

			if(e.target.name === 'tag'){
				value = e.target.value.toUpperCase()
			}

            const updatedValue = { [name]: value }

            console.log('prevSearch', prevSearch)
            console.log('updatedValue', updatedValue)

            return {...prevSearch, ...updatedValue}
        })
    }

	const handleTagSubmit = (e) => {
		console.log('this is search', search)
		e.preventDefault()
		navigate(`/happy-hours/index/${user.city}/${search.tag}`)
	}
	const handleCitySubmit = (e) => {
		console.log('this is search', search)
		e.preventDefault()
		navigate(`/happy-hours/index/${search.city}`)
	}

	let userPage = (
		<>
			<h1 className="mb-5">Welcome to Happy houR!</h1>
				<div className="app-description">
					<p>Happy houR is an app that believes in connecting local businesses with a fun loving, budget conscious clientele.</p>
					<p>Sign up as an establishment and start creating your happy hours!</p>
					<p>Sign up as a guest to view happy hours and add them to your favorites!</p>
				</div>
		</>

		)
	if(user) {
		if(!user.isGuest){
			userPage = <MyHappyHours user={user} />
		} else {
			userPage = (
				<>
					<h1 className="mt-3 mb-3">Welcome back, {user.username}!</h1>
					<div className="options-box">
						<h5>Going out in {user.city}?</h5>
						<Link className='btn btn-info mb-3' to={`/happy-hours/index/${user.city}`}>View happy hours in your city</Link>
						<h5>Search for tags in local happy hours:</h5>
						<Form onSubmit={handleTagSubmit} className='row gy-2 gx-3 align-items-center mb-3'>
							<Form.Control
								placeholder="Search"
								name='tag'
								onChange={handleChange}
							/>
							<Button className="btn btn-info" type="submit">Search</Button>
						</Form>
						<h5>Search for happy hours in a different city</h5>
						<Form onSubmit={handleCitySubmit} className='row gy-2 gx-3 align-items-center'>
							<Form.Control
								placeholder="Search"
								name='city'
								onChange={handleChange}
							/>
							<Button className="btn btn-info" type="submit">Search</Button>
						</Form>
						<Link className="btn btn-info mt-5 mb-5" to={`/happy-hours/favorites`}>View your favorites</Link>
					</div>
				</>
			)
		}
	}


	return (
		<>

			<div className="home-container">
				<div className="home-page">
						{userPage}
				</div>
			</div>

		</>
	)
}

export default Home
