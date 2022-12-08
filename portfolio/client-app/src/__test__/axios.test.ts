import axios from 'axios';
import { getDescription } from '../axioscalls';
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
	describe('test get texts successful', () => {
		it('Should return a skill item', async () => {
			const mockFakeSkill = [{ textID: 1, headline: 'hej', mainText: 'bye' }];
			mock.onGet('Texts').replyOnce(200, mockFakeSkill);

			var result: any;
			await getDescription().then((t) => {
				result = t;
			});

			expect(mock.history.get.length).toBe(1);
			expect(result).toEqual(mockFakeSkill[0]);
		});
	});

	describe('test get texts unsuccessful', () => {
		it('fetches todos from the api', async () => {
			mock.onGet('Text').networkErrorOnce();
			var result: any;
			await getDescription().then((t) => {
				result = t;
			});
			expect(result).toBe(undefined);
		});
	});
});
