import { createSlice } from "@reduxjs/toolkit"

// [{id, pbId, customerId, pbUncheckedCnt, customerUncheckedCnt, lastMessage}]
const initialState = {
  chatRooms : []
}

const chatSlice = createSlice({
  name : "chat",
  initialState : initialState,
  reducers: {
    setChatRooms(state, action){
      state.chatRooms = action.payload;
    }
  }
})

export const {setChatRooms} = chatSlice.actions;

export default chatSlice.reducer;