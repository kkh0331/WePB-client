import instance from './base';

export const makeReservation = async body => {
	try {
		const response = await instance.post('/documents/send', body);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};
