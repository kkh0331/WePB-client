import { createSlice } from "@reduxjs/toolkit"

// [{id, pbId, customerId, pbUncheckedCnt, customerUncheckedCnt, lastMessage}]
const initialState = {
  chatRooms : [],
  lastMessageTime : ''
}

const chatSlice = createSlice({
  name : "chat",
  initialState : initialState,
  reducers: {
    setChatRooms(state, action){
      state.chatRooms = action.payload;
    },
    setLastMessageTime(state, action){
      state.lastMessageTime = action.payload
    }
  }
})

export const {setChatRooms, setLastMessageTime} = chatSlice.actions;

export default chatSlice.reducer;