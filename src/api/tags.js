import apiUrl from '../apiConfig'
import axios from 'axios'

// CREATE -> add a tag
export const addTag = (user, happyHourId, newTag) =>{
    return axios({
        url: `${apiUrl}/tags/${happyHourId}`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: {tag: newTag}
    })
}

// DELETE -> remove a tag
export const removeTag = (user, happyHourId, tagId)=>{
    return axios({
        url: `${apiUrl}/tags/${happyHourId}/${tagId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}