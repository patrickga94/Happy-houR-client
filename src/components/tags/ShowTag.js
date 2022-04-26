import React, {useState} from 'react'
import {Button} from 'react-bootstrap'
import { removeTag } from '../../api/tags'

const ShowTag = (props) => {
    const {tag, user, happyHour, triggerRefresh} = props

    const destroyTag = () => {
        removeTag(user, happyHour._id, tag._id)
            .then(()=>{
                triggerRefresh()
            })
            .catch(console.error)
    }

    return (
        <>
        <span className='badge rounded-pill bg-secondary'>{tag.tag}</span>
        </>
    )
}

export default ShowTag