import instance from './base';

export const getPBList = async (distance, page, type) => {
	try {
		const response = await instance.get(
			`/mainPage/pbList?distance=${distance}&page=${page}&size=10&type=${type}`,
		);
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

export const getPBListByCategory = async (id, distance, page, type) => {
	try {
		const response = await instance.get(
			`/mainPage/pbList/${id}?distance=${distance}&page=${page}&size=10&type=${type}`,
		);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};
