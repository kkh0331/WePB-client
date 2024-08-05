import instance from './base';

export const getPBList = async () => {
	try {
		const response = await instance.get(`/mainPage/pbList`);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export const getPBInfo = async id => {
	try {
		const response = await instance.get(`/mainPage/${id}`);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};
