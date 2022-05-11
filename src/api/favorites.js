import apiUrl from "../apiConfig";
import axios from "axios";


// Add a happy hour to user's favorites and return the user
export const addFavorite = (user, happyHourId) => {
    return axios ({
        url: `${apiUrl}/favorites/${happyHourId}`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}


// Remove a happy hour from the user's favorites and return a user
export const removeFavorite = (user, happyHourId) => {
    return axios ({
        url: `${apiUrl}/favorites/${happyHourId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}