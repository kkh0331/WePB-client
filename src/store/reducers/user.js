import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id : 1,
  name : "test",
  role : 0
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser(state, action) {
      state.id = action.payload.id; 
      state.name = action.payload.name; 
      state.role = action.payload.role; 
    },
    clearUser(state) {
      state.user = null;
      state.name = null;
      state.role = null; 
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
