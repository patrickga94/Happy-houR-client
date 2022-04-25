import React, { useState, useEffect } from 'react'
import { getOneHappyHour, removeHappyHour } from '../../api/happyHours'
import {  Spinner, Container, Card, Button} from 'react-bootstrap'
import { Link, useParams, useNavigate } from 'react-router-dom'

const ShowHappyHour = (props) =>{
    const {user} = props
    const {id} = useParams()
    const [happyHour, setHappyHour] = useState(null)
    const [updated, setUpdated] = useState(false)
    const navigate = useNavigate()

    const deleteHappyHour = () =>{
        removeHappyHour(user, happyHour._id)
            .then(()=>{
                navigate('/happy-hours')
            })
    }


    useEffect(()=>{
        getOneHappyHour(id, user)
            .then(res => {
                setHappyHour(res.data.happyHour)
            })
            .catch(console.error)
    }, [updated, id])


    let tagPills
    let comments
    if(happyHour){
        if (happyHour.tags.length > 0){
            tagPills = happyHour.tags.map(tag => (
                <span className='badge rounded-pill bg-secondary'>{tag.tag}</span>
            ))
        }
        if (happyHour.comments.length > 0){
            comments = happyHour.comments.map(comment => {
                <p>{comment.note} by: {comment.author}</p>
            })
        }
    }

    if(!happyHour){
        return (
            <Container fluid className="justify-content-center">
                <Spinner animation="border" role="status" variant="warning" >
                    <span className="visually-hidden">Loading....</span>
                </Spinner>
            </Container>
        )
    }

    return(
        <>
        <Container className="fluid">
            <Card className="shadow p-3 mb-5 bg-body rounded mt-3">
                <Card.Header>
                    <h2>{happyHour.name} at {happyHour.owner.username} </h2>
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                        <p>Deals: {happyHour.deals}</p>
                        <p>Days: {happyHour.days}</p>
                        <p>Hours: {happyHour.startTime} - {happyHour.endTime}</p>
                        <p>Address: {happyHour.address} {happyHour.city}</p>
                    </Card.Text>
                        <h6>Tags:</h6>
                        {tagPills}

                </Card.Body>
                <Card.Footer>
                    {happyHour.owner._id === user._id &&
                    <>
                        <Button className="m-2" variant="info"> Add tags </Button>
                        <Button className="m-2" variant="warning"> Edit </Button>
                        <Button className="m-2" onClick={deleteHappyHour} variant="danger"> Delete </Button>
                    </>
                    }
                </Card.Footer>
            </Card>
        </Container>
        </>
    )



}

export default ShowHappyHour