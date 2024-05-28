import { createSlice } from '@reduxjs/toolkit';
// import React from 'react';

const AuthSlice = createSlice({
    name: "auth",
    initialState: {  firstName: null,
        lastName: null,
        role: null,
        image: null, },
    reducers: {
        setUser: (state , action) =>{
            state.firstName = action.payload;
        },
        logOut: (state ) =>{
            state.firstName = null;
            state.lastName = null;
            state.role = null;
            state.image = null;
            localStorage.removeItem('user');
            localStorage.removeItem('xyz');
            localStorage.removeItem('menow');
        },
        login: (state, action) => {
            const { name, last_name, image , role } = action.payload;
            state.firstName = name;
            state.lastName = last_name;
            state.role = role;
            state.image = image;
        }
    },
});
export const  {setUser , logOut , login} = AuthSlice.actions;
export default AuthSlice.reducer;
export const selectFirstName = state => state.auth.firstName,
  selectImage = state => state.auth.image,
  selectRole = state => state.auth.role,
  selectLastName = state => state.auth.lastName;
