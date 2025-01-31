import { createSlice } from '@reduxjs/toolkit';
import { register, login, logout, refreshUser } from './operations';

const initialState = {
  user: { name: null, email: null },
  token: localStorage.getItem('token') || null,
  isLoggedIn: false,
  isRefreshing: false,
  error: null,  
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.error = null; 
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload || 'This email is already registered'; 
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.error = null; 
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload || 'email or password is incorrect'; 
      })
      .addCase(logout.fulfilled, state => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
        state.error = null; 
      })
      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.error = null; 
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.isRefreshing = false;
        state.token = null;
        state.error = action.payload || 'Failed to refresh user'; 
      });
  },
});

export default authSlice.reducer;
