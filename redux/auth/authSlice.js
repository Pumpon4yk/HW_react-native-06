import { createSlice } from "@reduxjs/toolkit";


const  initialState = {
  userId: "",
  nickname: "",
  userEmail: "",
  userAvatar: "",
  currentUser: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateUser: (state, {payload}) => ({
      ...state,
      ...payload
    }),
    authCurrentUser: (state, {payload}) => ({
      ...state,
      currentUser: payload
    }),
    authSingOut: () => initialState
  }
})

export const { updateUser, authCurrentUser, authSingOut } = authSlice.actions;
