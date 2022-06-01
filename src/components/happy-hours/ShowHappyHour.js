import React, { useState, useEffect } from 'react'
import { getOneHappyHour, removeHappyHour, updateHappyHour } from '../../api/happyHours'
import { getPlaceDetails } from '../../api/places'
import { addFavorite, removeFavorite } from '../../api/favorites'
import {  Spinner, Container, Card, Button} from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'
import TagForm from '../tags/TagForm'
import ShowTag from '../tags/ShowTag'
import EditHappyHourModal from './EditHappyHourModal'
import CommentForm from '../comments/CommentForm'
import ShowComment from '../comments/ShowComment'
import axios from 'axios'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
// import { Wrapper, Status } from "@googlemaps/react-wrapper";
require('dotenv').config()
const geoKey = process.env.REACT_APP_GOOGLEAPIKEY

const ShowHappyHour = (props) =>{
    const {user, setUser} = props
    const {id} = useParams()
    const [happyHour, setHappyHour] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [neighborhood, setNeighborhood] = useState(null)
    const [rating, setRating] = useState('...')
    const [isOpen, setIsOpen] = useState(false)
    const [coordinates, setCoordinates] = useState({lat: 0, lng:0})
    const [placeId, setPlaceId] = useState(null)
    const [updated, setUpdated] = useState(false)
    const navigate = useNavigate()


    // delete the happy hour
    const deleteHappyHour = () =>{
        removeHappyHour(user, happyHour._id)
            .then(()=>{
                navigate('/')
            })
    }

    // Add the happy hour to the user's favorites
    const faveHappyHour = () => {
        addFavorite(user, happyHour._id)
            .then(res =>{
                console.log('response', res)
                // set the user to the user returned from the api call. We do this to get the user's updated
                // favorites list so that we can change the "add to favorites" button to a "remove from favorites" button
                setUser(res.data.user)

            })
            .catch(console.error)
    }

    // Remove happy hour from user's favorites and then setUser with the updated user
    const unFave = () => {
        removeFavorite(user, happyHour._id)
            .then(res =>{
                setUser(res.data.user)
            })
            .catch(console.error)
    }




    useEffect(()=>{
        // console.log('updated', updated)
        //Get the happy hour after it's updated 
        getOneHappyHour(id, user)
            .then(res => {
                setHappyHour(res.data.happyHour)
            })
            .catch(console.error)
    }, [updated])

    useEffect(()=>{
        
        const getLocation = () => {
            console.log('address new', newAddress)
            // call the api to get latitude and longitude as well as place id
            axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${newAddress}&key=${geoKey}`)
                .then(responseData => {
                    return responseData
                })
                .then(jsonData => {
                    console.log(jsonData)
                    // set the place id with the api response
                    setPlaceId(jsonData.data.results[0].place_id)
                    // Set the latitude and longitude with the api response
                    setCoordinates(jsonData.data.results[0].geometry.location)
                    // set the neighborhood with the api response
                    setNeighborhood(jsonData.data.results[0].address_components[2].long_name)
                    return
                })
                .catch(console.error)
        }
        // call the function once we have a happy hour
        getLocation()
        

    }, [happyHour])

    let placeName 
    useEffect(()=>{
        if(happyHour){
            // This makes sure we're not getting the place details of the initial latitude and longitude
            if(coordinates.lat !== 0){
                console.log('place Id after', placeId)
                // sets place name to a format that the google places api will like
                placeName = `${happyHour.owner.username}+${neighborhood}+${happyHour.city}`
                console.log('placeName', placeName)
                getPlaceDetails(placeName, geoKey)
                    .then(response => {
                        console.log('place details', response)
                        // set the rating to the api response
                        setRating(response.data.candidates[0].rating)
                        // set "open" to true or false depending on the api response
                        setIsOpen(response.data.candidates[0].opening_hours.open_now)
                    })
                    .catch(console.error)
            }
        }
    }, [neighborhood])






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
                <Card.Header className='d-flex justify-content-center'>
                    <h2>{happyHour.name} at {happyHour.owner.username} </h2>
                </Card.Header>
                <Card.Body>
                    <Card.Text className='d-flex justify-content-center'>
                        <div>
                        <p><strong>Deals:</strong> {happyHour.deals}</p>
                        <p><strong>Days: </strong>{happyHour.days}</p>
                        <p><strong>Hours:</strong> {happyHour.startTime} - {happyHour.endTime}</p>
                        <p><strong>Address:</strong> {happyHour.address} {happyHour.city}, {happyHour.state}</p>
                        <p><strong>Visitor Rating: </strong> {rating} </p>
                        {isOpen ? <p style={{color: 'green'}}><strong>Open</strong></p> : <p style={{color: 'red'}}><strong>Closed</strong></p>}
                        </div>
                            
                        <hr></hr>
                    </Card.Text>
                    <div id='display-card'>
                        {/* This div contains the map from the google maps api */}
                        <div className="map-container">
                            <LoadScript
                                googleMapsApiKey={`${geoKey}`}>
                                <GoogleMap
                                mapContainerStyle={{height: "60vh", width: "60vw"}}
                                zoom={17}
                                center={coordinates}
                                >
                                <Marker position={coordinates}/>
                                </GoogleMap>
                            </LoadScript>
                        </div>
                    </div>
                        <h6 className='mt-2'>Tags: {tagPills}</h6>
                       

                </Card.Body>
                <Card.Footer>
                    {/* renders the add tag form, edit, and delete buttons if the user is the happy hour's owner */}
                    {happyHour.owner._id === user._id &&
                    <>
                        <div >
                            <TagForm
                                happyHour = {happyHour}
                                triggerRefresh = {() => setUpdated(prev => !prev)}
                                user = {user}
                            />
                        </div>
                        <div className="d-grid mt-2">
                            <Button className="" onClick={() => setModalOpen(true)} variant="warning"> Edit </Button>
                            <Button className="mt-2" onClick={deleteHappyHour} variant="danger"> Delete </Button>
                        </div>
                    </>
                    }
                    {/* Renders the favorite or unfavorite button if the user is a guest */}
                    {happyHour.owner._id != user._id &&
                        <>
                            <div className="d-grid">
                                {user.favorites.includes(happyHour._id) ? <Button className='' onClick={unFave} variant="danger">Remove from favorites</Button> : <Button className='fave-btn' onClick={faveHappyHour} variant="success">Add to favorites!</Button>}
                            </div>
                        </>
                    }
                </Card.Footer>
            </Card>
            <div  id='comment-box'>
                <h3 className='text-center'>Comments:</h3>
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