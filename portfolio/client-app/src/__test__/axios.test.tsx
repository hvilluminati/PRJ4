window.localStorage.setItem('jwt', 'aabbcc112233');
import axios, { AxiosResponse } from 'axios';
import {
	getDescription,
	putSkill,
	getSkills,
	deleteSkill,
	postSkill,
	putDescription,
	putTitle,
	getFiles,
	getBlob,
	postLogin,
} from '../axioscalls';
import MockAdapter from 'axios-mock-adapter';
import { cleanup } from '@testing-library/react';
import { response } from 'express';

jest.mock('axios', () => {
	return {
		...(jest.requireActual('axios') as object),
		create: jest.fn().mockReturnValue(jest.requireActual('axios')),
	};
});
const mock = new MockAdapter(axios);

beforeEach(() => {
	mock.resetHistory();
	jest.clearAllMocks();
});

var config = {
	Authorization: 'Bearer ' + window.localStorage.getItem('jwt'),
};

describe('Texts', () => {
	const mockFakeText = [
		{ textID: 1, headline: 'testHeader', mainText: 'bye' },
		{ textID: 1, headline: 'hej', mainText: 'bye' },
	];

	describe('Get Text', () => {
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
		afterEach(cleanup);
		const mockGetElementById = jest.fn();

		mockGetElementById.mockImplementation((id) => {
			if (id === 'aboutTitleText') {
				return {
					innerHTML: 'testHeader',
				};
			} else if (id === 't') {
				return {
					innerHTML: 'bye',
				};
			}
		});
		document.getElementById = mockGetElementById;

		describe('Change description', () => {
			it('Should change the description', async () => {
				mock.onPut(
					'/Texts/1',
					mockFakeText[0],
					expect.objectContaining(config)
				).replyOnce(200);

				var result: AxiosResponse<any, any> | void;
				await putDescription('bye').then((r) => {
					result = r;
				});

				const data = JSON.parse(result!.config.data);

				expect(data.mainText).toEqual(mockFakeText[0].mainText);
				expect(mock.history.put.length).toEqual(1);
				expect(result!.status).toEqual(200);
			});

			it('Should be unauthorized', async () => {
				jest.spyOn(console, 'error').mockImplementationOnce(() => {});

				mock.onPut(
					'/Texts/1',
					mockFakeText[0],
					expect.objectContaining(config)
				).replyOnce(401);

				var result: AxiosResponse<any, any> | void;
				await putDescription('bye').then((r) => {
					result = r;
				});

				expect(mock.history.put.length).toBe(1);
				expect(result!).toEqual(undefined);
				expect(console.error).toBeCalledTimes(1);
			});
		});

		describe('Change title', () => {
			it('Should change the title', async () => {
				mock.onPut(
					'/Texts/1',
					mockFakeText[0],
					expect.objectContaining(config)
				).replyOnce(200);

				var result: AxiosResponse<any, any> | void;
				await putTitle('testHeader').then((r) => {
					result = r;
				});

				const data = JSON.parse(result!.config.data);

				expect(data.headline).toEqual(mockFakeText[0].headline);
				expect(mock.history.put.length).toEqual(1);
				expect(result!.status).toEqual(200);
			});

			it('Should be unauthorized', async () => {
				jest.spyOn(console, 'error').mockImplementationOnce(() => {});

				mock.onPut(
					'/Texts/1',
					mockFakeText[0],
					expect.objectContaining(config)
				).replyOnce(401);

				var result: AxiosResponse<any, any> | void;
				await putTitle('testHeader').then((r) => {
					result = r;
				});

				expect(mock.history.put.length).toBe(1);
				expect(result!).toEqual(undefined);
				expect(console.error).toBeCalledTimes(1);
			});
		});
	});
});

