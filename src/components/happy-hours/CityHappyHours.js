import React, { useState, useEffect } from 'react'
import { getLocalHappyHours } from '../../api/happyHours'
import { Card, Form, Button } from 'react-bootstrap'
import { Link, useParams, useNavigate } from 'react-router-dom'


const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const CityHappyHours = (props) => {
    const {user} = props
    const {city} = useParams()
    const [happyHours, setHappyHours] = useState(null)
    const [search, setSearch] = useState("")
    const navigate = useNavigate()
    useEffect(()=>{
        getLocalHappyHours(city, user)
            .then(res=>{
                setHappyHours(res.data.happyHours)
            })
            .catch(console.error)
    }, [])

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
		navigate(`/happy-hours/index/${city}/${search.tag}`)
	}

    if(!happyHours){
        return <p>loading...</p>
    } else if (happyHours.length === 0) {
        return <p>No happy hours here, this town is a snooze fest!</p>
    }

    
    let tagPills

    let happyHourCards
    if(happyHours.length > 0){
        happyHourCards = happyHours.map(happyHour => {
                if (happyHour.tags.length > 0){
                    tagPills = happyHour.tags.map(tag => (
                        <span key={tag._id}>{tag.tag.toUpperCase()} </span>
                    ))
                }
            return (
                <Card key={happyHour._id} style={{width: '30%' }} className="m-2 shadow p-3 mb-5 bg-body rounded">
                <Card.Header>{happyHour.name} at {happyHour.owner.username}</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <p>{happyHour.address}, {happyHour.city}</p>
                        <Link className='viewHappyHour' to={`/happy-hours/${happyHour._id}`}>Details</Link>
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    Tags: {happyHour.tags.length > 0 ? <div>{tagPills}</div>: <span>None</span>}  
                </Card.Footer>
            </Card> 
            )
        })
    }
    return (
        <>
        <div className='title'>
            <h1>{city} Happy Hours</h1>
        </div>
        <h3>Search for happy hours by tags:</h3>
        <Form onSubmit={handleTagSubmit} className='row gy-2 gx-3 align-items-center'>
						<Form.Control
							placeholder="Search"
							name='tag'
							onChange={handleChange}
						/>
						<Button className="search-btn" type="submit">Search</Button>
					</Form>
        <div style={cardContainerLayout}>
            {happyHourCards}
        </div>
        </>
    )


}


export default CityHappyHours