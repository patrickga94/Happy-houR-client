import apiUrl from '../apiConfig'
import axios from 'axios'

// index of all happy hours
export const getAllHappyHours = (user) => {
    return axios({
        url: `${apiUrl}/happy-hours`,
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}

// index of a user's happy hours
export const getMyHappyHours = (user) => {
    return axios({
        url: `${apiUrl}/happy-hours/mine`,
        method: 'GET',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}

// index of a user's happy hours
export const getFaveHappyHours = (user) => {
    return axios({
        url: `${apiUrl}/happy-hours/favorites`,
        method: 'GET',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}

// index of happy hours in a given city
export const getLocalHappyHours = (city, user) => {
    return axios({
        url: `${apiUrl}/happy-hours/index/${city}`,
        method: 'GET',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}

// index of happy hours in a given city with a given tag
export const getTaggedHappyHours = (city, tag, user) => {
    return axios({
        url: `${apiUrl}/happy-hours/index/${city}/${tag}`,
        method: 'GET',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}

// show a specific happy hour function
export const getOneHappyHour = (happyHourId, user) => {
    return axios({
        url: `${apiUrl}/happy-hours/${happyHourId}`,
        method: 'GET',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}

// POST -> create function
export const createHappyHour = (user, newHappyHour) => {
    return axios({
        url: `${apiUrl}/happy-hours`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: {happyHour: newHappyHour}
    })
}

// PATCH -> edit function
export const updateHappyHour = (user, updatedHappyHour) =>{
    return axios ({
        url: `${apiUrl}/happy-hours/${updatedHappyHour._id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: {happyHour : updatedHappyHour}
    })
}

// DELETE -> remove function
export const removeHappyHour = (user, happyHourId) => {
    return axios({
        url: `${apiUrl}/happy-hours/${happyHourId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}