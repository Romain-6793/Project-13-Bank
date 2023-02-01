import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { url } from './api'
import jwtDecode from 'jwt-decode'


const initialState = {
    token: "",
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    _id: "",
    loginStatus: "",
    loginError: "",
    fetchStatus: "",
    fetchError: "",
    editStatus: "",
    editError: "",
    remembered: false,
    userLoaded: false,
    userChanged: false,
}

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
            const res = await axios.post(`${url}/user/login`, {
                email: user.email,
                password: user.password,
            })

            const remembered = thunkAPI.getState().auth.remembered

            if (remembered) {
                localStorage.setItem("token", res.data.body.token);
            }

            return res.data.body.token;

        }
        catch (err) {
            return thunkAPI.rejectWithValue(err.response.data)
        }
    }
)

export const fetchUser = createAsyncThunk(
    "auth/fetchUser",
    async (user, thunkAPI) => {
        if (user._id) {
            try {
                const res = await axios.get(`${url}/user`)

                const selectedData = res.data.body.find((foundUser) => foundUser._id === user._id)

                return selectedData

            }
            catch (err) {
                return thunkAPI.rejectWithValue(err.response.data)
            }
        } else {
            return
        }
    }
)

export const editUser = createAsyncThunk(
    "auth/editUser",
    async (user, thunkAPI) => {
        const token = thunkAPI.getState().auth.token
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json'
        }
        try {
            const res = await axios({
                method: 'put',
                url: `${url}/user/profile`,
                data: {
                    firstName: user.firstName,
                    lastName: user.lastName
                },
                headers
            })
            return res.data.body;
        }
        catch (err) {
            return thunkAPI.rejectWithValue(err.response.data)
        }
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // Here come my reducers that I will export as actions.
        // The first one : loadUser, allows to keep my user in memory if there is a token.
        // It is dispatched in index.jsx.
        loadUser(state, action) {
            const token = localStorage.getItem("token")

            if (token) {
                const user = jwtDecode(token);
                return {
                    ...state,
                    token,
                    _id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    loginStatus: "fulfilled",
                    userLoaded: true,
                };
            } else return { ...state, userLoaded: true };
        },
        // rememberUser and dontRememberUser are triggered if the box "Remember me" is checked or not
        // in SignIn.jsx
        rememberUser(state, action) {
            return {
                ...state,
                remembered: true,
            }
        },
        dontRememberUser(state, action) {
            return {
                ...state,
                remembered: false,
            }
        },
        changeUser(state, action) {
            if (action.payload) {
                const user = action.payload
                return {
                    ...state,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    userChanged: true,
                };
            } else return state;
        },
        // logoutUser is trigerred by clicking the link "Sign out" in Header.jsx
        logoutUser(state, action) {
            localStorage.removeItem("token")

            return {
                ...state,
                token: "",
                name: "",
                password: "",
                email: "",
                _id: "",
                loginStatus: "",
                loginError: "",
                fetchStatus: "",
                fetchError: "",
                editStatus: "",
                editError: "",
                remembered: false,
                userLoaded: false,
                userChanged: false,
            };
        },
    },
    // extrareducers are all reducers that implies results of http requests
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state, action) => {
            return { ...state, loginStatus: "pending" };
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            // action.payload is my return value of loginUser i.e, my token
            if (action.payload) {
                const user = jwtDecode(action.payload);
                return {
                    ...state,
                    token: action.payload,
                    _id: user.id,
                    loginStatus: "fulfilled",
                };
            } else return state;
        })
        builder.addCase(loginUser.rejected, (state, action) => {
            return {
                ...state,
                loginStatus: "rejected",
                loginError: action.payload,
            };
        });
        builder.addCase(fetchUser.pending, (state, action) => {
            return { ...state, fetchStatus: "pending" };
        });
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            if (action.payload) {
                const user = action.payload
                return {
                    ...state,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    fetchStatus: "fulfilled",
                };
            } else return state;
        })
        builder.addCase(fetchUser.rejected, (state, action) => {
            return {
                ...state,
                fetchStatus: "rejected",
                fetchError: action.payload,
            };
        });
        builder.addCase(editUser.pending, (state, action) => {
            return { ...state, editStatus: "pending" };
        });
        builder.addCase(editUser.fulfilled, (state, action) => {
            if (action.payload) {
                const user = action.payload
                return {
                    ...state,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    userChanged: true,
                    editStatus: "fulfilled",
                };
            } else return state;
        })
        builder.addCase(editUser.rejected, (state, action) => {
            return {
                ...state,
                userChanged: false,
                editStatus: "rejected",
                editError: action.payload,
            };
        });
    },

})

// Here I import my two redurcers as actions from authslice, so I can dispatch them the way I want in
// any component.

export const { loadUser, logoutUser, rememberUser, dontRememberUser, changeUser } = authSlice.actions;

export default authSlice.reducer
