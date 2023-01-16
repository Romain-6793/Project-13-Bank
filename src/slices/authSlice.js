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
    registerStatus: "",
    registerError: "",
    loginStatus: "",
    loginError: "",
    userLoaded: false,
}

//pas de registerStatus ou Error pour le moment, il n'y a pas de fonctionnalité "s'inscrire"


/**
 * We log in a user and we get back a token
 * @param user is an object of values that will be updated to my registered user token
 * @param rejectWithValue is my status of error (400) that will be returned with my error message in case 
 * of error, it comes with the async thunk.
 * @returns token.data i.e all the new values posted, token.data is added to our action.payload
 */

export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (user, { rejectWithValue }) => {
        try {
            const token = await axios.post(`${url}/user/login`, {
                name: user.name,
                email: user.email,
                password: user.password,
            })

            // JSON.parse(JSON.stringify(token))
            localStorage.setItem("token", token.data.body.token)
            console.log(user)
            console.log(token)
            console.log(localStorage)

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
        register: {
            reducer: (draft, action) => {
                if (registerUser === 'pending') {
                    draft.registerStatus = 'pending'
                    console.log(registerUser)
                    return
                }
                if (registerUser === 'resolved') {
                    if (action.payload) {

                        const user = jwtDecode(action.payload)

                        draft.token = action.payload
                        draft.name = user.name
                        draft.email = user.email
                        draft._id = user._id
                        draft.registerStatus = 'resolved'
                        console.log(registerUser)
                        return
                    } else {
                        return
                    }
                }
                if (registerUser === 'rejected') {
                    draft.registerStatus = 'rejected'
                    draft.registerError = action.payload
                    console.log(registerUser)
                    return

                    //loginError = action.payload because of rejectWithValue
                }
                return
            }
        },

    },

})





//extrareducers are for http requests


// extraReducers: (builder) => {
//     builder.addCase(registerUser.pending, (state, action) => {
//         return { ...state, registerStatus: "pending" };
//     });
//     builder.addCase(registerUser.resolved, (state, action) => {
//         if (action.payload) {
//             const user = jwtDecode(action.payload);
//             return {
//                 ...state,
//                 token: action.payload,
//                 name: user.name,
//                 email: user.email,
//                 _id: user._id,
//                 registerStatus: "resolved",
//             };
//         } else return state;
//     });
//     builder.addCase(registerUser.rejected, (state, action) => {
//         return {
//             ...state,
//             registerStatus: "rejected",
//             registerError: action.payload,
//         };
//     });


// }

// A REMETTRE PLUS TARD DANS MA SLICE SI NÉCESSAIRE

export default authSlice.reducer