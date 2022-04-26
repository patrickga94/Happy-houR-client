import apiUrl from "../apiConfig";
import axios from "axios";

// CREATE -> post a comment
export const addComment = (user, newComment, happyHourId) => {
    return axios ({
        url: `${apiUrl}/comments/${happyHourId}`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: {comment: newComment}

    })
}

// DELETE -> remove a comment
export const removeComment = (user, happyHourId, commentId) =>{
    return axios({
        url: `${apiUrl}/comments/${happyHourId}/${commentId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}