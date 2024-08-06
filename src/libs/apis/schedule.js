import instance from './base';

export const getAvailableTime = async body => {
	try {
		const response = await instance.post('/calendar/checktime', body);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};
