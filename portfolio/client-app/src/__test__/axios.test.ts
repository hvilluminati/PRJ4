import axios, { AxiosResponse } from 'axios';
import { getSkills } from '../axioscalls';
import MockAdapter from 'axios-mock-adapter';

jest.mock('axios', () => {
	return {
		...(jest.requireActual('axios') as object),
		create: jest.fn().mockReturnValue(jest.requireActual('axios')),
	};
});
const mock = new MockAdapter(axios);

const url = 'https://prj4appservice.azurewebsites.net/api/';

var pos = [
	[0.105, 0.135],
	[0.805, 0.826],
	[0.111, 0.731],
	[0.823, 0.169],
	[0.409, 0.135],
	[0.368, 0.657],
	[0.173, 0.467],
	[0.269, 0.851],
	[0.772, 0.537],
	[0.555, 0.784],
	[0.182, 0.206],
	[0.577, 0.537],
];

describe('Skills table', () => {
	describe('test get skills successful', () => {
		it('Should return a skill item', async () => {
			const mockFakeSkill = [
				{
					skillID: 1,
					skillName: 'react',
					skillLevel: 10,
					monthsOfExperience: 0,
				},
				{
					skillID: 1,
					skillName: 'react',
					skillLevel: 10,
					monthsOfExperience: 0,
				},
			];
			mock.onGet('Skills').replyOnce(200, mockFakeSkill);

			const result = getSkills(pos);

			setTimeout(() => console.log('wait'), 2000);

			console.log(result);

			expect(mock.history.get.length).toBe(1);
			expect(result).toEqual(mockFakeSkill);
		});
	});

	// describe('test get skills successful', () => {
	// 	it('fetches todos from the api', async () => {
	// 		const networkError = 'ERR_AGAIN';
	// 		axios.get.mockRejectedValueOnce(new Error(networkError));
	// 		const result = await fetchTodo();
	// 		expect(result).toBe({});
	// 	});
	// });
});
