import React, { useState } from 'react'
import { Form, Container, Button } from 'react-bootstrap'
import { addTag } from '../../api/tags'

const TagForm = (props) => {
    const {happyHour, user, triggerRefresh} = props
    const [tag, setTag] = useState('')

    const handleChange = (e) => {
        // e === event
        e.persist()
        //sets the tag to the value of the input field
        setTag(prevTag => {
            const name = e.target.name
            let value = e.target.value
            if (e.target.name === 'tag'){
                value = e.target.value.toUpperCase()
            }
            const updatedValue = { [name]: value }


            return {...prevTag, ...updatedValue}
        })
    }

    //removes the previous tag from the input field
    const clearField = () => {
        setTag({tag: ""})
    }

    const handleSubmit = (e) => {
        // e === event
        e.preventDefault()
        console.log('the tag to submit', tag)
        //api call to add a new tag
        addTag(user, happyHour._id, tag)
            .then(()=> clearField())
            .then(() => triggerRefresh())
            // if there is an error, we'll send an error message
            .catch(console.error)
    }

    return (
        <Container className="justify-content-center w-75 mt-5">
        <Form onSubmit={handleSubmit}>
            <Form.Label>Add a tag</Form.Label>
            <Form.Control 
                placeholder="OYSTERS"        
                value={tag.tag}
                name='tag'
                onChange={handleChange}
            />
            <Button type='submit' className='float-end m-2' >Submit</Button>
        </Form>
    </Container> 
    )
}

export default TagForm