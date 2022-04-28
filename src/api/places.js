import apiUrl from '../apiConfig'
import axios from 'axios'

export const getPlaceDetails = (placeName, apiKey) => {
    return axios (`${apiUrl}/places/${placeName}/${apiKey}`)
}