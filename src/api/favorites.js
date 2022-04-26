import apiUrl from "../apiConfig";
import axios from "axios";


export const addFavorite = (user, happyHourId) => {
    return axios ({
        url: `${apiUrl}/favorites/${happyHourId}`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}