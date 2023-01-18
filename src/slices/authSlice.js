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
    async (user, thunkAPI) => {
        try {
            const token = await axios.post(`${url}/user/login`, {
                name: user.name,
                email: user.email,
                password: user.password,
                // _id: user._id,
                // loginStatus: "fulfilled"
            })
            // JSON.parse(JSON.stringify(token))
            console.log(token)
            localStorage.setItem("token", token.data.body.token);

            // console.log(user)
            // console.log(loginUser)

            // console.log(localStorage)

            // return 'fulfilled'
            return token

        }
        catch (err) {
            console.log(err.response.data)
            return thunkAPI.rejectWithValue(err.response.data)
        }
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginStatusHandler: (state, action) => {
            state.loginStatus = action.loginStatus
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state, action) => {
            console.log(state, action)
            return { ...state, loginStatus: "pending" };
        });
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(loginUser.fulfilled, (state, action) => {
            // console.log(state, action)
            // console.log(action.payload)
            // // Add user to the state object
            // state.loginStatus = action.payload.loginStatus
            // state._id = action.payload._id
            // //Changer la ligne ci-dessus plus tard (action.payload est la valeur de retour de mon thunk)
            if (action.payload) {
                try {
                    const user = jwtDecode(action.payload, { headers: {} });
                    return {
                        ...state,
                        token: action.payload,
                        name: user.name,
                        email: user.email,
                        _id: user._id,
                        loginStatus: "fulfilled",
                    };
                } catch (error) {
                    return state
                }
            } else return state;
        })
        builder.addCase(loginUser.rejected, (state, action) => {
            console.log(state, action)
            return {
                ...state,
                loginStatus: "rejected",
                loginError: action.payload,
            };
        });
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