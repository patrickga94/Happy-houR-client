import apiUrl from '../apiConfig'
import axios from 'axios'


//Get info from the google place API
export const getPlaceDetails = (placeName, apiKey) => {
    return axios (`${apiUrl}/places/${placeName}/${apiKey}`)
}