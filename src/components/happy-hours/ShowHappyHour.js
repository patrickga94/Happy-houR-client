import React, { useState, useEffect } from 'react'
import { getOneHappyHour, removeHappyHour, updateHappyHour } from '../../api/happyHours'
import { addFavorite, removeFavorite } from '../../api/favorites'
import {  Spinner, Container, Card, Button} from 'react-bootstrap'
import { Link, useParams, useNavigate } from 'react-router-dom'
import TagForm from '../tags/TagForm'
import ShowTag from '../tags/ShowTag'
import EditHappyHourModal from './EditHappyHourModal'
import CommentForm from '../comments/CommentForm'
import ShowComment from '../comments/ShowComment'
import axios from 'axios'
import GoogleMapReact from 'google-map-react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';
// import { Wrapper, Status } from "@googlemaps/react-wrapper";
require('dotenv').config()
const geoKey = process.env.REACT_APP_GOOGLEAPIKEY

const ShowHappyHour = (props) =>{
    const {user, setUser} = props
    const {id} = useParams()
    const [happyHour, setHappyHour] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [coordinates, setCoordinates] = useState({})
    const [updated, setUpdated] = useState(false)
    const navigate = useNavigate()



    const deleteHappyHour = () =>{
        removeHappyHour(user, happyHour._id)
            .then(()=>{
                navigate('/happy-hours')
            })
    }

    const faveHappyHour = () => {
        addFavorite(user, happyHour._id)
            .then(res =>{
                console.log('response', res)
                setUser(res.data.user)

            })
            .catch(console.error)
    }

    const unFave = () => {
        removeFavorite(user, happyHour._id)
            .then(res =>{
                setUser(res.data.user)
                navigate('/')
            })
            .catch(console.error)
    }

    const mapStyles = {
        height: "400px",
        width: "400px"
    }


    useEffect(()=>{
        // console.log('updated', updated)
        getOneHappyHour(id, user)
            .then(res => {
                setHappyHour(res.data.happyHour)
            })
            .catch(console.error)
    }, [updated])

    let googleMap
    useEffect(()=>{
        
        const getLocation = () => {
            console.log('address new', newAddress)
            axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${newAddress}&key=${geoKey}`)
                .then(responseData => {
                    return responseData
                })
                .then(jsonData => {
                    console.log(jsonData)
                    setCoordinates(jsonData.data.results[0].geometry.location)
                    return
                })
                .catch(console.error)
        }
        getLocation()
        // googleMap = (
        //     <LoadScript
        //     googleMapsApiKey={`${geoKey}`}>
        //      <GoogleMap
        //        mapContainerStyle={mapStyles}
        //        zoom={13}
        //        center={coordinates}
        //      />
        //     </LoadScript>
        // )
    }, [happyHour])

    // useEffect(()=>{
    //     console.log('coordinates', coordinates)
    //     console.log('heres the map')
    //     googleMap = (
    //         <div className="google-map">
    //         <GoogleMapReact
    //             bootstrapURLKeys={{ key: `${geoKey}` }}
    //             defaultCenter={coordinates}
    //             defaultZoom={10}
    //         > </GoogleMapReact>
    //         </div>
    //     )
    // }, [coordinates])


    let tagPills
    let comments
    let newAddress

    if(happyHour){
        newAddress = `${happyHour.address.replace(/ /g, '+')},+${happyHour.city},+${happyHour.state}`
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
                        <p>Address: {happyHour.address} {happyHour.city}, {happyHour.state}</p>
                    </Card.Text>
                    <LoadScript
                        googleMapsApiKey={`${geoKey}`}>
                        <GoogleMap
                        mapContainerStyle={mapStyles}
                        zoom={13}
                        center={coordinates}
                    />
                    </LoadScript>
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
                    {happyHour.owner._id != user._id &&
                        <>
                            {user.favorites.includes(happyHour._id) ? <Button className='fave-btn' onClick={unFave} variant="danger">Remove from favorites</Button> : <Button className='fave-btn' onClick={faveHappyHour} variant="success">Add to favorites!</Button>}
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