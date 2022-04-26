import React, { useState } from 'react'
import {Modal} from 'react-bootstrap'
import HappyHourForm from '../shared/HappyHourForm'

const EditHappyHourModal = (props) => {
    const { user, show, handleClose, updateHappyHour, triggerRefresh } = props
    const [happyHour, setHappyHour] = useState(props.happyHour)
    const handleChange = (e) => {
        // e === event
        e.persist()
        //set's happyHour to the new values returned by the input fields
        setHappyHour(prevHappyHour => {
            const name = e.target.name
            let value = e.target.value
            console.log('etarget type', e.target.type)
            if (e.target.name === 'days') {
                value = e.target.value.split(',')
            } 
            
            
            const updatedValue = { [name]: value }

            console.log('prevHappyHour', prevHappyHour)
            console.log('updatedValue', updatedValue)

            return {...prevHappyHour, ...updatedValue}
        })
    }
    const handleSubmit = (e) => {
        // e === event
        e.preventDefault()
        //api call to create a new adventure
        updateHappyHour(user, happyHour)
            .then(() => handleClose())
            .then(() => triggerRefresh())
            .catch(console.error)
    }
    return (
        //this is the pop up that displays the happy hour form for editing
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                <HappyHourForm 
                    happyHour={happyHour}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Edit happy hour"
                />
            </Modal.Body>
        </Modal>
    )

}

export default EditHappyHourModal