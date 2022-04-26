import React, { useState } from 'react'
import {Form, Container, Button } from 'react-bootstrap'
import { addComment } from '../../api/comments'

const CommentForm = (props) => {
    const {user, happyHour, triggerRefresh} = props
    const [comment, setComment] = useState("")

    const handleChange = (e) => {
        e.persist()
        setComment(prevComment => {
            const name = e.target.name 
            let value = e.target.value 

            const updatedValue = { [name]: value}

            return {...prevComment, ...updatedValue}
        })
    }
    const clearField = () => {
        setComment({note: ''})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        addComment(user, comment, happyHour._id)
            .then(()=>clearField())
            .then(()=> triggerRefresh())
            .catch(console.error)
    }

    return (
        <Container className="justify-content-center w-75 mt-5">
            <h3>Comments</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Label>Add a comment</Form.Label>
                <Form.Control 
                    placeholder="..."        
                    value={comment.note}
                    name='note'
                    onChange={handleChange}
                />
                <Button type='submit' className='float-end m-2' >Submit</Button>
            </Form>
        </Container>
    )


}


export default CommentForm