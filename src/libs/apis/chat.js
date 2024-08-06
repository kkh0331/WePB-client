import instance from "./base";

export const getChatList = async(myId, myRole) => {
  console.log({myId, myRole})
  try{ 
    const response = await instance.post('/chat/list',{
      myId, myRole
    })
    return response.data;
  } catch(error){
    console.log(error);
  }
}

export const getChatContents = async(roomId, userId, role) => {
  try{
    const response = await instance.post('/chat/enterRoom', {
      roomId, userId, role
    })
    console.log(response.data);
    return response.data;
  } catch(error){
    console.log(error);
  }
}