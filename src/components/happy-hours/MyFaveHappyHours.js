import React, { useState, useEffect } from 'react'
import { getFaveHappyHours } from '../../api/happyHours'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ShowTag from '../tags/ShowTag'


const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const MyFaveHappyHours = (props) => {
    const {user} = props
    const [happyHours, setHappyHours] = useState(null)
    useEffect(()=>{
        console.log('user', user)
        getFaveHappyHours(user)
            .then(res=>{
                setHappyHours(res.data.happyHours)
            })
            .catch(console.error)
    }, [])
    if(!happyHours){
        return <p>loading...</p>
    } else if (happyHours.length === 0) {
        return (
            <h1 className='empty'>No favorited happy hours, start adding some!</h1>
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
        <div className='empty'>
            <h1>{user.username}'s Favorited Happy Hours</h1>
        </div>
        <div style={cardContainerLayout}>
            {happyHourCards}
        </div>
        </>
    )


}


export default MyFaveHappyHours