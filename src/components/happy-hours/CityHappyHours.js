import React, { useState, useEffect } from 'react'
import { getLocalHappyHours } from '../../api/happyHours'
import { Card } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'


const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const CityHappyHours = (props) => {
    const {user} = props
    const {city} = useParams()
    const [happyHours, setHappyHours] = useState(null)
    useEffect(()=>{
        getLocalHappyHours(city, user)
            .then(res=>{
                setHappyHours(res.data.happyHours)
            })
            .catch(console.error)
    }, [])
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
        <div style={cardContainerLayout}>
            {happyHourCards}
        </div>
        </>
    )


}


export default CityHappyHours