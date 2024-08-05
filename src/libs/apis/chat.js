import instance from "./base";

export const getChatList = async(id, role) => {
  try{ 
    const response = await instance.post('/chat/list',{
      "myId" : id,
      "myRole" : role
    })
    return response.data;
  } catch(error){
    console.log(error);
  }
}