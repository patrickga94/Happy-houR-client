import React, { useState } from 'react'
import { createHappyHour, updateHappyHour } from '../../api/happyHours'
import { useNavigate } from 'react-router-dom'
import HappyHourForm from '../shared/HappyHourForm'


const CreateHappyHour = (props) => {
    const {user} = props
    const navigate = useNavigate()
    const [happyHour, setHappyHour] = useState({name: '', address: '', city: '', state: '', deals: '', startTime: '', endTime: '', days: [] })
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
        //api call to create a new happy hour
        createHappyHour(user, happyHour)
            // if create is successful, we should navigate to the show page
            .then(res => {navigate(`/happy-hours/${res.data.happyHour._id}`)})
            // if there is an error, we'll send an error message
            .catch(console.error)
         console.log('this is the happyHour', happyHour)
    }
    return (
        <HappyHourForm
            happyHour = {happyHour}
            handleChange = {handleChange}
            handleSubmit = {handleSubmit}
            heading = "Add New Happy Hour!"
        />
    )
}

export default CreateHappyHour