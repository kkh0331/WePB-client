import instance from "./base";

export const getChatList = async(myId, myRole) => {
  try{ 
    const response = await instance.post('/chat/list',{
      myId, myRole
    })
    console.log(response.data.response);
    return response.data;
  } catch(error){
    console.log(error);
  }
}

export const getChatContents = async(roomId, role) => {
  try{
    const response = await instance.post('/chat/enterRoom', {
      roomId, role
    })
    return response.data;
  } catch(error){
    console.log(error);
  }
}