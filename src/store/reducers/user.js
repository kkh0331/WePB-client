import { createSlice } from "@reduxjs/toolkit";

// 최초 상태 - 추후 localStorage나 session에 저장
const initialState = {
  id : 1,
  name : "test",
  role : 0, // 0 : PB, 1 : user
}

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers:{
    setState(state, action){
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.role = action.payload.role;
    }
  }
})

export const {setNickname} = userSlice.actions;

export default userSlice.reducer;