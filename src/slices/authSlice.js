import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { url } from './api'
import jwtDecode from 'jwt-decode'


const initialState = {
    token: localStorage.getItem("token"),
    name: "",
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    _id: "",
    loginStatus: "",
    loginError: "",
    userLoaded: false,
}

//pas de registerStatus ou Error pour le moment, il n'y a pas de fonctionnalité "s'inscrire"


/**
 * We log in a user and we get back a token
 * 
 * @returns token.data i.e all the new values posted, token.data is added to our action.payload
 */

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (values, { rejectWithValue }) => {
        try {
            const token = await axios.post(`${url}/user/login`, {
                name: values.name,
                email: values.email,
                password: values.password,
            })

            localStorage.setItem("token", token.data)

            return token.data
        }
        catch (err) {
            console.log(err.response.data)
            return rejectWithValue(err.response.data)
        }
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
    },
    extrareducers: {
        login: {
            reducer: (draft, action) => {
                if (draft.loginStatus === 'pending') {
                    draft.loginStatus = 'pending'
                    return
                }
                if (draft.loginStatus === 'resolved') {
                    if (action.payload) {

                        const user = jwtDecode(action.payload)

                        draft.token = action.payload
                        draft.name = user.name
                        draft.email = user.email
                        draft._id = user._id
                        draft.loginStatus = 'resolved'
                        return
                    } else {
                        return
                    }
                }
                if (draft.loginStatus === 'rejected') {
                    draft.loginStatus = 'rejected'
                    draft.loginError = action.payload
                    return

                    //loginError = action.payload because of rejectWithValue
                }
                return
            }
        },

    },

})

//extrareducers are for http requests

export default authSlice.reducer