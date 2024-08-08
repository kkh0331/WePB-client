import instance from './base';

export const signupUser = async (email, password, name, cash, photo) => {
  try {
    const response = await instance.post('/users/signin', {
      email,
      password,
      name,
      cash,
      photo
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

export const checkEmailAvailability = async (email) => {
  try {
    const response = await instance.post('/users/test', { email });
    return response.data;
  } catch (error) {
    throw new Error('이메일 확인 중 오류가 발생했습니다.');
  }
};
