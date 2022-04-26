import React, { useState, useEffect } from 'react'
import { getOneHappyHour, removeHappyHour, updateHappyHour } from '../../api/happyHours'
import {  Spinner, Container, Card, Button} from 'react-bootstrap'
import { Link, useParams, useNavigate } from 'react-router-dom'
import TagForm from '../tags/TagForm'
import ShowTag from '../tags/ShowTag'
import EditHappyHourModal from './EditHappyHourModal'
import CommentForm from '../comments/CommentForm'
import ShowComment from '../comments/ShowComment'

const ShowHappyHour = (props) =>{
    const {user} = props
    const {id} = useParams()
    const [happyHour, setHappyHour] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
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
                <ShowTag 
                    key={tag._id}
                    tag={tag} 
                    user={user} 
                    happyHour={happyHour}
                    triggerRefresh = {() => setUpdated(prev => !prev)}/>
            ))
        }
        if(happyHour.comments.length > 0){
            comments = happyHour.comments.map(comment => (
                <ShowComment key={comment._id}  comment={comment} happyHour={happyHour} user={user}  triggerRefresh={() => setUpdated(prev => !prev)}/>
            ))
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
                        <Button className="m-2" onClick={() => setModalOpen(true)} variant="warning"> Edit </Button>
                        <Button className="m-2" onClick={deleteHappyHour} variant="danger"> Delete </Button>
                        <div className='tag form'>
                            <TagForm
                                happyHour = {happyHour}
                                triggerRefresh = {() => setUpdated(prev => !prev)}
                                user = {user}
                            />
                        </div>
                    </>
                    }
                </Card.Footer>
            </Card>
            <div  id='comment-box'>
                {comments}
                <CommentForm 
                    user = {user}
                    happyHour = {happyHour}
                    triggerRefresh = {()=> setUpdated(prev => !prev)}

                />
            </div>
        </Container>
        <EditHappyHourModal 
            happyHour = {happyHour}
            show={modalOpen}
            updateHappyHour = {updateHappyHour}
            user = {user}
            triggerRefresh = {()=> setUpdated(prev => !prev)}
            handleClose = {() => setModalOpen(false)}
        />
        </>
    )



}

export default ShowHappyHour