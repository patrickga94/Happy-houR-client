import React from 'react'
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
        <span className='badge rounded-pill bg-secondary m-1'>
            {tag.tag} 
            { user._id === happyHour.owner._id ?
                <Button className='btn-sm' onClick={()=>destroyTag()} variant='secondary'><strong>x</strong></Button>
                :
                null
            } 
        </span>
        </>
    )
}

export default ShowTag