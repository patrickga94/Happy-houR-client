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
            let value = e.target.value.toUpperCase()

            const updatedValue = { [name]: value }

            console.log('prevSearch', prevSearch)
            console.log('updatedValue', updatedValue)

            return {...prevSearch, ...updatedValue}
        })
    }

	const handleSubmit = (e) => {
		console.log('this is search', search)
		e.preventDefault()
		navigate(`/happy-hours/index/${user.city}/${search.search}`)
	}

	let userPage = <h3>Sign in for more options</h3>
	if(user) {
		if(!user.isGuest){
			userPage = <MyHappyHours user={user} />
		} else {
			userPage = (
				<>
					<h1 className="mt-3">Welcome back, {user.username}!</h1>
					<h5>Going out in {user.city}?</h5>
					<Link className='btn btn-primary mb-5' to={`/happy-hours/index/${user.city}`}>View happy hours in your city</Link>
					<h5>Search for tags:</h5>
					<Form onSubmit={handleSubmit} className='row gy-2 gx-3 align-items-center'>
						<Form.Control
							placeholder="Search"
							name='search'
							onChange={handleChange}
						/>
						<Button className="search-btn" type="submit">Search</Button>
					</Form>
					<Link className="btn btn-primary mt-5 mb-5" to={`/happy-hours/index/${user.city}`}>View your favorites</Link>
				</>
			)
		}
	}


	return (
		<>
			{!user &&
			<h2>Home</h2>
			}
			<div className="home-page">
					{userPage}
			</div>
		</>
	)
}

export default Home
