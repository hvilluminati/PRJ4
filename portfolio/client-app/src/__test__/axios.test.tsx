window.localStorage.setItem('jwt', 'aabbcc112233');
import axios, { AxiosResponse } from 'axios';
import {
	getDescription,
	putSkill,
	getSkills,
	putDescription,
} from '../axioscalls';
import MockAdapter from 'axios-mock-adapter';
import About from '../pages/aboutPage';
import { cleanup } from '@testing-library/react';
import { JSDOM } from 'jsdom';

jest.mock('axios', () => {
	return {
		...(jest.requireActual('axios') as object),
		create: jest.fn().mockReturnValue(jest.requireActual('axios')),
	};
});
const mock = new MockAdapter(axios);

describe('Texts', () => {
	const mockFakeText = [
		{ textID: 1, headline: 'testHeader', mainText: 'bye' },
		{ textID: 1, headline: 'hej', mainText: 'bye' },
	];

	describe('get Text', () => {
		afterEach(() => {
			jest.clearAllMocks();
		});

		it('Should return first description item', async () => {
			mock.onGet('Texts').replyOnce(200, mockFakeText);

			var result: any;
			await getDescription().then((t) => {
				result = t;
			});

			expect(mock.history.get.length).toBe(1);
			expect(result).toEqual(mockFakeText[0]);
		});

		it('should return undefined from catch', async () => {
			jest.spyOn(console, 'error').mockImplementationOnce(() => {});
			mock.onGet('Text').networkErrorOnce();
			var result: any;
			await getDescription().then((t) => {
				result = t;
			});
			expect(result).toBe(undefined);
		});
	});

	describe('Change texts', () => {
		var config = {
			Authorization: 'Bearer ' + window.localStorage.getItem('jwt'),
		};

		beforeEach(() => {
			mock.resetHistory();
		});

		afterEach(cleanup);
		const mockGetElementById = jest.fn();

		mockGetElementById.mockImplementation((id) => {
			if (id === 'aboutTitleText') {
				return {
					innerHTML: 'testHeader',
				};
			}
		});
		document.getElementById = mockGetElementById;

		it('Should change the description', async () => {
			mock
				.onPut('/Texts/1', mockFakeText[0], expect.objectContaining(config))
				.replyOnce(200);

			var result: AxiosResponse<any, any> | void;
			putDescription('bye').then((r) => {
				result = r;
			});
			await new Promise((r) => setTimeout(r, 200));

			const data = JSON.parse(result!.config.data);

			expect(data.mainText).toEqual(mockFakeText[0].mainText);
			expect(mock.history.put.length).toEqual(1);
			expect(result!.status).toEqual(200);
		});
	});
});

describe('Skills', () => {
	describe('change skill', () => {
		const mockFakeSkill = {
			skillID: 1,
			skillName: 'React',
			skillLevel: 10,
			monthsOfExperience: 3,
		};
		it('Should try to change a skill item', async () => {
			// #region success
			mock.resetHistory();
			var config = {
				Authorization: 'Bearer ' + window.localStorage.getItem('jwt'),
			};

			mock
				.onPut('Skills/1', mockFakeSkill, expect.objectContaining(config))
				.replyOnce(200);

			var res: AxiosResponse<any, any> | void;
			await putSkill(mockFakeSkill).then((r) => {
				res = r;
			});

			expect(mock.history.put.length).toBe(1);
			expect(res!.status).toEqual(200);
			expect(JSON.parse(res!.config.data)).toEqual(mockFakeSkill);
			// #endregion
			// #region new key required
			mock.resetHistory();
			jest.spyOn(console, 'error').mockImplementationOnce(() => {});

			mock
				.onPut('Skills/1', mockFakeSkill, expect.objectContaining(config))
				.replyOnce(401);

			var res: AxiosResponse<any, any> | void;
			await putSkill(mockFakeSkill).then((r) => {
				res = r;
			});

			expect(mock.history.put.length).toBe(1);
			expect(res!).toEqual(undefined);
			expect(console.error).toBeCalledTimes(1);
			// #endregion
		});
	});

	describe('get Skills', () => {
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
		beforeEach(() => {
			mock.resetHistory();
			jest.clearAllMocks();
		});

		it('Should return empty array and catch', async () => {
			jest.spyOn(console, 'error').mockImplementationOnce(() => {});
			mock.onGet('Skills').networkErrorOnce();

			var res: string[][] | void = getSkills(pos);
			await new Promise((r) => setTimeout(r, 200));

			expect(res).toStrictEqual([]);
			expect(console.error).toBeCalledTimes(1);
		});

		it('Should return skills', async () => {
			const mockFakeSkills = [
				{
					skillID: 1,
					skillName: 'React',
					skillLevel: 7,
					monthsOfExperience: 3,
				},
				{
					skillID: 2,
					skillName: 'SQL',
					skillLevel: 9,
					monthsOfExperience: 14,
				},
			];
			mock.onGet('Skills').replyOnce(200, mockFakeSkills);

			var result: string[][] = getSkills(pos);
			await new Promise((r) => setTimeout(r, 200));

			expect(mock.history.get.length).toBe(1);
			expect(result).toEqual([
				[1, 'React', 7, 3],
				[2, 'SQL', 9, 14],
			]);
		});
	});
});
