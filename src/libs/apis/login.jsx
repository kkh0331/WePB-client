import instance from './base';

export const loginUser = async (email, password) => {
  try {
    const response = await instance.post('/users/login', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('잠시 후에 다시 시도해주세요.');
  }
};

export const getUserInfo = async (token) => {
  try {
    const response = await instance.get('/users/info', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('사용자 정보 조회 중 오류가 발생했습니다.');
  }
};
