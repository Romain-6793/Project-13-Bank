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
    // registerStatus: "",
    // registerError: "",
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

export const loginUser = createAsyncThunk(
    "auth/loginUser",
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
            console.log(loginUser)
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
        login: {
            reducer: (draft, action) => {
                if (loginUser.pending) {
                    draft.loginStatus = 'pending'
                    console.log(loginUser)
                    return
                }
                if (loginUser.resolved) {
                    if (action.payload) {

                        const user = jwtDecode(action.payload)

                        draft.token = action.payload
                        draft.name = user.name
                        draft.email = user.email
                        draft._id = user._id
                        draft.loginStatus = 'resolved'
                        console.log(loginUser)
                        return
                    } else {
                        return
                    }
                }
                if (loginUser.rejected) {
                    draft.loginStatus = 'rejected'
                    draft.loginError = action.payload
                    console.log(loginUser)
                    return

                    //loginError = action.payload because of rejectWithValue
                }
                return
            }
        },

    },

})


// login : {
//     reducer: {

//     }
// }



//extrareducers are for http requests


// extraReducers: (builder) => {
//     builder.addCase(loginUser.pending, (state, action) => {
//         return { ...state, loginStatus: "pending" };
//     });
//     builder.addCase(loginUser.resolved, (state, action) => {
//         if (action.payload) {
//             const user = jwtDecode(action.payload);
//             return {
//                 ...state,
//                 token: action.payload,
//                 name: user.name,
//                 email: user.email,
//                 _id: user._id,
//                 loginStatus: "resolved",
//             };
//         } else return state;
//     });
//     builder.addCase(loginUser.rejected, (state, action) => {
//         return {
//             ...state,
//             loginStatus: "rejected",
//             loginError: action.payload,
//         };
//     });


// }

// A REMETTRE PLUS TARD DANS MA SLICE SI NÉCESSAIRE

export default authSlice.reducer