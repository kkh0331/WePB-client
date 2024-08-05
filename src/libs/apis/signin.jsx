import instance from './base';

export const signupUser = async (email, password, name, cash) => {
  try {
    const response = await instance.post('/users/signin', {
      email,
      password,
      name,
      cash,
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      return error.response.data; 
    } else {
      throw new Error('회원가입 중 오류가 발생했습니다.');
    }
  }
};
