import axios, { AxiosHeaders } from 'axios';
import { getDescription, putSkill } from '../axioscalls';
import MockAdapter from 'axios-mock-adapter';
import LS from '../../__mocks__/localStorage';

jest.mock('axios', () => {
	return {
		...(jest.requireActual('axios') as object),
		create: jest.fn().mockReturnValue(jest.requireActual('axios')),
	};
});
const mock = new MockAdapter(axios);

// describe('Texts', () => {
// 	afterEach(() => {
// 		jest.clearAllMocks();
// 	});
// 	describe('get Text', () => {
// 		it('Should return first description item', async () => {
// 			const mockFakeText = [
// 				{ textID: 1, headline: 'hej', mainText: 'bye' },
// 				{ textID: 1, headline: 'hej', mainText: 'bye' },
// 			];
// 			mock.onGet('Texts').replyOnce(200, mockFakeText);

// 			var result: any;
// 			await getDescription().then((t) => {
// 				result = t;
// 			});

// 			expect(mock.history.get.length).toBe(1);
// 			expect(result).toEqual(mockFakeText[0]);
// 		});
// 	});

// 	describe('get error', () => {
// 		it('should return undefined from catch', async () => {
// 			jest.spyOn(console, 'error').mockImplementationOnce(jest.fn());
// 			mock.onGet('Text').networkErrorOnce();
// 			var result: any;
// 			await getDescription().then((t) => {
// 				result = t;
// 			});
// 			expect(result).toBe(undefined);
// 		});
// 	});
// });

describe('Skills', () => {
	const authConfig = {
		Accept: 'application/json, text/plain, */*',
		Authorization: `Bearer aabbcc112233`,
		'Content-Type': 'application/json;charset=utf-8',
	};
	const unauthConfig = {
		Accept: 'application/json, text/plain, */*',
		Authorization: `Bearer aabbcc1122`,
		'Content-Type': 'application/json;charset=utf-8',
	};

	const successRes = {
		data: {},
		status: 200,
		statusText: 'OK',
		headers: {},
		config: {},
		request: {},
	};
	var unauthRes = {
		data: {},
		status: 401,
		statusText: 'OK',
		headers: {},
		config: {},
		request: {},
	};

	function mockAuth(config: any) {
		if (config.Authorization === 'Bearer aabbcc112233') return successRes;
		else return unauthRes;
	}

	const mockFakeSkill = {
		skillID: 1,
		skillName: 'React',
		skillLevel: 10,
		monthsOfExperience: 3,
	};

	describe('change skill', () => {
		it('Should change a skill item', async () => {
			mock
				.onPut('Skills/1', mockFakeSkill, authConfig)
				.replyOnce(200, '', mockAuth(authConfig));

			var res;
			await putSkill(mockFakeSkill).then((r) => {
				res = r;
				console.log(r);
			});

			expect(mock.history.put.length).toBe(1);
			expect(res).toEqual(successRes);
		});
	});

	// it('Should be unathorized', async () => {
	// 	mock.resetHistory();
	// 	mock
	// 		.onPut('Skills/' + mockFakeSkill.skillID, mockFakeSkill, unauthConfig)
	// 		.replyOnce(401, '', mockAuth(unauthConfig));

	// 	var res = putSkill(mockFakeSkill);
	// 	console.log(res);

	// 	expect(mock.history.put.length).toBe(1);
	// 	expect(res).toEqual(unauthRes);
	// });

	// describe('test get texts unsuccessful', () => {
	// 	it('fetches todos from the api', async () => {
	// 		mock.onGet('Text').networkErrorOnce();
	// 		var result: any;
	// 		await getDescription().then((t) => {
	// 			result = t;
	// 		});
	// 		expect(result).toBe(undefined);
	// 	});
	// });
});
