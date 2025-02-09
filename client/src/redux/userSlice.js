import {createSlice} from '@reduxjs/toolkit'
import Cookies from "js-cookie"

const initialState = {
    authUser: Cookies.get("authUser") ? JSON.parse(Cookies.get("authUser")) : null,
}

const userSlice = createSlice({
    name: 'user',
    initialState: {
        authUser: initialState,
        otherUsers: null,
        selectedUser: null,
        onlineUsers: null
    },
    reducers: {
        setAuthUser: (state, action) => {
            state.authUser = action.payload;
            Cookies.set("authUser", JSON.stringify(action.payload), { expires: 7 }); // Persist for 7 days
        },
        setOtherUsers: (state, action) => {
            state.otherUsers = action.payload;
        },
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload;
        },
        setOnlineUsers: (state, action) => {
            state.onlineUsers = action.payload;
        }
    }
});

export const {setAuthUser, setOtherUsers, setSelectedUser, setOnlineUsers} = userSlice.actions;
export default userSlice.reducer;