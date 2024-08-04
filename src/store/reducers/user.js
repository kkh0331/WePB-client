import { createSlice } from "@reduxjs/toolkit";

// 최초 상태 - 추후 localStorage나 session에 저장
const initialState = {
  nickname : "하이하이"
}

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers:{
    setNickname(state, action){
      state.nickname = action.payload;
    }
  }
})

export const {setNickname} = userSlice.actions;

export default userSlice.reducer;