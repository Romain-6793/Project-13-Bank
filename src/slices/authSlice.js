import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { url } from './api'
import jwtDecode from 'jwt-decode'

const initialState = {
    token: localStorage.getItem("token"),
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    _id: "",
    loginStatus: "",
    loginError: "",
    fetchStatus: "",
    fetchError: "",
    remembered: false,
    userLoaded: false,
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

// export const setRemember = createAction('remember/set')
// export const unsetRemember = createAction('remember/unset')

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // Here come my two reducers(actions), the first one, "loadUser", checks if there is a token
        //  then essentially retuns the token and the id, it is used to reload the data if the token is 
        // still here. The second one, "logOutUser" is used to log out the user i-e to return the state 
        // to the initial state, before the token was set.

        loadUser(state, action) {
            const token = state.token;

            if (token) {
                const user = jwtDecode(token);
                return {
                    ...state,
                    token,
                    _id: user.id,
                    loginStatus: "fulfilled",
                    userLoaded: true,
                };
            } else return { ...state, userLoaded: true };
        },
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
                remembered: false,
                userLoaded: false,
            };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state, action) => {
            return { ...state, loginStatus: "pending" };
        });
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(loginUser.fulfilled, (state, action) => {
            // Add user to the state object
            if (action.payload) {
                try {
                    const user = jwtDecode(action.payload);
                    return {
                        ...state,
                        token: action.payload,
                        _id: user.id,
                        loginStatus: "fulfilled",
                    };
                } catch (error) {
                    return state
                }
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
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            // Add user to the state object
            if (action.payload) {
                // const user = jwtDecode(action.payload);
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
    },

})

// Here I import my two redurcers as actions from authslice, so I can dispatch them the way I want in
// any component.

export const { loadUser, logoutUser, rememberUser, dontRememberUser } = authSlice.actions;

export default authSlice.reducer
