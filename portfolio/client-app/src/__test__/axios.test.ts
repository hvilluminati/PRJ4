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
