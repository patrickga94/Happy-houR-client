import React, { useState } from 'react'
import {Form, Container, Button } from 'react-bootstrap'
import { addComment } from '../../api/comments'

const CommentForm = (props) => {
    const {user, happyHour, triggerRefresh} = props
    const [comment, setComment] = useState("")

    // Set the comment state to the contents of the comment form
    const handleChange = (e) => {
        e.persist()
        setComment(prevComment => {
            const name = e.target.name 
            let value = e.target.value 

            const updatedValue = { [name]: value}

            return {...prevComment, ...updatedValue}
        })
    }

    // Clear the comment form
    const clearField = () => {
        setComment({note: ''})
    }

    // Post the comment on the happy hour
    const handleSubmit = (e) => {
        e.preventDefault()
        addComment(user, comment, happyHour._id)
            .then(()=>clearField())
            .then(()=> triggerRefresh())
            .catch(console.error)
    }

    return (
        <Container className="justify-content-center w-75 mt-5">
            <Form onSubmit={handleSubmit}>
                <Form.Control 
                    placeholder="Add a comment"        
                    value={comment.note}
                    name='note'
                    onChange={handleChange}
                />
                <div className="d-grid">
                    <Button type='submit' className='float-end m-2' >Submit</Button>
                </div>
            </Form>
        </Container>
    )


}


export default CommentForm