describe('Skills', () => {
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

	describe('Change skill', () => {
		it('Should change a skill item', async () => {
			mock.onPut(
				'Skills/' + mockFakeSkills[0].skillID,
				mockFakeSkills[0],
				expect.objectContaining(config)
			).replyOnce(200);

			var result: AxiosResponse<any, any> | void;
			await putSkill(mockFakeSkills[0]).then((r) => {
				result = r;
			});

			expect(mock.history.put.length).toBe(1);
			expect(result!.status).toEqual(200);
			expect(JSON.parse(result!.config.data)).toEqual(mockFakeSkills[0]);
		});

		it('Should be unauthorized', async () => {
			jest.spyOn(console, 'error').mockImplementationOnce(() => {});

			mock.onPut(
				'Skills/' + mockFakeSkills[0].skillID,
				mockFakeSkills[0],
				expect.objectContaining(config)
			).replyOnce(401);

			var result: AxiosResponse<any, any> | void;
			await putSkill(mockFakeSkills[0]).then((r) => {
				result = r;
			});

			expect(mock.history.put.length).toBe(1);
			expect(result!).toEqual(undefined);
			expect(console.error).toBeCalledTimes(1);
		});
	});

	describe('Get Skills', () => {
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
			jest.clearAllMocks();
		});

		it('Should return empty array and catch', async () => {
			jest.spyOn(console, 'error').mockImplementationOnce(() => {});
			mock.onGet('Skills').networkErrorOnce();

			var result: string[][] | void = getSkills(pos);
			await new Promise((r) => setTimeout(r, 200));

			expect(result).toStrictEqual([]);
			expect(console.error).toBeCalledTimes(1);
		});

		it('Should return skills', async () => {
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

	describe('Delete skill', () => {
		it('Should delete a skill item', async () => {
			mock.onDelete(
				'Skills/' + mockFakeSkills[0].skillID,
				expect.objectContaining(config)
			).replyOnce(200);

			var result: any;
			await deleteSkill(mockFakeSkills[0].skillID).then((resp) => {
				result = resp;
			});

			expect(mock.history.delete.length).toBe(1);
			expect(result?.status).toEqual(200);
		});

		it('Should be unauthorized', async () => {
			jest.spyOn(console, 'error').mockImplementationOnce(() => {});

			mock.onDelete(
				'Skills/' + mockFakeSkills[0].skillID,
				expect.objectContaining(config)
			).replyOnce(401);

			var result: any;
			await deleteSkill(mockFakeSkills[0].skillID).then((resp) => {
				result = resp;
			});

			expect(mock.history.delete.length).toBe(1);
			expect(result).toEqual(undefined);
			expect(console.error).toBeCalledTimes(1);
		});
	});

	describe('Add skill', () => {
		it('Should add a skill item', async () => {
			mock.onPost(
				'Skills',
				mockFakeSkills[0],
				expect.objectContaining(config)
			).replyOnce(200);

			var result: AxiosResponse<any, any> | void;
			await postSkill(mockFakeSkills[0]).then((r) => {
				result = r;
			});

			expect(mock.history.post.length).toBe(1);
			expect(result!.status).toEqual(200);
			expect(JSON.parse(result!.config.data)).toEqual(mockFakeSkills[0]);
		});

		it('Should be unauthorized', async () => {
			jest.spyOn(console, 'error').mockImplementationOnce(() => {});

			mock.onPost(
				'Skills',
				mockFakeSkills[0],
				expect.objectContaining(config)
			).replyOnce(401);

			var result: AxiosResponse<any, any> | void;
			await postSkill(mockFakeSkills[0]).then((r) => {
				result = r;
			});

			expect(mock.history.post.length).toBe(1);
			expect(result!).toEqual(undefined);
			expect(console.error).toBeCalledTimes(1);
		});
	});
});

describe('Files', () => {
	const mockFakeFileInfo = [
		{
			createdOn: '2022-12-08T13:11:22.8801389',
			documentId: 6,
			fileType: '.cpp',
			id: '6',
			language: 'test',
			name: 'RoadVehicle.cpp',
		},
		{
			createdOn: '2022-12-09T12:47:58.2539804',
			documentId: 26,
			fileType: '.cs',
			id: '26',
			language: 'c#',
			name: 'Program.cs',
		},
	];
	describe('Get files data', () => {
		it('Should return all files data', async () => {
			mock.onGet('Files').replyOnce(200, mockFakeFileInfo);

			var result: any;
			await getFiles().then((t) => {
				result = t;
			});

			expect(mock.history.get.length).toBe(1);
			expect(result).toEqual(mockFakeFileInfo);
		});

		it('should return undefined from catch', async () => {
			jest.spyOn(console, 'error').mockImplementationOnce(() => {});
			mock.onGet('Files').networkErrorOnce();

			var result: any;
			await getDescription().then((t) => {
				result = t;
			});

			expect(result).toBe(undefined);
			expect(mock.history.get.length).toBe(1);
			expect(console.error).toBeCalledTimes(1);
		});
	});

	// describe('Get files', () => {
	// 	global.Blob = jest.fn().mockImplementation(() => {
	// 		return 'mockBlobData';
	// 	});

	// 	it('Should download a file', async () => {
	// 		mock.onGet('Files/' + mockFakeFileInfo[0].id).replyOnce(
	// 			200,
	// 			new Blob()
	// 		);

	// 		var result = getBlob(
	// 			mockFakeFileInfo[0].id,
	// 			mockFakeFileInfo[0].fileType,
	// 			mockFakeFileInfo[0].name
	// 		);
	// 	});
	// });
});

describe('Login', () => {
	it('Should log in', async () => {
		mock.onPost('Users/login', {
			Email: 'm@m.com',
			Password: 'pw',
		}).replyOnce(200, { jwt: 'Bearer aabbcc112233' });

		var result: any;
		await postLogin('m@m.com', 'pw').then((resp) => {
			result = resp;
		});

		expect(mock.history.post.length).toBe(1);
		expect(result.status).toBe(200);
		expect(result.data.jwt).toBe(
			'Bearer ' + window.localStorage.getItem('jwt')
		);
	});

	it('Should fail to login', async () => {
		jest.spyOn(console, 'error').mockImplementationOnce(() => {});
		mock.onPost('Users/login', {
			Email: 'm@m.com',
			Password: 'pw',
		}).replyOnce(400);

		var result: any;
		await postLogin('m@m.com', 'pw').then((resp) => {
			result = resp;
		});

		expect(mock.history.post.length).toBe(1);
		expect(result).toBe(undefined);
		expect(console.error).toBeCalledTimes(1);
	});
});
