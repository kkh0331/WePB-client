import instance from './base';

export const getRequestList = async (role, id) => {
	try {
		const response = await instance.get(`/documents/${role}/${id}`);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};
