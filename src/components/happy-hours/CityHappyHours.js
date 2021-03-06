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

    // Get all the happy hours in a city 
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
        // navigate to the index page for happy hours in that city with the tag from the search bar
		navigate(`/happy-hours/index/${city}/${search.tag}`)
	}

    if(!happyHours){
        return <p>loading...</p>
    } else if (happyHours.length === 0) {
        return (
            <>
                <h1 className='empty'>No happy hours here, this town is a snooze fest!</h1>
            </>
            )
    }

    
    let tagPills
    let days
    let happyHourCards
    if(happyHours.length > 0){
        happyHourCards = happyHours.map(happyHour => {
                if (happyHour.tags.length > 0){
                    tagPills = happyHour.tags.map(tag => (
                        <span key={tag._id}>{tag.tag.toUpperCase()} </span>
                    ))
                }
                days = happyHour.days.map(day => (
                    <span key={day.index}> {day} </span>
                ))
            return (
                <Card key={happyHour._id} style={{width: '30%' }} className="m-2 shadow p-3 mb-5 bg-body rounded">
                <Card.Header>{happyHour.name} at {happyHour.owner.username}</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <p>{happyHour.address}, {happyHour.city}</p>
                        <p>Days: {days}</p>
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
        <div className="d-flex flex-column justify-content-center" id='city-header'>

            <div className='title'>
                <h1 className='text-center'>{city} Happy Hours</h1>
            </div>
            <div className="search-box">
                <h3 className='text-center'>Search by tags:</h3>
                <Form onSubmit={handleTagSubmit}>
                                <Form.Control
                                    placeholder="Search"
                                    name='tag'
                                    onChange={handleChange}
                                />
                                <div className="d-grid m-2">
                                    <Button className="search-btn" type="submit">Search</Button>
                                </div>
                            </Form>
            </div>
        </div>
            <div style={cardContainerLayout}>
                {happyHourCards}
            </div>
        </>
    )


}


export default CityHappyHours